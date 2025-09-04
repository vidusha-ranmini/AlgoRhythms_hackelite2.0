# Readle Chatbot Setup Script for Local Development with ngrok (Windows PowerShell)
# This script helps you set up the local backend and ngrok tunnel

Write-Host "🚀 Readle Chatbot Local Setup with ngrok" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Check if required tools are installed
Write-Host "Checking prerequisites..." -ForegroundColor Yellow

# Check Python
try {
    $pythonVersion = python --version
    Write-Host "✅ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python is not installed. Please install Python 3.8+ first." -ForegroundColor Red
    exit 1
}

# Check uvicorn
try {
    $uvicornVersion = uvicorn --version
    Write-Host "✅ uvicorn ready" -ForegroundColor Green
} catch {
    Write-Host "⚠️  uvicorn not found. Installing..." -ForegroundColor Yellow
    pip install uvicorn
}

# Check ngrok
try {
    $ngrokVersion = ngrok version
    Write-Host "✅ ngrok found: $ngrokVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ ngrok is not installed. Please install ngrok first:" -ForegroundColor Red
    Write-Host "   Visit: https://ngrok.com/download" -ForegroundColor Red
    Write-Host "   Or: choco install ngrok (if you have Chocolatey)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 Setup Steps:" -ForegroundColor Cyan
Write-Host "===============" -ForegroundColor Cyan

Write-Host "1. Starting backend server..." -ForegroundColor White
Write-Host "   Command: uvicorn chatbot_api:app --host 0.0.0.0 --port 8000 --reload" -ForegroundColor Gray
Write-Host ""

Write-Host "2. In a new PowerShell window, start ngrok tunnel:" -ForegroundColor White
Write-Host "   Command: ngrok http 8000" -ForegroundColor Gray
Write-Host ""

Write-Host "3. Copy the HTTPS forwarding URL from ngrok (e.g., https://a1b2c3d4.ngrok-free.app)" -ForegroundColor White
Write-Host ""

Write-Host "4. Update your .env file with:" -ForegroundColor White
Write-Host "   ALLOWED_ORIGINS=https://readle-sigma.vercel.app,https://YOUR_NGROK_URL" -ForegroundColor Gray
Write-Host ""

Write-Host "5. In Vercel dashboard, set environment variable:" -ForegroundColor White
Write-Host "   NEXT_PUBLIC_API_BASE_URL=https://YOUR_NGROK_URL" -ForegroundColor Gray
Write-Host ""

Write-Host "6. Redeploy your Vercel frontend" -ForegroundColor White
Write-Host ""

Write-Host "🔧 Quick Commands:" -ForegroundColor Cyan
Write-Host "==================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Start backend (run this first):" -ForegroundColor White
Write-Host "uvicorn chatbot_api:app --host 0.0.0.0 --port 8000 --reload" -ForegroundColor Gray
Write-Host ""
Write-Host "Start ngrok tunnel (in new PowerShell window):" -ForegroundColor White
Write-Host "ngrok http 8000" -ForegroundColor Gray
Write-Host ""
Write-Host "Test backend health:" -ForegroundColor White
Write-Host "Invoke-WebRequest -Uri 'http://localhost:8000/health'" -ForegroundColor Gray
Write-Host ""
Write-Host "Test ngrok tunnel:" -ForegroundColor White
Write-Host "Invoke-WebRequest -Uri 'https://YOUR_NGROK_URL/health'" -ForegroundColor Gray
Write-Host ""

Write-Host "📝 Environment Variables Checklist:" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend (.env):" -ForegroundColor White
Write-Host "- GROQ_API_KEY=your_groq_api_key" -ForegroundColor Gray
Write-Host "- ALLOWED_ORIGINS=https://readle-sigma.vercel.app,https://YOUR_NGROK_URL" -ForegroundColor Gray
Write-Host ""
Write-Host "Frontend (Vercel Environment Variables):" -ForegroundColor White
Write-Host "- NEXT_PUBLIC_API_BASE_URL=https://YOUR_NGROK_URL" -ForegroundColor Gray
Write-Host ""

Write-Host "🎯 Ready to start! Run the backend first, then ngrok, then update your environment variables." -ForegroundColor Green

# Prompt to start backend automatically
$startBackend = Read-Host "Would you like to start the backend server now? (y/n)"
if ($startBackend -eq 'y' -or $startBackend -eq 'Y') {
    Write-Host "Starting backend server..." -ForegroundColor Green
    uvicorn chatbot_api:app --host 0.0.0.0 --port 8000 --reload
}
