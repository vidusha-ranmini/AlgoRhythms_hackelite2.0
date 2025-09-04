"""
RAG (Retrieval-Augmented Generation) service for document processing and retrieval
"""
import os
import glob
import re
import pickle
import hashlib
import time
from pathlib import Path
from typing import List, Tuple
from langchain_community.embeddings import OllamaEmbeddings
from langchain.embeddings import FakeEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import WebBaseLoader, PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.schema import Document

from chatbot.core.config import settings
from chatbot.models.schemas import RAGResult

class RAGService:
    """Enhanced RAG System with relevance scoring"""
    
    def __init__(self, relevance_threshold: float = None):
        self.relevance_threshold = relevance_threshold or settings.RAG_THRESHOLD
        self.embeddings = None
        self.vectorstore = None
        self.retriever = None
        self.pdf_folder = settings.PDF_FOLDER
        self.default_websites = settings.DEFAULT_WEBSITES
        self.vector_store_cache_file = os.path.join(settings.CHROMA_DIR, "vectorstore_cache.pkl")
        self.content_hash_file = os.path.join(settings.CHROMA_DIR, "content_hash.txt")
        
        # Check GPU availability
        self.gpu_info = self._check_gpu_availability()
        
        self._initialize_embeddings()
    
    def _initialize_embeddings(self):
        """Initialize embeddings with GPU acceleration and fallback to fake embeddings"""
        try:
            if not settings.DISABLE_RAG:
                # Try to use GPU acceleration for Ollama
                print("🔍 Attempting to initialize Ollama embeddings with GPU acceleration...")
                self.embeddings = OllamaEmbeddings(
                    model=settings.OLLAMA_MODEL,
                    # Add GPU-specific options if available in your Ollama setup
                    # These may vary depending on your Ollama configuration
                )
                print(f"✅ Ollama embeddings initialized with model: {settings.OLLAMA_MODEL}")
                print("🚀 GPU acceleration enabled (if Ollama is configured with CUDA)")
            else:
                print("⚠️ RAG disabled via configuration")
        except Exception as e:
            print(f"⚠️ Ollama embeddings unavailable ({e}). Falling back to fake embeddings.")
            # FakeEmbeddings: deterministic small vectors for API compatibility
            self.embeddings = FakeEmbeddings(size=384)
    
    def _calculate_content_hash(self, urls: List[str], include_pdfs: bool) -> str:
        """Calculate a hash of the content sources to detect changes"""
        content_info = {
            "urls": sorted(urls) if urls else [],
            "include_pdfs": include_pdfs,
            "pdf_files": []
        }
        
        # Add PDF file info if PDFs are included
        if include_pdfs:
            pdf_files = glob.glob(os.path.join(self.pdf_folder, "*.pdf"))
            for pdf_file in pdf_files:
                try:
                    stat = os.stat(pdf_file)
                    content_info["pdf_files"].append({
                        "name": os.path.basename(pdf_file),
                        "size": stat.st_size,
                        "modified": stat.st_mtime
                    })
                except OSError:
                    continue
            content_info["pdf_files"].sort(key=lambda x: x["name"])
        
        # Create hash of the content info
        content_str = str(content_info)
        return hashlib.md5(content_str.encode()).hexdigest()
    
    def _save_content_hash(self, content_hash: str):
        """Save the content hash to file"""
        os.makedirs(os.path.dirname(self.content_hash_file), exist_ok=True)
        with open(self.content_hash_file, 'w') as f:
            f.write(content_hash)
    
    def _load_content_hash(self) -> str:
        """Load the saved content hash"""
        if os.path.exists(self.content_hash_file):
            try:
                with open(self.content_hash_file, 'r') as f:
                    return f.read().strip()
            except Exception:
                pass
        return ""
    
    def _load_existing_vectorstore(self) -> bool:
        """Try to load an existing vector store from Chroma persistence"""
        try:
            if os.path.exists(settings.CHROMA_DIR) and os.listdir(settings.CHROMA_DIR):
                print("📂 Loading existing vector store from Chroma...")
                self.vectorstore = Chroma(
                    persist_directory=settings.CHROMA_DIR,
                    embedding_function=self.embeddings
                )
                
                # Create retriever
                self.retriever = self.vectorstore.as_retriever(
                    search_type="similarity_score_threshold",
                    search_kwargs={
                        "k": settings.RETRIEVAL_K,
                        "score_threshold": settings.SIMILARITY_THRESHOLD
                    }
                )
                
                print("✅ Successfully loaded existing vector store")
                return True
        except Exception as e:
            print(f"⚠️ Could not load existing vector store: {e}")
        return False
    
    async def load_pdfs_from_folder(self, folder_path: str = None) -> List[Document]:
        """Load all PDF files from the specified folder"""
        if folder_path is None:
            folder_path = self.pdf_folder
        
        documents = []
        Path(folder_path).mkdir(parents=True, exist_ok=True)
        pdf_files = glob.glob(os.path.join(folder_path, "*.pdf"))
        
        print(f"📄 Found {len(pdf_files)} PDF files in {folder_path}")
        
        for pdf_file in pdf_files:
            try:
                print(f"📖 Loading PDF: {os.path.basename(pdf_file)}")
                loader = PyPDFLoader(pdf_file)
                pdf_docs = loader.load()
                
                # Add metadata to each document
                for doc in pdf_docs:
                    doc.metadata.update({
                        "source": pdf_file,
                        "source_type": "pdf",
                        "filename": os.path.basename(pdf_file)
                    })
                
                documents.extend(pdf_docs)
                print(f"✅ Loaded {len(pdf_docs)} pages from {os.path.basename(pdf_file)}")
                
            except Exception as e:
                print(f"❌ Error loading PDF {pdf_file}: {e}")
                continue
        
        return documents
    
    async def load_websites(self, urls: List[str]) -> List[Document]:
        """Load content from websites"""
        documents = []
        for url in urls:
            try:
                print(f"🌐 Loading website: {url}")
                loader = WebBaseLoader(url)
                docs = loader.load()
                
                # Add metadata to each document
                for doc in docs:
                    doc.metadata.update({
                        "source_type": "website",
                        "url": url
                    })
                
                documents.extend(docs)
                print(f"✅ Loaded content from {url}")
                
            except Exception as e:
                print(f"❌ Error loading {url}: {e}")
                continue
        
        return documents
    
    async def initialize_vectorstore(self, urls: List[str] = None, include_pdfs: bool = None) -> bool:
        """Initialize the vector store with documents"""
        if settings.DISABLE_RAG:
            print("⚠️ RAG disabled via configuration. Skipping vectorstore initialization.")
            return False
        
        if urls is None:
            urls = self.default_websites
        
        if include_pdfs is None:
            include_pdfs = settings.INCLUDE_PDFS
        
        try:
            # Calculate hash of current content sources
            current_hash = self._calculate_content_hash(urls, include_pdfs)
            saved_hash = self._load_content_hash()
            
            # Check if we can use existing vector store
            if current_hash == saved_hash and self._load_existing_vectorstore():
                print("🚀 Using cached vector store (no changes detected)")
                return True
            
            print("🔄 Content changes detected or no cache found. Creating new vector store...")
            
            all_documents = []
            
            # Load PDFs if enabled
            if include_pdfs:
                pdf_documents = await self.load_pdfs_from_folder()
                print(f"📚 Loaded {len(pdf_documents)} PDF documents")
                all_documents.extend(pdf_documents)
            
            # Load websites
            print("🌐 Starting to load websites...")
            web_documents = await self.load_websites(urls)
            print(f"✅ Loaded {len(web_documents)} web documents")
            all_documents.extend(web_documents)
            
            # Use fallback content if no documents loaded
            if not all_documents:
                print("⚠️ No documents loaded, using fallback content")
                fallback_content = self._create_fallback_content()
                all_documents = [
                    Document(
                        page_content=content,
                        metadata={"source": "fallback", "source_type": "fallback"}
                    ) for content in fallback_content
                ]
            
            # Split documents into chunks
            print("✂️ Starting document splitting...")
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=settings.CHUNK_SIZE,
                chunk_overlap=settings.CHUNK_OVERLAP,
                length_function=len
            )
            splits = text_splitter.split_documents(all_documents)
            total_chunks = len(splits)
            print(f"📋 Created {total_chunks} document chunks")
            
            # Create vector store with GPU acceleration, timing, and progress tracking
            print("🔗 Creating vector store with GPU acceleration...")
            start_time = time.time()
            
            # Initialize empty Chroma store
            self.vectorstore = Chroma(
                persist_directory=settings.CHROMA_DIR,
                embedding_function=self.embeddings
            )
            
            # Benchmark embedding speed with a small sample
            print("🧪 Testing embedding speed...")
            sample_size = min(5, total_chunks)
            sample_docs = splits[:sample_size]
            sample_texts = [doc.page_content for doc in sample_docs]
            
            sample_start = time.time()
            _ = self.embeddings.embed_documents(sample_texts)
            sample_end = time.time()
            
            time_per_chunk = (sample_end - sample_start) / sample_size
            estimated_total_time = time_per_chunk * total_chunks
            
            print(f"⏱️ Embedding speed: {time_per_chunk:.3f}s per chunk")
            print(f"📊 Estimated total time: {estimated_total_time:.1f}s ({estimated_total_time/60:.2f} minutes)")
            print(f"🎮 Using RTX 3050 GPU acceleration via Ollama")
            
            # Process documents in batches for better GPU utilization
            batch_size = 32  # Optimal for RTX 3050
            processed = 0
            
            print("🚀 Processing document batches...")
            batch_start = time.time()
            
            for i in range(0, total_chunks, batch_size):
                batch_docs = splits[i:i + batch_size]
                batch_texts = [doc.page_content for doc in batch_docs]
                batch_metadata = [doc.metadata for doc in batch_docs]
                
                # Add batch to vector store (embeddings computed on GPU)
                self.vectorstore.add_texts(texts=batch_texts, metadatas=batch_metadata)
                
                processed += len(batch_docs)
                elapsed = time.time() - batch_start
                avg_time_per_chunk = elapsed / processed
                remaining_chunks = total_chunks - processed
                eta = remaining_chunks * avg_time_per_chunk
                
                progress_percent = (processed / total_chunks) * 100
                print(f"🔄 Progress: {processed}/{total_chunks} ({progress_percent:.1f}%) | "
                      f"Elapsed: {elapsed:.1f}s | ETA: {eta:.1f}s | "
                      f"Speed: {avg_time_per_chunk:.3f}s/chunk", end='\r')
            
            print()  # New line after progress updates
            
            # Persist the vector store
            print("💾 Persisting vector store to disk...")
            self.vectorstore.persist()
            
            total_time = time.time() - start_time
            print(f"✅ Vector store created successfully in {total_time:.1f}s ({total_time/60:.2f} minutes)")
            print(f"🏎️ Average speed: {total_time/total_chunks:.3f}s per chunk with GPU acceleration")
            
            print(f"🏎️ Average speed: {total_time/total_chunks:.3f}s per chunk with GPU acceleration")
            
            # Create retriever
            self.retriever = self.vectorstore.as_retriever(
                search_type="similarity_score_threshold",
                search_kwargs={
                    "k": settings.RETRIEVAL_K,
                    "score_threshold": settings.SIMILARITY_THRESHOLD
                }
            )
            
            # Save the content hash for future reference
            self._save_content_hash(current_hash)
            
            print(f"🎯 RAG system initialized with {total_chunks} document chunks")
            return True
            
        except Exception as e:
            print(f"❌ Error initializing RAG system: {e}")
            return False
    
    def _check_gpu_availability(self) -> dict:
        """Check GPU availability and return system information"""
        gpu_info = {
            "gpu_available": False,
            "gpu_name": "None",
            "cuda_available": False,
            "gpu_memory": "Unknown"
        }
        
        try:
            import subprocess
            import json
            
            # Check NVIDIA GPU via nvidia-smi
            result = subprocess.run(['nvidia-smi', '--query-gpu=gpu_name,memory.total', '--format=csv,noheader,nounits'], 
                                  capture_output=True, text=True, timeout=5)
            
            if result.returncode == 0:
                lines = result.stdout.strip().split('\n')
                if lines and lines[0]:
                    parts = lines[0].split(', ')
                    if len(parts) >= 2:
                        gpu_info["gpu_available"] = True
                        gpu_info["gpu_name"] = parts[0].strip()
                        gpu_info["gpu_memory"] = f"{parts[1].strip()} MB"
                        
                        # Check if it's RTX 3050
                        if "RTX 3050" in gpu_info["gpu_name"]:
                            print(f"🎮 RTX 3050 detected: {gpu_info['gpu_name']} ({gpu_info['gpu_memory']})")
                        else:
                            print(f"🖥️ GPU detected: {gpu_info['gpu_name']} ({gpu_info['gpu_memory']})")
            
        except Exception as e:
            print(f"⚠️ Could not detect GPU: {e}")
        
        return gpu_info
    
    async def force_rebuild_vectorstore(self, urls: List[str] = None, include_pdfs: bool = None) -> bool:
        """Force rebuild the vector store by clearing cache and recreating"""
        try:
            # Clear existing cache
            if os.path.exists(self.content_hash_file):
                os.remove(self.content_hash_file)
                print("🗑️ Cleared content hash cache")
            
            # Clear Chroma directory
            if os.path.exists(settings.CHROMA_DIR):
                import shutil
                shutil.rmtree(settings.CHROMA_DIR)
                print("🗑️ Cleared existing vector store")
            
            # Rebuild
            return await self.initialize_vectorstore(urls, include_pdfs)
            
        except Exception as e:
            print(f"❌ Error force rebuilding vector store: {e}")
            return False
    
    def _create_fallback_content(self) -> List[str]:
        """Create fallback content when external sources can't be loaded"""
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
    
    async def retrieve_with_relevance_check(self, query: str) -> RAGResult:
        """
        Retrieve relevant content and determine if it's relevant enough to use
        Returns: RAGResult with content, should_use_rag flag, and relevance score
        """
        if not self.retriever:
            return RAGResult(content="", should_use_rag=False, relevance_score=0.0)
        
        try:
            # Get documents with similarity scores
            docs_with_scores = self.vectorstore.similarity_search_with_relevance_scores(
                query, k=3
            )
            
            if not docs_with_scores:
                return RAGResult(content="", should_use_rag=False, relevance_score=0.0)
            
            # Get the best relevance score
            max_relevance_score = max(score for _, score in docs_with_scores)
            
            print(f"🔍 Query: {query}")
            print(f"📊 Max relevance score: {max_relevance_score}")
            print(f"🎯 Threshold: {self.relevance_threshold}")
            
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
                return RAGResult(
                    content=content,
                    should_use_rag=True,
                    relevance_score=max_relevance_score
                )
            else:
                return RAGResult(
                    content="",
                    should_use_rag=False,
                    relevance_score=max_relevance_score
                )
                
        except Exception as e:
            print(f"❌ Error retrieving content: {e}")
            return RAGResult(content="", should_use_rag=False, relevance_score=0.0)
    
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
    
    def get_status(self) -> dict:
        """Get current RAG system status"""
        pdf_files = []
        if os.path.exists(self.pdf_folder):
            pdf_files = glob.glob(os.path.join(self.pdf_folder, "*.pdf"))
        
        return {
            "initialized": self.retriever is not None,
            "vectorstore_available": self.vectorstore is not None,
            "relevance_threshold": self.relevance_threshold,
            "default_websites": self.default_websites,
            "pdf_folder": self.pdf_folder,
            "pdf_files_found": [os.path.basename(f) for f in pdf_files],
            "total_pdf_files": len(pdf_files),
            "embeddings_type": type(self.embeddings).__name__ if self.embeddings else "None"
        }
    
    def update_threshold(self, new_threshold: float) -> Tuple[float, float]:
        """Update relevance threshold and return old and new values"""
        old_threshold = self.relevance_threshold
        self.relevance_threshold = new_threshold
        return old_threshold, new_threshold

# Global RAG service instance
rag_service = RAGService()
