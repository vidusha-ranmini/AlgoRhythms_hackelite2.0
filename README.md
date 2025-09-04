# 📚 Readle - Empowering Children with Dyslexia to Read with Confidence

> An interactive educational platform designed specifically for children with dyslexia, combining evidence-based teaching methods with engaging technology.

![Readle Hero](public/images/hero-image.png)

## 🌟 Overview

Readle (formerly ReadLe) is a comprehensive educational platform that transforms reading challenges into confident reading skills for children with dyslexia. Founded in 2020 by educators, cognitive scientists, and parents of dyslexic children, Readle combines the latest neuroscience research with interactive technology to create personalized learning experiences.

### 🎯 Mission
We believe every child deserves to experience the joy and empowerment that comes from confident reading. Our mission is to ensure that learning differences never stand in the way of a child's potential.

## ✨ Key Features

### 🧩 Dyslexia Assessment Quiz
- **Comprehensive evaluation** with research-based questions
- **Risk level assessment** (Low, Medium, High)
- **Personalized recommendations** based on results
- **Professional guidance** for next steps

### 🎮 Interactive Learning Activities
- **Multi-sensory approaches** engaging visual, auditory, and kinesthetic senses
- **Gamified reading exercises** to maintain engagement
- **Phonics and phonological awareness** training
- **Text-to-speech support** for accessibility

### 🤖 AI-Powered Chatbot Assistant
- **RAG (Retrieval-Augmented Generation)** enhanced responses
- **Dyslexia-specialized knowledge base** from trusted sources
- **Real-time support** for children and parents
- **Evidence-based guidance** and strategies

### 📊 Progress Tracking & Analytics
- **Detailed progress charts** showing improvement over time
- **Activity history tracking** for parents and educators
- **Achievement badges** to celebrate milestones
- **Personalized learning paths** based on individual needs

### 👨‍⚕️ Professional Support Network
- **Access to qualified psychologists** specializing in dyslexia
- **Educational consultations** and assessments
- **Parent guidance sessions** for home support strategies
- **School collaboration tools** for educators

### 🎨 Child-Friendly Design
- **Dyslexia-friendly fonts** and color schemes
- **Intuitive navigation** designed for young users
- **Audio instructions** and voice guidance
- **Reduced visual stress** with careful design choices

## 🛠️ Technology Stack

### Frontend (Next.js 15)
```json
{
  "framework": "Next.js 15.3.3",
  "language": "TypeScript",
  "ui": "Tailwind CSS 4",
  "animations": "Framer Motion",
  "charts": "Recharts",
  "icons": "Heroicons, Lucide React"
}
```

### Backend (FastAPI)
```python
{
  "framework": "FastAPI",
  "language": "Python 3.8+",
  "ai_models": "Ollama (Llama2, Llama3, Mistral)",
  "vector_db": "ChromaDB",
  "embeddings": "Ollama Embeddings",
  "document_processing": "LangChain"
}
```

### AI & ML Components
- **LangChain** for AI orchestration
- **Groq API** for enhanced language models
- **Sentence Transformers** for semantic search
- **RAG System** with ChromaDB vector storage
- **Text-to-Speech** integration for accessibility

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.8+ and pip
- **Ollama** (for local AI models)
- **Git** for version control

### 1. Clone the Repository
```bash
git clone https://github.com/vidusha-ranmini/AlgoRhythms_hackelite2.0.git
cd AlgoRhythms_hackelite2.0
```

### 2. Frontend Setup (Next.js)
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
The frontend will be available at `http://localhost:3000`

### 3. Backend Setup (FastAPI)
```bash
# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys and configuration

# Start the backend server
uvicorn chatbot_api:app --host 0.0.0.0 --port 8000 --reload
```
The API will be available at `http://localhost:8000`

### 4. Alternative: Modular Backend Setup
```bash
# Using the restructured chatbot module
cd chatbot
python main.py
```

### 5. Streamlit Interface (Optional)
```bash
# Run the Streamlit chatbot interface
streamlit run chatbot_streamlit.py
```

## 📋 Environment Configuration

### Frontend Environment Variables
Create a `.env.local` file in the root directory:
```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_CHAT_API_URL=http://localhost:8000

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### Backend Environment Variables
Create a `.env` file in the root directory:
```env
# AI Model Configuration
GROQ_API_KEY=your_groq_api_key
OPENAI_API_KEY=your_openai_api_key
LANGSMITH_API_KEY=your_langsmith_api_key

