from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from langchain_community.embeddings import OllamaEmbeddings
from langchain.embeddings import FakeEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import WebBaseLoader, PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.schema import Document
import os
import asyncio
from typing import List, Optional, Dict, Tuple
from dotenv import load_dotenv
import glob
from pathlib import Path
import uuid
from datetime import datetime, timedelta
import re

load_dotenv()

# In-memory chat storage (use Redis/database for production)
class ChatMemory:
    def __init__(self, max_messages_per_session: int = 10, session_timeout_hours: int = 24):
        self.sessions: Dict[str, Dict] = {}
        self.max_messages = max_messages_per_session
        self.session_timeout = timedelta(hours=session_timeout_hours)
    
    def create_session(self) -> str:
        """Create a new chat session"""
        session_id = str(uuid.uuid4())
        self.sessions[session_id] = {
            "messages": [],
            "created_at": datetime.now(),
            "last_activity": datetime.now()
        }
        return session_id
    
    def add_message(self, session_id: str, role: str, content: str):
        """Add a message to the session history"""
        if session_id not in self.sessions:
            return False
        
        # Update last activity
        self.sessions[session_id]["last_activity"] = datetime.now()
        
        # Add message
        message = {
            "role": role,
            "content": content,
            "timestamp": datetime.now()
        }
        self.sessions[session_id]["messages"].append(message)
        
        # Keep only the last N messages to prevent context overflow
        if len(self.sessions[session_id]["messages"]) > self.max_messages * 2:  # *2 because of user+assistant pairs
            self.sessions[session_id]["messages"] = self.sessions[session_id]["messages"][-self.max_messages * 2:]
        
        return True
    
    def get_chat_history(self, session_id: str) -> List[Dict]:
        """Get chat history for a session"""
        if session_id not in self.sessions:
            return []
        
        # Check if session has expired
        if datetime.now() - self.sessions[session_id]["last_activity"] > self.session_timeout:
            del self.sessions[session_id]
            return []
        
        return self.sessions[session_id]["messages"]
    
    def clear_session(self, session_id: str) -> bool:
        """Clear a specific session"""
        if session_id in self.sessions:
            del self.sessions[session_id]
            return True
        return False
    
    def cleanup_expired_sessions(self):
        """Remove expired sessions"""
        now = datetime.now()
        expired_sessions = [
            session_id for session_id, data in self.sessions.items()
            if now - data["last_activity"] > self.session_timeout
        ]
        
        for session_id in expired_sessions:
            del self.sessions[session_id]
        
        return len(expired_sessions)

