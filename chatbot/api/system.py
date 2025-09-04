"""
System health and utility API routes
"""
from fastapi import APIRouter
from chatbot.models.schemas import HealthResponse, QuestionAnalysisResponse
from chatbot.services.memory import chat_memory
from chatbot.services.rag import rag_service
from chatbot.utils.text_processing import analyze_question_type
from chatbot.core.config import settings

router = APIRouter(tags=["system"])

@router.get("/")
async def root():
    """Root endpoint with basic API information"""
    return {
        "message": f"{settings.API_TITLE} v{settings.API_VERSION} is running with improved response handling!",
        "description": settings.API_DESCRIPTION,
        "version": settings.API_VERSION
    }

@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint with system status"""
    active_sessions = chat_memory.get_session_count()
    
    return HealthResponse(
        status="healthy",
        service=f"{settings.API_TITLE} v{settings.API_VERSION} with Improved Response Handling",
        active_sessions=active_sessions,
        rag_initialized=rag_service.retriever is not None,
        relevance_threshold=rag_service.relevance_threshold,
        rag_disabled=str(settings.DISABLE_RAG).lower(),
        include_pdfs=str(settings.INCLUDE_PDFS).lower(),
        chroma_dir=settings.CHROMA_DIR
    )

@router.get("/chat/test-question-analysis/{test_query}", response_model=QuestionAnalysisResponse)
async def test_question_analysis(test_query: str):
    """Test question analysis to see how length and style are determined"""
    analysis = analyze_question_type(test_query)
    
    return QuestionAnalysisResponse(
        query=test_query,
        detected_type=analysis.type,
        max_tokens=analysis.max_tokens,
        response_style=analysis.style,
        word_count=len(test_query.split())
    )
