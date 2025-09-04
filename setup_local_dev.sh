#!/bin/bash

# Readle Chatbot Setup Script for Local Development with ngrok
# This script helps you set up the local backend and ngrok tunnel

echo "🚀 Readle Chatbot Local Setup with ngrok"
echo "========================================"

# Check if required tools are installed
echo "Checking prerequisites..."

# Check Python
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.8+ first."
    exit 1
fi
echo "✅ Python found"

# Check uvicorn
if ! command -v uvicorn &> /dev/null; then
    echo "⚠️  uvicorn not found. Installing..."
    pip install uvicorn
fi
echo "✅ uvicorn ready"

# Check ngrok
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok is not installed. Please install ngrok first:"
    echo "   Visit: https://ngrok.com/download"
    echo "   Or: brew install ngrok (macOS) / choco install ngrok (Windows)"
    exit 1
fi
echo "✅ ngrok found"

echo ""
echo "📋 Setup Steps:"
echo "==============="

echo "1. Starting backend server..."
echo "   Command: uvicorn chatbot_api:app --host 0.0.0.0 --port 8000 --reload"
echo ""

echo "2. In a new terminal, start ngrok tunnel:"
echo "   Command: ngrok http 8000"
echo ""

echo "3. Copy the HTTPS forwarding URL from ngrok (e.g., https://a1b2c3d4.ngrok-free.app)"
echo ""

echo "4. Update your .env file with:"
echo "   ALLOWED_ORIGINS=https://readle-sigma.vercel.app,https://YOUR_NGROK_URL"
echo ""

echo "5. In Vercel dashboard, set environment variable:"
echo "   NEXT_PUBLIC_API_BASE_URL=https://YOUR_NGROK_URL"
echo ""

echo "6. Redeploy your Vercel frontend"
echo ""

echo "🔧 Quick Commands:"
echo "=================="
echo ""
echo "Start backend (run this first):"
echo "uvicorn chatbot_api:app --host 0.0.0.0 --port 8000 --reload"
echo ""
echo "Start ngrok tunnel (in new terminal):"
echo "ngrok http 8000"
echo ""
echo "Test backend health:"
echo "curl http://localhost:8000/health"
echo ""
echo "Test ngrok tunnel:"
echo "curl https://YOUR_NGROK_URL/health"
echo ""

echo "📝 Environment Variables Checklist:"
echo "===================================="
echo ""
echo "Backend (.env):"
echo "- GROQ_API_KEY=your_groq_api_key"
echo "- ALLOWED_ORIGINS=https://readle-sigma.vercel.app,https://YOUR_NGROK_URL"
echo ""
echo "Frontend (Vercel Environment Variables):"
echo "- NEXT_PUBLIC_API_BASE_URL=https://YOUR_NGROK_URL"
echo ""

echo "🎯 Ready to start! Run the backend first, then ngrok, then update your environment variables."
