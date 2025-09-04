"""
Configuration settings for the Readle Chatbot API
"""
import os
from typing import List
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Settings:
    """Application settings and configuration"""
    
    # API Configuration
    API_TITLE: str = "Readle Chatbot API"
    API_VERSION: str = "2.1.0"
    API_DESCRIPTION: str = "AI-powered chatbot for dyslexia support and learning assistance"
    
    # Server Configuration
    HOST: str = "0.0.0.0"
    PORT: int = int(os.getenv("PORT", "8000"))
    
    # External API Keys
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    
    # CORS Settings
    ALLOWED_ORIGINS: List[str] = []
    ALLOWED_ORIGIN_REGEX: str = os.getenv("ALLOWED_ORIGIN_REGEX", "")
    
    def __post_init__(self):
        # Default local origins
        default_origins = ["http://localhost:3000", "http://127.0.0.1:3000"]
        self.ALLOWED_ORIGINS.extend(default_origins)
        
        # Add extra origins from environment
        extra_origins = os.getenv("ALLOWED_ORIGINS", "")
        if extra_origins:
            self.ALLOWED_ORIGINS.extend([o.strip() for o in extra_origins.split(",") if o.strip()])
    
    # RAG Configuration
    RAG_THRESHOLD: float = float(os.getenv("RAG_THRESHOLD", "0.6"))
    DISABLE_RAG: bool = os.getenv("DISABLE_RAG", "false").lower() == "true"
    INCLUDE_PDFS: bool = os.getenv("INCLUDE_PDFS", "true").lower() == "true"
    OLLAMA_MODEL: str = os.getenv("OLLAMA_MODEL", "llama2")
    CHROMA_DIR: str = os.getenv("CHROMA_DIR", "./chroma_db")
    PDF_FOLDER: str = "./pdf"
    
    # Default websites for RAG
    DEFAULT_WEBSITES: List[str] = [
        "https://my.clevelandclinic.org/health/diseases/6005-dyslexia",
    ]
    
    # Chat Configuration
    MAX_MESSAGES_PER_SESSION: int = 10
    SESSION_TIMEOUT_HOURS: int = 24
    
    # LLM Configuration
    LLM_MODEL: str = "meta-llama/llama-4-scout-17b-16e-instruct"
    LLM_TEMPERATURE: float = 0.7
    LLM_TOP_P: float = 0.9
    
    # Document Processing
    CHUNK_SIZE: int = 500
    CHUNK_OVERLAP: int = 50
    SIMILARITY_THRESHOLD: float = 0.5
    RETRIEVAL_K: int = 5

# Create global settings instance
settings = Settings()
settings.__post_init__()

# Validation
def validate_settings() -> bool:
    """Validate required settings"""
    errors = []
    
    if not settings.GROQ_API_KEY:
        errors.append("GROQ_API_KEY is not set")
    
    if errors:
        print("Configuration errors:")
        for error in errors:
            print(f"  - {error}")
        return False
    
    return True

def print_settings():
    """Print current configuration (for debugging)"""
    print("🔧 Chatbot Configuration:")
    print(f"  API: {settings.API_TITLE} v{settings.API_VERSION}")
    print(f"  Host: {settings.HOST}:{settings.PORT}")
    print(f"  RAG Enabled: {not settings.DISABLE_RAG}")
    print(f"  RAG Threshold: {settings.RAG_THRESHOLD}")
    print(f"  Include PDFs: {settings.INCLUDE_PDFS}")
    print(f"  Ollama Model: {settings.OLLAMA_MODEL}")
    print(f"  Chroma Directory: {settings.CHROMA_DIR}")
    print(f"  Allowed Origins: {len(settings.ALLOWED_ORIGINS)} configured")
    if settings.ALLOWED_ORIGIN_REGEX:
        print(f"  Origin Regex: {settings.ALLOWED_ORIGIN_REGEX}")
