"""
Pydantic models for API request/response schemas
"""
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class ChatRequest(BaseModel):
    """Request model for chat endpoint"""
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    """Response model for chat endpoint"""
    response: str
    session_id: str
    sources_used: bool = False
    relevance_score: Optional[float] = None
    reasoning: str = ""
    response_type: str = ""

class SessionResponse(BaseModel):
    """Response model for session creation"""
    session_id: str
    message: str

class MessageHistory(BaseModel):
    """Model for individual chat message"""
    role: str
    content: str
    timestamp: datetime

class SessionHistoryResponse(BaseModel):
    """Response model for session history"""
    session_id: str
    messages: List[MessageHistory]
    message_count: int

class HealthResponse(BaseModel):
    """Response model for health check"""
    status: str
    service: str
    active_sessions: int
    rag_initialized: bool
    relevance_threshold: float
    rag_disabled: str
    include_pdfs: str
    chroma_dir: str

class RAGStatusResponse(BaseModel):
    """Response model for RAG status"""
    initialized: bool
    vectorstore_available: bool
    relevance_threshold: float
    default_websites: List[str]
    pdf_folder: str
    pdf_files_found: List[str]
    total_pdf_files: int

class RAGInitResponse(BaseModel):
    """Response model for RAG initialization"""
    message: str
    status: str

class ThresholdUpdateResponse(BaseModel):
    """Response model for threshold update"""
    message: str
    old_threshold: float
    new_threshold: float

class RAGTestResponse(BaseModel):
    """Response model for RAG testing"""
    query: str
    relevance_score: float
    should_use_rag: bool
    threshold: float
    context_preview: str

class QuestionAnalysisResponse(BaseModel):
    """Response model for question analysis testing"""
    query: str
    detected_type: str
    max_tokens: int
    response_style: str
    word_count: int

class SessionCleanupResponse(BaseModel):
    """Response model for session cleanup"""
    message: str

class ErrorResponse(BaseModel):
    """Standard error response model"""
    detail: str
    error_code: Optional[str] = None
    timestamp: datetime = datetime.now()

# Internal models for data transfer between services
class QuestionAnalysis(BaseModel):
    """Internal model for question analysis results"""
    type: str
    max_tokens: int
    style: str
    format: str

class RAGResult(BaseModel):
    """Internal model for RAG retrieval results"""
    content: str
    should_use_rag: bool
    relevance_score: float
