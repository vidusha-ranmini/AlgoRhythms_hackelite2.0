"""
Utility functions for text processing and analysis
"""
import re
from typing import Dict
from chatbot.models.schemas import QuestionAnalysis

def analyze_question_type(question: str) -> QuestionAnalysis:
    """Analyze question type and determine appropriate response characteristics"""
    question_lower = question.lower().strip()
    
    # Simple/Quick questions (short answers)
    simple_patterns = [
        'what is', 'define', 'meaning of', 'yes or no', 'can you', 'do you',
        'is it', 'are you', 'hello', 'hi', 'thanks', 'thank you', 'bye',
        'how old', 'when was', 'where is', 'who is'
    ]
    
    # Complex/Detailed questions (longer answers)
    detailed_patterns = [
        'how to', 'what are the steps', 'explain how', 'walk me through',
        'what are all', 'list all', 'give me examples', 'what strategies',
        'how can I help', 'what should I do', 'best practices', 'comprehensive'
    ]
    
    # Very simple questions (very short answers)
    very_simple_patterns = [
        'yes', 'no', 'ok', 'okay', 'got it', 'understood', 'right', 'correct'
    ]
    
    # List indicators for pointwise answers
    list_indicators = [
        'what are the', 'list', 'examples of', 'types of', 'symptoms of',
        'strategies for', 'ways to', 'steps to', 'benefits of', 'features of',
        'characteristics of', 'methods for', 'approaches to', 'techniques for',
        'how to', 'can you give me', 'tell me about the', 'explain the different'
    ]
    
    # Check if question suggests a list-based answer
    is_list_format = any(indicator in question_lower for indicator in list_indicators)
    
    # Check question length
    word_count = len(question.split())
    
    # Determine response type with format specification
    if any(pattern in question_lower for pattern in very_simple_patterns) or word_count <= 2:
        return QuestionAnalysis(
            type='acknowledgment',
            max_tokens=75,
            style='very brief and friendly',
            format='paragraph'  # Acknowledgments are typically short sentences
        )
    elif any(pattern in question_lower for pattern in simple_patterns) or word_count <= 6:
        return QuestionAnalysis(
            type='simple',
            max_tokens=150,
            style='concise but complete',
            format='list' if is_list_format else 'paragraph'
        )
    elif any(pattern in question_lower for pattern in detailed_patterns) or word_count >= 10:
        return QuestionAnalysis(
            type='detailed',
            max_tokens=800,
            style='comprehensive with examples',
            format='list' if is_list_format else 'paragraph'
        )
    else:
        return QuestionAnalysis(
            type='moderate',
            max_tokens=200,
            style='clear and helpful',
            format='list' if is_list_format else 'paragraph'
        )

def create_system_prompt_with_rag(context: str, question_analysis: QuestionAnalysis) -> str:
    """Create system prompt when using RAG context"""
    style_instruction = f"Keep your response {question_analysis.style}."
    format_instruction = (
        "Format your response as a clear, numbered list or bullet points."
        if question_analysis.format == 'list'
        else "Provide a clear, paragraph-based explanation."
    )
    
    return f"""You are Readle, a helpful assistant designed to support children with dyslexia and their parents.

Key guidelines:
- Remember our conversation and refer back to previous messages when relevant
- Keep your language simple, encouraging, and supportive
- Use the provided context information to answer questions accurately
- Provide complete, well-formed responses without cutting off mid-sentence
- Stay focused on the context provided - it contains the most relevant and up-to-date information
- Keep responses conversational and remember what we discussed before
- Always finish your thoughts and end responses naturally
- {style_instruction}
- {format_instruction}

Context from knowledge base:
{context}

Important: Base your answer primarily on this context information. Provide a complete response that fully addresses the question. If the user asks something not covered in the context, politely let them know and offer to help with related topics that are covered.
"""

def create_system_prompt_general(question_analysis: QuestionAnalysis) -> str:
    """Create system prompt when using model knowledge only"""
    style_instruction = f"Keep your response {question_analysis.style}."
    format_instruction = (
        "Format your response as a clear, numbered list or bullet points."
        if question_analysis.format == 'list'
        else "Provide a clear, paragraph-based explanation."
    )
    
    return f"""You are Readle, a helpful assistant designed to support children with dyslexia and their parents.

Key guidelines:
- Remember our conversation and refer back to previous messages when relevant
- Keep your language simple, encouraging, and supportive
- Use your general knowledge to provide helpful information about dyslexia, learning difficulties, and educational support
- Be encouraging and positive while providing accurate information
- Keep responses conversational and remember what we discussed before
- Provide complete, well-formed responses without cutting off mid-sentence
- Always finish your thoughts and end responses naturally
- If you're unsure about specific details, acknowledge this and suggest consulting with professionals
- {style_instruction}
- {format_instruction}

Important: You can discuss general topics about dyslexia, learning strategies, educational support, and provide encouragement to families dealing with learning differences. Always provide complete responses.
"""

def clean_response_text(text: str) -> str:
    """Clean and validate response text while preserving newline characters"""
    if not text:
        return "I apologize, but I wasn't able to generate a proper response. Could you please try asking again?"
    
    # Remove any potential encoding issues
    text = text.encode('utf-8', errors='ignore').decode('utf-8')
    
    # Split the text into lines and clean each line
    lines = text.split('\n')
    cleaned_lines = [re.sub(r' +', ' ', line.strip()) for line in lines if line.strip()]
    cleaned_text = '\n'.join(cleaned_lines)
    
    # Ensure the response doesn't end abruptly
    if cleaned_text and not cleaned_text.endswith(('.', '!', '?', ':')):
        # Find the last complete sentence
        sentences = re.split(r'[.!?]+', cleaned_text)
        if len(sentences) > 1:
            # Keep all complete sentences
            complete_sentences = sentences[:-1]  # Remove the incomplete last part
            cleaned_text = '. '.join(complete_sentences) + '.'
        else:
            # If no complete sentences, add a period
            cleaned_text += '.'
    
    return cleaned_text

def format_reasoning(should_use_rag: bool, relevance_score: float) -> str:
    """Format reasoning for why RAG was or wasn't used"""
    if should_use_rag:
        return f"Using knowledge base (relevance: {relevance_score:.2f})"
    elif relevance_score > 0:
        return f"Using general knowledge (relevance too low: {relevance_score:.2f})"
    else:
        return "Using general knowledge"
