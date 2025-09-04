"""
Main FastAPI application for Readle Chatbot
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from chatbot.core.config import settings, validate_settings, print_settings
from chatbot.services.rag import rag_service
from chatbot.api import chat, rag, system

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    print("🚀 Starting Readle Chatbot API...")
    print_settings()
    
    # Validate configuration
    if not validate_settings():
        print("❌ Configuration validation failed")
        exit(1)
    
    # Initialize RAG system
    print("🔧 Initializing RAG system...")
    try:
        await rag_service.initialize_vectorstore()
        print("✅ RAG system initialized successfully")
        print(f"🎯 Relevance threshold set to: {rag_service.relevance_threshold}")
    except Exception as e:
        print(f"⚠️ Failed to initialize RAG system: {e}")
        print("🔄 Continuing without RAG capabilities")
    
    print("✅ Readle Chatbot API started successfully!")
    yield
    
    # Shutdown
    print("🛑 Shutting down Readle Chatbot API...")

# Create FastAPI application
app = FastAPI(
    title=settings.API_TITLE,
    version=settings.API_VERSION,
    description=settings.API_DESCRIPTION,
    lifespan=lifespan
)

# Configure CORS
def setup_cors():
    """Setup CORS middleware based on configuration"""
    if settings.ALLOWED_ORIGIN_REGEX:
        app.add_middleware(
            CORSMiddleware,
            allow_origin_regex=settings.ALLOWED_ORIGIN_REGEX,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
        print(f"🌐 CORS configured with regex: {settings.ALLOWED_ORIGIN_REGEX}")
    else:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=settings.ALLOWED_ORIGINS,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
        print(f"🌐 CORS configured for origins: {settings.ALLOWED_ORIGINS}")

# Setup CORS
setup_cors()

# Include API routers
app.include_router(system.router)
app.include_router(chat.router)
app.include_router(rag.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=True
    )