# Enhanced RAG System with relevance scoring
class RAGSystem:
    def __init__(self, relevance_threshold: float = 0.7):
        # Try to initialize Ollama embeddings; fallback to a lightweight fake embedding for local dev
        self.embeddings = None
        try:
            if os.getenv("DISABLE_RAG", "false").lower() != "true":
                self.embeddings = OllamaEmbeddings(model=os.getenv("OLLAMA_MODEL", "llama2"))
        except Exception as e:
            print(f"Warning: Ollama embeddings unavailable ({e}). Falling back to fake embeddings; RAG quality reduced.")
            # FakeEmbeddings: deterministic small vectors just so vectorstore API doesn't crash
            self.embeddings = FakeEmbeddings(size=384)
        self.vectorstore = None
        self.retriever = None
        self.websites_content = []
        self.pdf_folder = "./pdf"
        self.relevance_threshold = relevance_threshold  # Threshold for using RAG vs model knowledge
        
        # Initialize with some dyslexia-related websites
        self.default_websites = [
            "https://my.clevelandclinic.org/health/diseases/6005-dyslexia",
        ]
    
    async def load_pdfs_from_folder(self, folder_path: str = None) -> List[Document]:
        """Load all PDF files from the specified folder"""
        if folder_path is None:
            folder_path = self.pdf_folder
        
        documents = []
        Path(folder_path).mkdir(parents=True, exist_ok=True)
        pdf_files = glob.glob(os.path.join(folder_path, "*.pdf"))
        
        print(f"Found {len(pdf_files)} PDF files in {folder_path}")
        
        for pdf_file in pdf_files:
            try:
                print(f"Loading PDF: {pdf_file}")
                loader = PyPDFLoader(pdf_file)
                pdf_docs = loader.load()[:1]
                
                for doc in pdf_docs:
                    doc.metadata.update({
                        "source": pdf_file,
                        "source_type": "pdf",
                        "filename": os.path.basename(pdf_file)
                    })
                
                documents.extend(pdf_docs)
                print(f"Loaded {len(pdf_docs)} pages from {os.path.basename(pdf_file)}")
                
            except Exception as e:
                print(f"Error loading PDF {pdf_file}: {e}")
                continue
        
        return documents
    
    async def load_websites(self, urls: List[str]) -> List[Document]:
        """Load content from websites"""
        documents = []
        for url in urls:
            try:
                print(f"Loading website: {url}")
                loader = WebBaseLoader(url)
                docs = loader.load()
                
                for doc in docs:
                    doc.metadata.update({"source_type": "website"})
                
                documents.extend(docs)
                print(f"Loaded content from {url}")
                
            except Exception as e:
                print(f"Error loading {url}: {e}")
                continue
        
        return documents
    
    async def initialize_vectorstore(self, urls: List[str] = None, include_pdfs: bool = True):
        if os.getenv("DISABLE_RAG", "false").lower() == "true":
            print("RAG disabled via DISABLE_RAG env var. Skipping vectorstore initialization.")
            return False
        if urls is None:
            urls = self.default_websites
        
        try:
            all_documents = []
            
            if include_pdfs and os.getenv("INCLUDE_PDFS", "true").lower() == "true":
                pdf_documents = await self.load_pdfs_from_folder()
                print(f"Loaded {len(pdf_documents)} PDF documents")
                all_documents.extend(pdf_documents)
            
            print("Starting to load websites...")
            web_documents = await self.load_websites(urls)
            print(f"Finished loading {len(web_documents)} web documents")
            all_documents.extend(web_documents)
            
            if not all_documents:
                print("No documents loaded, using fallback content")
                fallback_content = self._create_fallback_content()
                all_documents = [Document(page_content=content, metadata={"source": "fallback", "source_type": "fallback"}) for content in fallback_content]
            
            print("Starting document splitting...")
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=500,
                chunk_overlap=50,
                length_function=len
            )
            splits = text_splitter.split_documents(all_documents)
            print(f"Created {len(splits)} document chunks")
            
            print("Starting embedding generation and vector store creation...")
            self.vectorstore = Chroma.from_documents(
                documents=splits,
                embedding=self.embeddings,
                persist_directory=os.getenv("CHROMA_DIR", "./chroma_db")
            )
            print("Vector store created successfully")
            
            self.retriever = self.vectorstore.as_retriever(
                search_type="similarity_score_threshold",
                search_kwargs={"k": 5, "score_threshold": 0.5}
            )
            
            print(f"RAG system initialized with {len(splits)} document chunks")
            return True
            
        except Exception as e:
            print(f"Error initializing RAG system: {e}")
            return False
        
    def _create_fallback_content(self) -> List[str]:
        """Create fallback content when websites can't be loaded"""
        return [
            """
            Dyslexia is a learning difference that affects reading, writing, and spelling. It's important to understand that dyslexia is not related to intelligence - people with dyslexia can be highly intelligent and successful.
            
            Key characteristics of dyslexia:
            - Difficulty with phonological processing (connecting sounds to letters)
            - Challenges with reading fluency and accuracy
            - Difficulties with spelling and writing
            - Problems with working memory and processing speed
            
            Dyslexia affects about 10-15% of the population and is a lifelong condition, but with proper support and strategies, people with dyslexia can learn to read and write effectively.
            """,
            """
            Reading strategies for children with dyslexia:
            - Use multi-sensory approaches (visual, auditory, kinesthetic)
            - Break down complex words into smaller parts
            - Practice phonics systematically
            - Use assistive technology when helpful
            - Provide plenty of time and patience
            - Focus on comprehension alongside decoding skills
            
            Remember: Every child with dyslexia is unique and may respond differently to various strategies.
            """,
            """
            Supporting a child with dyslexia at home:
            - Create a quiet, organized study space
            - Read aloud together regularly
            - Use audiobooks to support comprehension
            - Celebrate small victories and progress
            - Communicate regularly with teachers
            - Consider professional tutoring if needed
            - Maintain a positive, encouraging attitude
            """
        ]
    
    async def retrieve_with_relevance_check(self, query: str) -> Tuple[str, bool, float]:
        """
        Retrieve relevant content and determine if it's relevant enough to use
        Returns: (content, should_use_rag, max_relevance_score)
        """
        if not self.retriever:
            return "", False, 0.0
        
        try:
            # Get documents with similarity scores
            docs_with_scores = self.vectorstore.similarity_search_with_relevance_scores(
                query, k=3
            )
            
            if not docs_with_scores:
                return "", False, 0.0
            
            # Get the best relevance score
            max_relevance_score = max(score for _, score in docs_with_scores)
            
            print(f"Query: {query}")
            print(f"Max relevance score: {max_relevance_score}")
            print(f"Threshold: {self.relevance_threshold}")
            
            # Decide if we should use RAG based on relevance threshold
            should_use_rag = max_relevance_score >= self.relevance_threshold
            
            if should_use_rag:
                # Format the relevant content with better cleaning
                formatted_content = []
                for doc, score in docs_with_scores:
                    if score >= self.relevance_threshold:  # Only include highly relevant docs
                        # Clean the content
                        content = self._clean_document_content(doc.page_content)
                        
                        source_info = ""
                        if doc.metadata.get('source_type') == 'pdf':
                            source_info = f" (from {doc.metadata.get('filename', 'PDF')})"
                        elif doc.metadata.get('source_type') == 'website':
                            source_info = f" (from website)"
                        
                        formatted_content.append(f"{content}{source_info}")
                
                content = "\n\n".join(formatted_content)
                return content, True, max_relevance_score
            else:
                return "", False, max_relevance_score
                
        except Exception as e:
            print(f"Error retrieving content: {e}")
            return "", False, 0.0
    
    def _clean_document_content(self, content: str) -> str:
        """Clean document content to remove unwanted characters and formatting"""
        if not content:
            return ""
        
        # Remove excessive whitespace and normalize
        content = re.sub(r'\s+', ' ', content.strip())
        
        # Remove common PDF artifacts
        content = re.sub(r'[^\w\s\.\,\!\?\:\;\-\(\)\[\]\"\'\/]', '', content)
        
        # Remove very short fragments (likely artifacts)
        sentences = content.split('.')
        cleaned_sentences = [s.strip() for s in sentences if len(s.strip()) > 10]
        content = '. '.join(cleaned_sentences)
        
        # Ensure proper ending
        if content and not content.endswith('.'):
            content += '.'
        
        return content

