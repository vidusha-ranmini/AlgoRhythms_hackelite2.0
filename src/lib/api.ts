/**
 * API Configuration for Readle Chatbot
 * 
 * Environment Variables (add to Vercel dashboard):
 * - NEXT_PUBLIC_API_BASE_URL: Primary API URL (e.g., https://a1b2c3d4.ngrok-free.app)
 * - NEXT_PUBLIC_CHAT_API_URL: Fallback API URL 
 * 
 * For local development, the API will default to http://localhost:8000
 */

// Type definitions for API responses
interface CreateSessionResponse {
    session_id: string;
    message: string;
}

interface ChatResponse {
    response: string;
    session_id: string;
    sources_used?: boolean;
    relevance_score?: number;
    reasoning?: string;
    response_type?: string;
}

interface HealthResponse {
    status: string;
    service: string;
    active_sessions: number;
    rag_initialized: boolean;
    relevance_threshold: number;
    rag_disabled: string;
    include_pdfs: string;
    chroma_dir: string;
}

// Get the API base URL with fallback chain
export const getApiBaseUrl = (): string => {
    // Priority order: NEXT_PUBLIC_API_BASE_URL > NEXT_PUBLIC_CHAT_API_URL > localhost fallback
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL ||
        process.env.NEXT_PUBLIC_CHAT_API_URL ||
        'http://localhost:8000';

    return apiUrl.replace(/\/$/, ''); // Remove trailing slash
};

export const API_BASE_URL = getApiBaseUrl();

// API endpoints
export const API_ENDPOINTS = {
    chat: `${API_BASE_URL}/chat`,
    newSession: `${API_BASE_URL}/chat/session/new`,
    clearSession: (sessionId: string) => `${API_BASE_URL}/chat/session/${sessionId}`,
    health: `${API_BASE_URL}/health`,
    ragStatus: `${API_BASE_URL}/rag/status`,
} as const;

// API utility functions
export const createChatSession = async (): Promise<CreateSessionResponse> => {
    const response = await fetch(API_ENDPOINTS.newSession, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to create session: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

export const sendChatMessage = async (message: string, sessionId?: string): Promise<ChatResponse> => {
    const response = await fetch(API_ENDPOINTS.chat, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message,
            session_id: sessionId,
        }),
    });

    if (!response.ok) {
        throw new Error(`Chat request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

export const clearChatSession = async (sessionId: string): Promise<void> => {
    const response = await fetch(API_ENDPOINTS.clearSession(sessionId), {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Failed to clear session: ${response.status} ${response.statusText}`);
    }
};

export const checkApiHealth = async (): Promise<HealthResponse> => {
    const response = await fetch(API_ENDPOINTS.health);

    if (!response.ok) {
        throw new Error(`Health check failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

// Development helper
export const logApiConfig = () => {
    if (process.env.NODE_ENV === 'development') {
        console.log('🔧 API Configuration:', {
            baseUrl: API_BASE_URL,
            endpoints: API_ENDPOINTS,
            envVars: {
                NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
                NEXT_PUBLIC_CHAT_API_URL: process.env.NEXT_PUBLIC_CHAT_API_URL,
            }
        });
    }
};