# Server Configuration
HOST=0.0.0.0
PORT=8000
API_TITLE="Readle Chatbot API"
API_VERSION="1.0.0"

# CORS Configuration
ALLOWED_ORIGINS=["http://localhost:3000", "https://yourdomain.com"]
ALLOWED_ORIGIN_REGEX=https://.*\.ngrok-free\.app

# RAG Configuration
RELEVANCE_THRESHOLD=0.7
MAX_RETRIEVAL_RESULTS=5
```

## 🏗️ Project Structure

```
AlgoRhythms_hackelite2.0/
├── 📁 src/                           # Next.js frontend source
│   ├── 📁 app/                       # App router pages
│   │   ├── 📁 (public)/              # Public pages (landing, about, etc.)
│   │   ├── 📁 (authenticated)/       # Protected pages (dashboard, etc.)
│   │   ├── 📁 (child)/              # Child-specific interface
│   │   └── 📁 quiz/                 # Dyslexia assessment quiz
│   ├── 📁 components/               # Reusable React components
│   │   ├── 📁 charts/               # Data visualization components
│   │   ├── 📁 forms/                # Form components
│   │   ├── 📁 headers/              # Navigation components
│   │   ├── 📁 quiz/                 # Quiz-specific components
│   │   └── 📁 ui/                   # UI components (chatbot, etc.)
│   ├── 📁 context/                  # React context providers
│   ├── 📁 data/                     # Static data (blog posts, questions)
│   ├── 📁 hooks/                    # Custom React hooks
│   └── 📁 lib/                      # Utility functions and API calls
├── 📁 chatbot/                      # Modular FastAPI backend
│   ├── 📁 api/                      # API route handlers
│   ├── 📁 core/                     # Core configuration
│   ├── 📁 models/                   # Pydantic models
│   ├── 📁 services/                 # Business logic (LLM, RAG, Memory)
│   └── 📁 utils/                    # Utility functions
├── 📁 public/                       # Static assets
│   └── 📁 images/                   # Images and icons
├── 📄 chatbot_api.py                # Standalone FastAPI server
├── 📄 chatbot_streamlit.py          # Streamlit interface
├── 📄 requirements.txt              # Python dependencies
├── 📄 package.json                  # Node.js dependencies
└── 📄 README.md                     # This file
```

## 🔌 API Endpoints

### Chat API
```http
POST /chat
Content-Type: application/json

{
  "message": "How can I help my child with dyslexia?",
  "model": "llama2",
  "use_rag": true,
  "session_id": "optional-session-id"
}
```

### RAG System
```http
# Initialize RAG system
POST /rag/initialize

# Check RAG status
GET /rag/status

# Update knowledge base
POST /rag/update
```

### System Health
```http
# Health check
GET /health

# Get available models
GET /models
```

## 🧠 RAG (Retrieval-Augmented Generation) System

The chatbot uses an advanced RAG system that enhances responses with information from trusted sources:

### 📚 Knowledge Sources
- **Understood.org** - Comprehensive dyslexia resources
- **Dyslexia.com** - Educational strategies and support
- **British Dyslexia Association** - Research and best practices
- **Fallback content** - Curated information for offline use

### 🔍 Features
- **Semantic search** for relevant information retrieval
- **Real-time enhancement** of AI responses
- **Source attribution** for transparency
- **Relevance scoring** to ensure quality

## 🎯 Target Audience

### Primary Users
- **Children with dyslexia** (ages 5-12)
- **Parents and caregivers** seeking support resources
- **Educators** looking for specialized teaching tools

### Use Cases
- **Early identification** of dyslexia signs
- **Supplementary learning** alongside school curriculum
- **Parent education** on dyslexia support strategies
- **Professional guidance** for intervention planning

## 🧪 Assessment & Evaluation

### Dyslexia Quiz Features
- **10+ research-based questions** covering key indicators
- **Scoring algorithm** based on educational research
- **Risk categorization** (Low, Medium, High)
- **Detailed recommendations** for each risk level
- **Professional referral guidance** when appropriate

### Sample Questions
- Difficulty with phonological processing
- Challenges in letter recognition
- Reading fluency and accuracy issues
- Spelling and writing difficulties
- Working memory challenges

## 🎨 Design Principles

### Dyslexia-Friendly Design
- **Clear, sans-serif fonts** (Geist font family)
- **High contrast** color schemes
- **Reduced visual clutter** for better focus
- **Audio support** for text content
- **Consistent navigation** patterns

### Accessibility Features
- **Screen reader compatibility**
- **Keyboard navigation** support
- **Text-to-speech** integration
- **Adjustable text sizes**
- **Color customization** options

## 📈 Development Roadmap

### Current Features ✅
- Interactive dyslexia assessment quiz
- AI-powered chatbot with RAG capabilities
- Progress tracking and analytics
- Multi-sensory learning activities
- Professional psychologist directory

### Upcoming Features 🚧
- **Adaptive learning algorithms** for personalized content
- **Mobile app** for iOS and Android
- **Parent-teacher collaboration** tools
- **Advanced progress analytics** with ML insights
- **Multi-language support** for diverse communities

### Future Enhancements 🔮
- **VR/AR learning experiences** for immersive education
- **Peer support communities** for children and families
- **Integration with school systems** for seamless workflow
- **Advanced AI tutoring** with speech recognition

## 🔧 Development Scripts

### Frontend Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Backend Commands
```bash
# Standard FastAPI server
uvicorn chatbot_api:app --reload

