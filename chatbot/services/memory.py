"""
Chat memory management for session handling and conversation history
"""
import uuid
from datetime import datetime, timedelta
from typing import Dict, List, Optional
from chatbot.core.config import settings

class ChatMemory:
    """In-memory chat storage service (use Redis/database for production)"""
    
    def __init__(self, max_messages_per_session: int = None, session_timeout_hours: int = None):
        self.sessions: Dict[str, Dict] = {}
        self.max_messages = max_messages_per_session or settings.MAX_MESSAGES_PER_SESSION
        self.session_timeout = timedelta(hours=session_timeout_hours or settings.SESSION_TIMEOUT_HOURS)
    
    def create_session(self) -> str:
        """Create a new chat session"""
        session_id = str(uuid.uuid4())
        self.sessions[session_id] = {
            "messages": [],
            "created_at": datetime.now(),
            "last_activity": datetime.now()
        }
        return session_id
    
    def add_message(self, session_id: str, role: str, content: str) -> bool:
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
        max_total_messages = self.max_messages * 2  # *2 because of user+assistant pairs
        if len(self.sessions[session_id]["messages"]) > max_total_messages:
            self.sessions[session_id]["messages"] = self.sessions[session_id]["messages"][-max_total_messages:]
        
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
    
    def cleanup_expired_sessions(self) -> int:
        """Remove expired sessions and return count of cleaned sessions"""
        now = datetime.now()
        expired_sessions = [
            session_id for session_id, data in self.sessions.items()
            if now - data["last_activity"] > self.session_timeout
        ]
        
        for session_id in expired_sessions:
            del self.sessions[session_id]
        
        return len(expired_sessions)
    
    def get_session_count(self) -> int:
        """Get the number of active sessions"""
        return len(self.sessions)
    
    def session_exists(self, session_id: str) -> bool:
        """Check if a session exists and is not expired"""
        if session_id not in self.sessions:
            return False
        
        # Check if session has expired
        if datetime.now() - self.sessions[session_id]["last_activity"] > self.session_timeout:
            del self.sessions[session_id]
            return False
        
        return True
    
    def get_session_info(self, session_id: str) -> Optional[Dict]:
        """Get session metadata (creation time, last activity, message count)"""
        if not self.session_exists(session_id):
            return None
        
        session_data = self.sessions[session_id]
        return {
            "session_id": session_id,
            "created_at": session_data["created_at"],
            "last_activity": session_data["last_activity"],
            "message_count": len(session_data["messages"]),
            "is_expired": False
        }

# Global chat memory instance
chat_memory = ChatMemory()
