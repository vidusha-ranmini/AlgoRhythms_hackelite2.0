from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_community.llms import Ollama
import streamlit as st
import os
from dotenv import load_dotenv

load_dotenv()

os.environ["LANGSMITH_TRACING_V2"]="true"
os.environ["LANGSMITH_API_KEY"]=os.getenv("LANGSMITH_API_KEY")

## Prompt Template - Specialized for Readle (children with dyslexia)
prompt=ChatPromptTemplate.from_messages(
    [
        ("system","""You are a helpful assistant for Readle, an educational platform designed for children with dyslexia. 
        You should provide supportive, encouraging responses about reading difficulties, learning strategies, and educational support. 
        Keep your language simple, positive, and age-appropriate for children and their parents. 
        Focus on dyslexia-friendly learning techniques, reading comprehension strategies, and building confidence in reading."""),
        ("user","Question:{question}")
    ]
)

## Streamlit framework
st.set_page_config(
    page_title="Readle AI Assistant",
    page_icon="📚",
    layout="wide"
)

st.title('🔤 Readle AI Assistant - Dyslexia Support Chatbot')
st.markdown("*Your friendly AI helper for reading challenges and dyslexia support*")

# Sidebar for model selection
with st.sidebar:
    st.header("⚙️ Settings")
    model_choice = st.selectbox(
        "Choose AI Model:",
        ["llama2", "llama3", "mistral", "codellama"],
        index=0
    )
    st.markdown("---")
    st.markdown("### 📖 About Readle")
    st.markdown("Readle helps children with dyslexia improve their reading skills through:")
    st.markdown("- Interactive quizzes")
    st.markdown("- Text-to-speech support")
    st.markdown("- Progress tracking")
    st.markdown("- Professional guidance")

# Main chat interface
input_text = st.text_input(
    "Ask me anything about reading, dyslexia, or learning strategies:",
    placeholder="e.g., How can I help my child with reading difficulties?"
)

# Initialize session state for chat history
if 'chat_history' not in st.session_state:
    st.session_state.chat_history = []

# LLM setup
llm = Ollama(model=model_choice)
output_parser = StrOutputParser()
chain = prompt | llm | output_parser

# Process user input
if input_text:
    with st.spinner(f'🤔 Thinking with {model_choice}...'):
        try:
            response = chain.invoke({"question": input_text})
            
            # Add to chat history
            st.session_state.chat_history.append({
                "user": input_text,
                "assistant": response
            })
            
        except Exception as e:
            st.error(f"Error: {str(e)}")
            st.error("Make sure Ollama is running and the selected model is available.")

# Display chat history
if st.session_state.chat_history:
    st.markdown("---")
    st.subheader("💬 Chat History")
    
    for i, chat in enumerate(reversed(st.session_state.chat_history)):
        with st.container():
            # User message
            st.markdown(f"**🙋 You:** {chat['user']}")
            # Assistant response
            st.markdown(f"**🤖 Readle Assistant:** {chat['assistant']}")
            st.markdown("---")

# Clear chat button
if st.session_state.chat_history:
    if st.button("🗑️ Clear Chat History"):
        st.session_state.chat_history = []
        st.rerun()

# Instructions
with st.expander("📋 Instructions"):
    st.markdown("""
    ### How to use Readle AI Assistant:
    
    1. **Start Ollama**: Make sure Ollama is running on your system
    2. **Select Model**: Choose your preferred AI model from the sidebar
    3. **Ask Questions**: Type your questions about dyslexia, reading strategies, or learning support
    4. **Get Help**: The assistant will provide helpful, age-appropriate responses
    
    ### Sample Questions:
    - "What are some reading strategies for children with dyslexia?"
    - "How can I make reading more fun for my child?"
    - "What signs should I look for if I think my child has dyslexia?"
    - "How does text-to-speech help with reading?"
    """)