# Initialize systems
rag_system = RAGSystem(relevance_threshold=float(os.getenv("RAG_THRESHOLD", "0.6")))  # Adjust threshold via env
chat_memory = ChatMemory()
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Initialize FastAPI app
app = FastAPI(title="Readle Chatbot API", version="2.1.0")

# Configure CORS for local dev and optionally a deployed frontend
cors_origins = []
default_local_origins = ["http://localhost:3000", "http://127.0.0.1:3000"]
cors_origins.extend(default_local_origins)

extra_origins = os.getenv("ALLOWED_ORIGINS", "")
if extra_origins:
    cors_origins.extend([o.strip() for o in extra_origins.split(",") if o.strip()])

origin_regex = os.getenv("ALLOWED_ORIGIN_REGEX")  # e.g. https://.*\.ngrok-free\.app

if origin_regex:
    app.add_middleware(
        CORSMiddleware,
        allow_origin_regex=origin_regex,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Pydantic models
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str
    sources_used: bool = False
    relevance_score: Optional[float] = None
    reasoning: str = ""
    response_type: str = ""

class SessionResponse(BaseModel):
    session_id: str
    message: str

def analyze_question_type(question: str) -> Dict[str, any]:
    """Analyze question type and determine appropriate response characteristics"""
    question_lower = question.lower().strip()
    
    # Simple/Quick questions (short answers)
    simple_patterns = [
        'what is', 'define', 'meaning of', 'yes or no', 'can you', 'do you',
        'is it', 'are you', 'hello', 'hi', 'thanks', 'thank you', 'bye',
        'how old', 'when was', 'where is', 'who is'
    ]
    
    # Complex/Detailed questions (longer answers)
    detailed_patterns = [
        'how to', 'what are the steps', 'explain how', 'walk me through',
        'what are all', 'list all', 'give me examples', 'what strategies',
        'how can I help', 'what should I do', 'best practices', 'comprehensive'
    ]
    
    # Very simple questions (very short answers)
    very_simple_patterns = [
        'yes', 'no', 'ok', 'okay', 'got it', 'understood', 'right', 'correct'
    ]
    
    # List indicators for pointwise answers
    list_indicators = [
        'what are the', 'list', 'examples of', 'types of', 'symptoms of',
        'strategies for', 'ways to', 'steps to', 'benefits of', 'features of',
        'characteristics of', 'methods for', 'approaches to', 'techniques for',
        'how to', 'can you give me', 'tell me about the', 'explain the different'
    ]
    
    # Check if question suggests a list-based answer
    is_list_format = any(indicator in question_lower for indicator in list_indicators)
    
    # Check question length
    word_count = len(question.split())
    
    # Determine response type with format specification
    if any(pattern in question_lower for pattern in very_simple_patterns) or word_count <= 2:
        return {
            'type': 'acknowledgment',
            'max_tokens': 75,
            'style': 'very brief and friendly',
            'format': 'paragraph'  # Acknowledgments are typically short sentences
        }
    elif any(pattern in question_lower for pattern in simple_patterns) or word_count <= 6:
        return {
            'type': 'simple',
            'max_tokens': 150,
            'style': 'concise but complete',
            'format': 'list' if is_list_format else 'paragraph'
        }
    elif any(pattern in question_lower for pattern in detailed_patterns) or word_count >= 10:
        return {
            'type': 'detailed',
            'max_tokens': 800,
            'style': 'comprehensive with examples',
            'format': 'list' if is_list_format else 'paragraph'
        }
    else:
        return {
            'type': 'moderate',
            'max_tokens': 200,
            'style': 'clear and helpful',
            'format': 'list' if is_list_format else 'paragraph'
        }

def create_system_prompt_with_rag(context: str, question_analysis: Dict) -> str:
    """Create system prompt when using RAG context"""
    style_instruction = f"Keep your response {question_analysis['style']}."
    format_instruction = (
        "Format your response as a clear, numbered list or bullet points."
        if question_analysis['format'] == 'list'
        else "Provide a clear, paragraph-based explanation."
    )
    
    return f"""You are Readle, a helpful assistant designed to support children with dyslexia and their parents.

Key guidelines:
- Remember our conversation and refer back to previous messages when relevant
- Keep your language simple, encouraging, and supportive
- Use the provided context information to answer questions accurately
- Provide complete, well-formed responses without cutting off mid-sentence
- Stay focused on the context provided - it contains the most relevant and up-to-date information
- Keep responses conversational and remember what we discussed before
- Always finish your thoughts and end responses naturally
- {style_instruction}
- {format_instruction}

Context from knowledge base:
{context}

Important: Base your answer primarily on this context information. Provide a complete response that fully addresses the question. If the user asks something not covered in the context, politely let them know and offer to help with related topics that are covered.
"""

def create_system_prompt_general(question_analysis: Dict) -> str:
    """Create system prompt when using model knowledge only"""
    style_instruction = f"Keep your response {question_analysis['style']}."
    format_instruction = (
        "Format your response as a clear, numbered list or bullet points."
        if question_analysis['format'] == 'list'
        else "Provide a clear, paragraph-based explanation."
    )
    
    return f"""You are Readle, a helpful assistant designed to support children with dyslexia and their parents.

Key guidelines:
- Remember our conversation and refer back to previous messages when relevant
- Keep your language simple, encouraging, and supportive
- Use your general knowledge to provide helpful information about dyslexia, learning difficulties, and educational support
- Be encouraging and positive while providing accurate information
- Keep responses conversational and remember what we discussed before
- Provide complete, well-formed responses without cutting off mid-sentence
- Always finish your thoughts and end responses naturally
- If you're unsure about specific details, acknowledge this and suggest consulting with professionals
- {style_instruction}
- {format_instruction}

Important: You can discuss general topics about dyslexia, learning strategies, educational support, and provide encouragement to families dealing with learning differences. Always provide complete responses.
"""

def clean_response_text(text: str) -> str:
    """Clean and validate response text while preserving newline characters"""
    if not text:
        return "I apologize, but I wasn't able to generate a proper response. Could you please try asking again?"
    
    # Remove any potential encoding issues
    text = text.encode('utf-8', errors='ignore').decode('utf-8')
    
    # Split the text into lines and clean each line
    lines = text.split('\n')
    cleaned_lines = [re.sub(r' +', ' ', line.strip()) for line in lines if line.strip()]
    cleaned_text = '\n'.join(cleaned_lines)
    
    # Ensure the response doesn't end abruptly
    if cleaned_text and not cleaned_text.endswith(('.', '!', '?', ':')):
        # Find the last complete sentence
        sentences = re.split(r'[.!?]+', cleaned_text)
        if len(sentences) > 1:
            # Keep all complete sentences
            complete_sentences = sentences[:-1]  # Remove the incomplete last part
            cleaned_text = '. '.join(complete_sentences) + '.'
        else:
            # If no complete sentences, add a period
            cleaned_text += '.'
    
    return cleaned_text

@app.get("/")
async def root():
    return {"message": "Readle Chatbot API v2.1 is running with improved response handling!"}

@app.post("/chat/session/new", response_model=SessionResponse)
async def create_new_session():
    """Create a new chat session"""
    session_id = chat_memory.create_session()
    return SessionResponse(
        session_id=session_id,
        message="New chat session created! I'm Readle, here to help with dyslexia support."
    )

@app.post("/chat", response_model=ChatResponse)
async def chat_with_readle(request: ChatRequest):
    try:
        if not os.getenv("GROQ_API_KEY"):
            raise HTTPException(status_code=500, detail="GROQ_API_KEY environment variable not set")
        
        # Create new session if none provided
        session_id = request.session_id
        if not session_id:
            session_id = chat_memory.create_session()
        
        # Get chat history
        chat_history = chat_memory.get_chat_history(session_id)
        
        # Add current user message to history
        chat_memory.add_message(session_id, "user", request.message)
        
        # Analyze question type for response length and format
        question_analysis = analyze_question_type(request.message)
        
        # Check if RAG system should be used based on relevance
        context, should_use_rag, relevance_score = await rag_system.retrieve_with_relevance_check(request.message)
        
        # Choose appropriate system prompt
        if should_use_rag and context:
            system_prompt = create_system_prompt_with_rag(context, question_analysis)
            reasoning = f"Using knowledge base (relevance: {relevance_score:.2f})"
        else:
            system_prompt = create_system_prompt_general(question_analysis)
            reasoning = f"Using general knowledge (relevance too low: {relevance_score:.2f})" if relevance_score > 0 else "Using general knowledge"
        
        # Build conversation messages for Groq
        messages = [{"role": "system", "content": system_prompt}]
        
        # Add chat history (limit to prevent token overflow)
        for msg in chat_history[-8:]:  # Reduced from 10 to 8 to leave more room for response
            if msg["role"] in ["user", "assistant"]:
                messages.append({
                    "role": msg["role"],
                    "content": msg["content"]
                })
        
        # Add current message
        messages.append({"role": "user", "content": request.message})
        
        # Make request to Groq API with improved parameters
        chat_completion = groq_client.chat.completions.create(
            messages=messages,
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            temperature=0.7,
            max_tokens=question_analysis['max_tokens'],
            top_p=0.9,
            stream=False,
            stop=None  # Let the model finish naturally
        )
        
        response_content = chat_completion.choices[0].message.content
        
        # Clean and validate the response
        response_content = clean_response_text(response_content)
        
        # Add assistant response to history
        chat_memory.add_message(session_id, "assistant", response_content)
        
        return ChatResponse(
            response=response_content,
            session_id=session_id,
            sources_used=should_use_rag,
            relevance_score=relevance_score if relevance_score > 0 else None,
            reasoning=reasoning,
            response_type=question_analysis['type']
        )
        
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")

@app.get("/chat/session/{session_id}/history")
async def get_session_history(session_id: str):
    """Get chat history for a session"""
    history = chat_memory.get_chat_history(session_id)
    return {
        "session_id": session_id,
        "messages": history,
        "message_count": len(history)
    }

@app.delete("/chat/session/{session_id}")
async def clear_session(session_id: str):
    """Clear a chat session"""
    success = chat_memory.clear_session(session_id)
    if success:
        return {"message": f"Session {session_id} cleared successfully"}
    else:
        raise HTTPException(status_code=404, detail="Session not found")

@app.get("/chat/sessions/cleanup")
async def cleanup_sessions():
    """Clean up expired sessions"""
    cleaned = chat_memory.cleanup_expired_sessions()
    return {"message": f"Cleaned up {cleaned} expired sessions"}

@app.get("/health")
async def health_check():
    active_sessions = len(chat_memory.sessions)
    return {
        "status": "healthy",
        "service": "Readle Chatbot API v2.1 with Improved Response Handling",
        "active_sessions": active_sessions,
        "rag_initialized": rag_system.retriever is not None,
    "relevance_threshold": rag_system.relevance_threshold,
    "rag_disabled": os.getenv("DISABLE_RAG", "false"),
    "include_pdfs": os.getenv("INCLUDE_PDFS", "true"),
    "chroma_dir": os.getenv("CHROMA_DIR", "./chroma_db")
    }

# RAG Management endpoints
@app.post("/rag/initialize")
async def initialize_rag(urls: Optional[List[str]] = None):
    """Initialize RAG system with website content and PDFs"""
    try:
        success = await rag_system.initialize_vectorstore(urls)
        if success:
            return {"message": "RAG system initialized successfully", "status": "success"}
        else:
            return {"message": "Failed to initialize RAG system", "status": "error"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error initializing RAG system: {str(e)}")

@app.get("/rag/status")
async def get_rag_status():
    """Get RAG system status"""
    pdf_files = []
    if os.path.exists(rag_system.pdf_folder):
        pdf_files = glob.glob(os.path.join(rag_system.pdf_folder, "*.pdf"))
    
    return {
        "initialized": rag_system.retriever is not None,
        "vectorstore_available": rag_system.vectorstore is not None,
        "relevance_threshold": rag_system.relevance_threshold,
        "default_websites": rag_system.default_websites,
        "pdf_folder": rag_system.pdf_folder,
        "pdf_files_found": [os.path.basename(f) for f in pdf_files],
        "total_pdf_files": len(pdf_files)
    }

@app.put("/rag/threshold/{new_threshold}")
async def update_relevance_threshold(new_threshold: float):
    """Update the relevance threshold for RAG routing"""
    if not 0.0 <= new_threshold <= 1.0:
        raise HTTPException(status_code=400, detail="Threshold must be between 0.0 and 1.0")
    
    old_threshold = rag_system.relevance_threshold
    rag_system.relevance_threshold = new_threshold
    
    return {
        "message": f"Relevance threshold updated from {old_threshold} to {new_threshold}",
        "old_threshold": old_threshold,
        "new_threshold": new_threshold
    }

@app.get("/rag/test/{test_query}")
async def test_rag_relevance(test_query: str):
    """Test RAG system relevance scoring for a query"""
    context, should_use_rag, relevance_score = await rag_system.retrieve_with_relevance_check(test_query)
    
    return {
        "query": test_query,
        "relevance_score": relevance_score,
        "should_use_rag": should_use_rag,
        "threshold": rag_system.relevance_threshold,
        "context_preview": context[:200] + "..." if len(context) > 200 else context
    }

@app.get("/chat/test-question-analysis/{test_query}")
async def test_question_analysis(test_query: str):
    """Test question analysis to see how length and style are determined"""
    analysis = analyze_question_type(test_query)
    
    return {
        "query": test_query,
        "detected_type": analysis['type'],
        "max_tokens": analysis['max_tokens'],
        "response_style": analysis['style'],
        "word_count": len(test_query.split())
    }

@app.on_event("startup")
async def startup_event():
    """Initialize RAG system on startup"""
    print("Initializing RAG system...")
    try:
        await rag_system.initialize_vectorstore()
        print("RAG system initialized successfully")
        print(f"Relevance threshold set to: {rag_system.relevance_threshold}")
    except Exception as e:
        print(f"Failed to initialize RAG system: {e}")
        print("Continuing without RAG capabilities")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(app, host="0.0.0.0", port=port)