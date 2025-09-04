"""
Chat-related API routes
"""
from fastapi import APIRouter, HTTPException
from chatbot.models.schemas import (
    ChatRequest, ChatResponse, SessionResponse, 
    SessionHistoryResponse, SessionCleanupResponse
)
from chatbot.services.memory import chat_memory
from chatbot.services.rag import rag_service
from chatbot.services.llm import llm_service
from chatbot.utils.text_processing import (
    analyze_question_type, create_system_prompt_with_rag,
    create_system_prompt_general, clean_response_text, format_reasoning
)
from chatbot.core.config import settings

router = APIRouter(prefix="/chat", tags=["chat"])

@router.post("/session/new", response_model=SessionResponse)
async def create_new_session():
    """Create a new chat session"""
    session_id = chat_memory.create_session()
    return SessionResponse(
        session_id=session_id,
        message="New chat session created! I'm Readle, here to help with dyslexia support."
    )

@router.post("", response_model=ChatResponse)
async def chat_with_readle(request: ChatRequest):
    """Main chat endpoint for conversing with Readle"""
    try:
        # Validate LLM service availability
        if not llm_service.is_available():
            raise HTTPException(
                status_code=500, 
                detail="GROQ_API_KEY environment variable not set"
            )
        
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
        rag_result = await rag_service.retrieve_with_relevance_check(request.message)
        
        # Choose appropriate system prompt
        if rag_result.should_use_rag and rag_result.content:
            system_prompt = create_system_prompt_with_rag(rag_result.content, question_analysis)
        else:
            system_prompt = create_system_prompt_general(question_analysis)
        
        # Build conversation messages for LLM
        messages = [{"role": "system", "content": system_prompt}]
        
        # Add chat history (limit to prevent token overflow)
        for msg in chat_history[-8:]:  # Keep last 8 messages for context
            if msg["role"] in ["user", "assistant"]:
                messages.append({
                    "role": msg["role"],
                    "content": msg["content"]
                })
        
        # Add current message
        messages.append({"role": "user", "content": request.message})
        
        # Generate response using LLM
        response_content = await llm_service.generate_response(messages, question_analysis)
        
        # Clean and validate the response
        response_content = clean_response_text(response_content)
        
        # Add assistant response to history
        chat_memory.add_message(session_id, "assistant", response_content)
        
        # Format reasoning for response metadata
        reasoning = format_reasoning(rag_result.should_use_rag, rag_result.relevance_score)
        
        return ChatResponse(
            response=response_content,
            session_id=session_id,
            sources_used=rag_result.should_use_rag,
            relevance_score=rag_result.relevance_score if rag_result.relevance_score > 0 else None,
            reasoning=reasoning,
            response_type=question_analysis.type
        )
        
    except Exception as e:
        print(f"❌ Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")

@router.get("/session/{session_id}/history", response_model=SessionHistoryResponse)
async def get_session_history(session_id: str):
    """Get chat history for a session"""
    history = chat_memory.get_chat_history(session_id)
    return SessionHistoryResponse(
        session_id=session_id,
        messages=history,
        message_count=len(history)
    )

@router.delete("/session/{session_id}")
async def clear_session(session_id: str):
    """Clear a chat session"""
    success = chat_memory.clear_session(session_id)
    if success:
        return {"message": f"Session {session_id} cleared successfully"}
    else:
        raise HTTPException(status_code=404, detail="Session not found")

@router.get("/sessions/cleanup", response_model=SessionCleanupResponse)
async def cleanup_sessions():
    """Clean up expired sessions"""
    cleaned = chat_memory.cleanup_expired_sessions()
    return SessionCleanupResponse(message=f"Cleaned up {cleaned} expired sessions")
