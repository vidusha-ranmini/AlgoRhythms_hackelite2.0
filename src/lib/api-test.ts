// Test file to verify API types work correctly
import { createChatSession, sendChatMessage, checkApiHealth } from './api';

// This file is just for type checking - it should compile without errors
async function testTypes() {
    // Test createChatSession return type
    const session = await createChatSession();
    console.log(session.session_id, session.message);

    // Test sendChatMessage return type
    const chatResponse = await sendChatMessage("Hello", session.session_id);
    console.log(chatResponse.response, chatResponse.session_id);

    // Test checkApiHealth return type  
    const health = await checkApiHealth();
    console.log(health.status, health.rag_initialized);
}

export default testTypes;
