<<<<<<< HEAD
# RAG (Retrieval-Augmented Generation) Implementation for Readle Chatbot

## Overview

The Readle Chatbot now includes RAG capabilities that allow it to retrieve and use information from relevant websites about dyslexia, learning strategies, and educational support. This enhances the chatbot's responses with up-to-date, authoritative information.

## Features

### 🔍 **Intelligent Information Retrieval**
- Automatically retrieves relevant information from trusted dyslexia websites
- Uses semantic search to find the most relevant content for each query
- Combines retrieved information with the AI model's knowledge

### 🌐 **Website Content Integration**
- Default integration with reputable dyslexia resources:
  - Understood.org
  - Dyslexia.com
  - British Dyslexia Association
- Fallback content ensures the system works even without internet access

### ⚙️ **User Control**
- Toggle RAG on/off in the chatbot settings
- Real-time RAG status indicator
- Visual indicators showing when knowledge enhancement is used

## Installation

### Prerequisites
- Python 3.8+
- Ollama installed and running
- Required Python packages (see requirements.txt)

### Setup Instructions

1. **Install Dependencies**
   ```bash
   # On Windows
   ./setup_rag.bat
   
   # On Linux/Mac
   ./setup_rag.sh
   ```

2. **Start Ollama**
   ```bash
   ollama serve
   ```

3. **Pull Required Models**
   ```bash
   ollama pull llama2
   ```

4. **Start the Chatbot API**
   ```bash
   python chatbot_api.py
   ```

## API Endpoints

### Chat Endpoint (Enhanced)
```
POST /chat
```
Request body:
```json
{
    "message": "What is dyslexia?",
    "model": "llama2",
    "use_rag": true
}
```

Response:
```json
{
    "response": "Dyslexia is a learning difference that affects...",
    "model_used": "llama2",
    "sources_used": true
}
```

### RAG Management Endpoints

#### Initialize RAG System
```
POST /rag/initialize
```
Optional request body:
```json
{
    "urls": ["https://example.com/dyslexia-info"]
}
```

#### Check RAG Status
```
GET /rag/status
```

Response:
```json
{
    "initialized": true,
    "vectorstore_available": true,
    "default_websites": ["https://understood.org/..."]
}
```

## Technical Implementation

### RAG Pipeline

1. **Document Loading**: Web content is loaded from specified URLs
2. **Text Splitting**: Documents are split into manageable chunks (1000 chars with 200 char overlap)
3. **Embedding**: Text chunks are converted to embeddings using Ollama
4. **Vector Storage**: Embeddings are stored in ChromaDB for efficient retrieval
5. **Retrieval**: Most relevant chunks are retrieved based on query similarity
6. **Generation**: Retrieved context is combined with the user query in the prompt

### Components

#### RAGSystem Class
- **`initialize_vectorstore()`**: Sets up the vector database with website content
- **`retrieve_relevant_content()`**: Finds relevant information for queries
- **`_create_fallback_content()`**: Provides offline content when websites aren't accessible

#### Enhanced Chat Components
- **RAG Toggle**: Users can enable/disable RAG in settings
- **Status Indicator**: Shows when RAG is active and working
- **Source Attribution**: Messages indicate when external knowledge was used

## Configuration

### Default Websites
The system is pre-configured with authoritative dyslexia resources:
- Understood.org (comprehensive dyslexia information)
- Dyslexia.com (research-based content)
- British Dyslexia Association (expert guidance)

### Customization
You can add custom websites by:
1. Using the `/rag/initialize` endpoint with custom URLs
2. Modifying the `default_websites` list in the `RAGSystem` class

## Error Handling

- **Website Loading Failures**: System continues with available content
- **No Internet Access**: Fallback content ensures basic functionality
- **Model Errors**: Graceful degradation to non-RAG responses

## Benefits

### For Users
- **More Accurate Information**: Responses based on current, authoritative sources
- **Comprehensive Answers**: Combined AI knowledge with specialized content
- **Transparency**: Clear indication when external sources are used

### For Developers
- **Modular Design**: Easy to add new information sources
- **Flexible Configuration**: RAG can be toggled on/off as needed
- **Robust Error Handling**: System remains functional even with component failures

## Troubleshooting

### Common Issues

1. **RAG Not Initializing**
   - Check internet connection
   - Verify website URLs are accessible
   - Ensure Ollama is running

2. **Slow Response Times**
   - Reduce number of retrieved chunks
   - Optimize chunk size and overlap
   - Consider using faster embedding models

3. **Poor Quality Responses**
   - Add more relevant websites
   - Improve prompt engineering
   - Filter low-quality content sources

### Debug Mode
Enable debug logging to see:
- Document loading process
- Embedding generation
- Retrieval results
- Context used in prompts

## Future Enhancements

- **Real-time Content Updates**: Automatically refresh content periodically
- **Source Citation**: Provide direct links to information sources
- **Content Filtering**: Advanced filtering for age-appropriate content
- **Multi-language Support**: RAG for different languages
- **Analytics**: Track which sources are most useful

## Contributing

To add new features or improve the RAG system:
1. Follow the existing code structure
2. Add appropriate error handling
3. Update documentation
4. Test with various query types
5. Ensure fallback mechanisms work


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
=======
# Chatbot Project
>>>>>>> UI

This repository contains a chatbot application with a Python backend (using LangChain and Groq) and a Node.js frontend. Follow the instructions below to set up and run the project locally.

## 1. Prerequisites
Before starting, ensure you have the following installed:
- [Conda](https://docs.conda.io/en/latest/miniconda.html) (Miniconda or Anaconda)
- [Node.js and npm](https://nodejs.org/)
- [Git](https://git-scm.com/)
- API Keys: Obtain from [Groq](https://console.groq.com/) and [LangChain](https://platform.langchain.com/)

## 2. Complete Setup in Terminal
Copy and paste the following commands into your terminal to complete the entire setup:

```bash
# Clone repository and enter project directory
git clone https://github.com/your-username/your-repo.git
cd your-repo

# Create and activate Conda environment
conda create -n chatbot_env python=3.10
conda activate chatbot_env

# Create environment variables file
echo "GROQ_API_KEY=your_groq_api_key" > .env
echo "LANGCHAIN_API_KEY=your_langchain_api_key" >> .env

# Install Python dependencies
pip install -r requirements.txt

# Set up frontend
npm install
npm run dev
cd ..
