#!/usr/bin/env python3
"""
Startup script for Readle Chatbot API
"""
import uvicorn
from chatbot.core.config import settings

if __name__ == "__main__":
    uvicorn.run(
        "chatbot.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=True
    )
