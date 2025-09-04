# Readle Chatbot API - Restructured

A well-organized, modular FastAPI application for the Readle dyslexia support chatbot.

## 📁 Project Structure

```
chatbot/
├── __init__.py                 # Package initialization
├── main.py                     # Main FastAPI application
├── core/                       # Core configuration
│   ├── __init__.py
│   └── config.py              # Settings and configuration
├── api/                        # API routes
│   ├── __init__.py
│   ├── chat.py                # Chat endpoints
│   ├── rag.py                 # RAG management endpoints
│   └── system.py              # Health and utility endpoints
├── services/                   # Business logic services
│   ├── __init__.py
│   ├── memory.py              # Chat session management
│   ├── rag.py                 # RAG system and document processing
│   └── llm.py                 # LLM service (Groq integration)
├── models/                     # Data models
│   ├── __init__.py
│   └── schemas.py             # Pydantic models
└── utils/                      # Utility functions
    ├── __init__.py
    └── text_processing.py     # Text analysis and processing
```

## 🚀 Quick Start

### Option 1: Using the new startup script
```bash
python run_chatbot.py
```

### Option 2: Using uvicorn directly
```bash
uvicorn chatbot.main:app --host 0.0.0.0 --port 8000 --reload
```

### Option 3: Using the legacy script (still works)
```bash
python chatbot_api.py
```

## 🔧 Configuration

All configuration is managed in `chatbot/core/config.py`. Environment variables are loaded automatically from `.env`:

```env
# Required
GROQ_API_KEY=your_groq_api_key

# Optional (with defaults)
PORT=8000
RAG_THRESHOLD=0.6
DISABLE_RAG=false
INCLUDE_PDFS=true
OLLAMA_MODEL=llama2
CHROMA_DIR=./chroma_db
ALLOWED_ORIGINS=https://readle-sigma.vercel.app
ALLOWED_ORIGIN_REGEX=
```

## 📋 API Endpoints

### Chat Endpoints (`/chat`)
- `POST /chat/session/new` - Create new chat session
- `POST /chat` - Send message to chatbot
- `GET /chat/session/{session_id}/history` - Get chat history
- `DELETE /chat/session/{session_id}` - Clear session
- `GET /chat/sessions/cleanup` - Clean expired sessions

### RAG Management (`/rag`)
- `POST /rag/initialize` - Initialize RAG system
- `GET /rag/status` - Get RAG system status
- `PUT /rag/threshold/{threshold}` - Update relevance threshold
- `GET /rag/test/{query}` - Test RAG relevance scoring

### System Endpoints
- `GET /` - API information
- `GET /health` - Health check
- `GET /chat/test-question-analysis/{query}` - Test question analysis

## 🏗️ Architecture Benefits

### Modularity
- **Separation of Concerns**: Each module has a single responsibility
- **Easy Testing**: Services can be tested independently
- **Maintainable**: Changes are isolated to specific modules

### Scalability
- **Service-oriented**: Easy to extract services to microservices later
- **Configuration Management**: Centralized settings
- **Async Support**: Built for high concurrency

### Developer Experience
- **Type Safety**: Full Pydantic model validation
- **Auto Documentation**: FastAPI generates OpenAPI docs
- **Hot Reload**: Changes reflect immediately in development

## 🔄 Migration from Old Structure

The old `chatbot_api.py` file is preserved for backward compatibility. To use the new structure:

1. **Start the new version**: `python run_chatbot.py`
2. **Test endpoints**: All existing endpoints work the same
3. **Verify functionality**: Chat, RAG, and health endpoints
4. **Update deployment**: Point to `chatbot.main:app` instead of `chatbot_api:app`

## 🛠️ Development

### Adding New Features

1. **New API endpoint**: Add to appropriate router in `api/`
2. **New business logic**: Add service to `services/`
3. **New data model**: Add to `models/schemas.py`
4. **New configuration**: Add to `core/config.py`

### Testing

```bash
# Test specific service
python -c "from chatbot.services.rag import rag_service; print(rag_service.get_status())"

# Test configuration
python -c "from chatbot.core.config import settings, print_settings; print_settings()"

# Test health endpoint
curl http://localhost:8000/health
```

## 📦 Dependencies

The restructured code uses the same dependencies as the original:
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `groq` - LLM API client
- `langchain-community` - RAG components
- `chromadb` - Vector database
- `pydantic` - Data validation
- `python-dotenv` - Environment variables

## 🚢 Deployment

### Docker (recommended)
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "run_chatbot.py"]
```

### Traditional
```bash
# Install dependencies
pip install -r requirements.txt

# Run application
uvicorn chatbot.main:app --host 0.0.0.0 --port 8000
```

## 🔍 Monitoring

The structured application provides better observability:
- Detailed startup logs with configuration
- Service-level error handling
- Health check endpoint with system status
- Structured logging throughout

## 📈 Performance

Benefits of the new structure:
- **Lazy Loading**: Services initialize only when needed
- **Memory Efficient**: Better resource management
- **Async Operations**: Non-blocking I/O operations
- **Caching Ready**: Easy to add caching layers

This restructured version maintains 100% API compatibility while providing a much more maintainable and scalable codebase.


ngrok http 8000