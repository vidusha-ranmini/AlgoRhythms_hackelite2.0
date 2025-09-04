"""
LLM service for generating chat responses using Groq API
"""
from groq import Groq
from typing import List, Dict
from chatbot.core.config import settings
from chatbot.models.schemas import QuestionAnalysis

class LLMService:
    """Service for interacting with Large Language Models via Groq API"""
    
    def __init__(self):
        self.client = Groq(api_key=settings.GROQ_API_KEY)
        self.model = settings.LLM_MODEL
        self.temperature = settings.LLM_TEMPERATURE
        self.top_p = settings.LLM_TOP_P
    
    async def generate_response(
        self,
        messages: List[Dict[str, str]],
        question_analysis: QuestionAnalysis
    ) -> str:
        """Generate a response using the LLM"""
        try:
            chat_completion = self.client.chat.completions.create(
                messages=messages,
                model=self.model,
                temperature=self.temperature,
                max_tokens=question_analysis.max_tokens,
                top_p=self.top_p,
                stream=False,
                stop=None  # Let the model finish naturally
            )
            
            response_content = chat_completion.choices[0].message.content
            return response_content or ""
            
        except Exception as e:
            print(f"❌ Error generating LLM response: {e}")
            raise e
    
    def is_available(self) -> bool:
        """Check if the LLM service is properly configured"""
        return bool(settings.GROQ_API_KEY)

# Global LLM service instance
llm_service = LLMService()
