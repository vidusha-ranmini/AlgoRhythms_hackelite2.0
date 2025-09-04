"""
RAG system management API routes
"""
from fastapi import APIRouter, HTTPException
from typing import Optional, List
from chatbot.models.schemas import (
    RAGStatusResponse, RAGInitResponse, ThresholdUpdateResponse,
    RAGTestResponse, QuestionAnalysisResponse
)
from chatbot.services.rag import rag_service
from chatbot.utils.text_processing import analyze_question_type

router = APIRouter(prefix="/rag", tags=["rag"])

@router.post("/initialize", response_model=RAGInitResponse)
async def initialize_rag(urls: Optional[List[str]] = None):
    """Initialize RAG system with website content and PDFs"""
    try:
        success = await rag_service.initialize_vectorstore(urls)
        if success:
            return RAGInitResponse(
                message="RAG system initialized successfully", 
                status="success"
            )
        else:
            return RAGInitResponse(
                message="Failed to initialize RAG system", 
                status="error"
            )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Error initializing RAG system: {str(e)}"
        )

@router.get("/status", response_model=RAGStatusResponse)
async def get_rag_status():
    """Get RAG system status"""
    status_data = rag_service.get_status()
    return RAGStatusResponse(**status_data)

@router.put("/threshold/{new_threshold}", response_model=ThresholdUpdateResponse)
async def update_relevance_threshold(new_threshold: float):
    """Update the relevance threshold for RAG routing"""
    if not 0.0 <= new_threshold <= 1.0:
        raise HTTPException(
            status_code=400, 
            detail="Threshold must be between 0.0 and 1.0"
        )
    
    old_threshold, updated_threshold = rag_service.update_threshold(new_threshold)
    
    return ThresholdUpdateResponse(
        message=f"Relevance threshold updated from {old_threshold} to {updated_threshold}",
        old_threshold=old_threshold,
        new_threshold=updated_threshold
    )

@router.get("/test/{test_query}", response_model=RAGTestResponse)
async def test_rag_relevance(test_query: str):
    """Test RAG system relevance scoring for a query"""
    rag_result = await rag_service.retrieve_with_relevance_check(test_query)
    
    context_preview = rag_result.content
    if len(context_preview) > 200:
        context_preview = context_preview[:200] + "..."
    
    return RAGTestResponse(
        query=test_query,
        relevance_score=rag_result.relevance_score,
        should_use_rag=rag_result.should_use_rag,
        threshold=rag_service.relevance_threshold,
        context_preview=context_preview
    )