# Modular backend
cd chatbot && python main.py

# Streamlit interface
streamlit run chatbot_streamlit.py

# Run with specific configuration
uvicorn chatbot.main:app --host 0.0.0.0 --port 8000
```

### Deployment Scripts
```bash
# Windows PowerShell setup
./setup_local_dev.ps1

# Unix/Linux setup
./setup_local_dev.sh

# With ngrok tunnel for external access
ngrok http 8000
```

## 🚀 Deployment

### Frontend Deployment (Vercel)
```bash
# Deploy to Vercel
npm run build
vercel --prod
```

### Backend Deployment (Docker)
```dockerfile
FROM python:3.9-slim
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "chatbot.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment-Specific Configuration
- **Development**: Local servers with hot reload
- **Staging**: ngrok tunnels for testing
- **Production**: Vercel (frontend) + cloud hosting (backend)

## 🤝 Contributing

We welcome contributions from educators, developers, and dyslexia advocates!

### How to Contribute
1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Areas for Contribution
- **Educational content** and learning activities
- **Accessibility improvements** and features
- **Language translations** for global reach
- **Research integration** and evidence-based methods
- **UI/UX enhancements** for better user experience

## 📊 Research & Evidence Base

### Educational Research
- **Structured Literacy** approach implementation
- **Multi-sensory learning** methodologies
- **Phonological awareness** development strategies
- **Reading comprehension** enhancement techniques

### Cognitive Science Integration
- **Working memory** support strategies
- **Visual processing** optimization
- **Attention and focus** management
- **Motivation and engagement** psychology

## 🏆 Recognition & Awards

- **2024 EdTech Innovation Award** - Best Accessibility Solution
- **2023 Dyslexia Foundation Grant** - Educational Technology
- **2023 Parent Choice Award** - Special Needs Education

## 📞 Support & Community

### Getting Help
- **Documentation**: [Wiki pages](https://github.com/vidusha-ranmini/AlgoRhythms_hackelite2.0/wiki)
- **Issues**: [GitHub Issues](https://github.com/vidusha-ranmini/AlgoRhythms_hackelite2.0/issues)
- **Discussions**: [Community Forum](https://github.com/vidusha-ranmini/AlgoRhythms_hackelite2.0/discussions)
- **Email**: support@readle.com

### Professional Network
- **Educational Psychologists** specializing in dyslexia
- **Reading Specialists** and intervention experts
- **Special Education Teachers** with dyslexia expertise
- **Parent Support Groups** and advocacy organizations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Dyslexia Research Organizations** for evidence-based guidelines
- **Educational Technology Community** for best practices
- **Open Source Contributors** who make this project possible
- **Families affected by dyslexia** who inspire our mission

---

<div align="center">

**🌟 Together, we're transforming reading challenges into reading success! 🌟**

[![GitHub stars](https://img.shields.io/github/stars/vidusha-ranmini/AlgoRhythms_hackelite2.0)](https://github.com/vidusha-ranmini/AlgoRhythms_hackelite2.0/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/vidusha-ranmini/AlgoRhythms_hackelite2.0)](https://github.com/vidusha-ranmini/AlgoRhythms_hackelite2.0/network)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>
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
