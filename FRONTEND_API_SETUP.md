# Frontend API Configuration Guide

This guide explains how to configure the Readle frontend to work with your local backend via ngrok tunnels or deployed backend services.

## Environment Variables

The frontend uses these environment variables to connect to the chatbot API:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Primary API URL (production/ngrok) | `https://a1b2c3d4.ngrok-free.app` |
| `NEXT_PUBLIC_CHAT_API_URL` | Fallback API URL | `https://backup-api.example.com` |

> **Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never put sensitive information in these variables.

## Setup Scenarios

### 1. Local Development (Both Frontend & Backend Local)

When both frontend and backend are running locally:

```bash
# No environment variables needed
# Frontend automatically uses http://localhost:8000
npm run dev
```

### 2. Local Backend + Deployed Frontend (ngrok)

When backend is local but frontend is deployed on Vercel:

**Step 1:** Start your local backend
```bash
uvicorn chatbot_api:app --host 0.0.0.0 --port 8000 --reload
```

**Step 2:** Start ngrok tunnel
```bash
ngrok http 8000
# Copy the HTTPS URL, e.g., https://a1b2c3d4.ngrok-free.app
```

**Step 3:** Update backend CORS settings
```env
# In your backend .env file
ALLOWED_ORIGINS=https://readle-sigma.vercel.app,https://a1b2c3d4.ngrok-free.app
```

**Step 4:** Configure Vercel environment variable
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Add: `NEXT_PUBLIC_API_BASE_URL` = `https://a1b2c3d4.ngrok-free.app`
- Redeploy your frontend

### 3. Deployed Backend + Deployed Frontend

When both are deployed:

**Step 1:** Deploy your backend (Railway, Render, Fly.io, etc.)
```bash
# Example URLs:
# Railway: https://your-app.railway.app
# Render: https://your-app.onrender.com
# Fly.io: https://your-app.fly.dev
```

**Step 2:** Configure Vercel environment variable
- Add: `NEXT_PUBLIC_API_BASE_URL` = `https://your-backend-url.com`

## API Configuration File

The frontend uses a centralized API configuration in `src/lib/api.ts`:

```typescript
// Automatic fallback chain
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 
               process.env.NEXT_PUBLIC_CHAT_API_URL || 
               'http://localhost:8000';
```

## Testing Your Configuration

### 1. Check API Connection
```bash
# Test local backend
curl http://localhost:8000/health

# Test ngrok tunnel
curl https://YOUR_NGROK_URL/health

# Test deployed backend
curl https://your-backend-url.com/health
```

### 2. Browser Console
Open browser dev tools and check the console for API configuration logs:
```
🔧 API Configuration: {
  baseUrl: "https://a1b2c3d4.ngrok-free.app",
  endpoints: {...},
  envVars: {...}
}
```

### 3. Test Chat Functionality
1. Open the chatbot widget
2. Send a test message
3. Check for any CORS or connection errors in browser console

## Common Issues & Solutions

### CORS Errors
**Problem:** Browser blocks requests due to CORS policy
**Solution:** 
1. Add your frontend domain to backend `ALLOWED_ORIGINS`
2. For ngrok, use regex pattern: `ALLOWED_ORIGIN_REGEX=https://.*\.ngrok-free\.app`

### ngrok Tunnel Changes
**Problem:** ngrok URL changes each time you restart
**Solutions:**
1. Use regex pattern in backend CORS (recommended for dev)
2. Get ngrok premium for static domains
3. Use `ngrok http 8000 --subdomain=your-custom-name` (requires auth)

### Environment Variable Not Working
**Problem:** Frontend still uses localhost despite setting env vars
**Solutions:**
1. Ensure variable starts with `NEXT_PUBLIC_`
2. Restart your Next.js dev server
3. Clear browser cache
4. Check Vercel deployment logs

### Backend Not Responding
**Problem:** 500 errors or timeouts
**Solutions:**
1. Check `GROQ_API_KEY` is set correctly
2. Verify backend server is running
3. Check firewall/network settings
4. For ngrok, ensure tunnel is active

## Quick Setup Scripts

Use the provided setup scripts for easier configuration:

**Windows:**
```powershell
.\setup_local_dev.ps1
```

**macOS/Linux:**
```bash
./setup_local_dev.sh
```

## Advanced Configuration

### Custom Headers
If you need custom headers (e.g., for authentication):

```typescript
// In src/lib/api.ts
const response = await fetch(API_ENDPOINTS.chat, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-token', // If needed
        'ngrok-skip-browser-warning': 'true', // For ngrok
    },
    body: JSON.stringify(payload),
});
```

### Multiple Environments
Create different env files for different stages:

```bash
.env.local          # Local development
.env.development    # Development server
.env.staging        # Staging environment  
.env.production     # Production (handled by Vercel)
```

## Troubleshooting Checklist

- [ ] Backend server is running (`uvicorn` command)
- [ ] ngrok tunnel is active (if using ngrok)
- [ ] `GROQ_API_KEY` is set in backend `.env`
- [ ] `ALLOWED_ORIGINS` includes your frontend domain
- [ ] `NEXT_PUBLIC_API_BASE_URL` is set correctly in Vercel
- [ ] Frontend has been redeployed after env var changes
- [ ] Browser cache has been cleared
- [ ] No CORS errors in browser console
- [ ] Health endpoint returns 200 OK

Need help? Check the browser console for detailed error messages and API configuration logs.
