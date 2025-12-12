import { getConversation, saveConversation, deleteConversation } from '@/lib/conversation-supabase';

interface SavedMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
}

interface ConversationData {
  flowId: string;
  messages: SavedMessage[];
  lastUpdated: number;
  sessionId: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, flowId, messages } = body;

    const sessionId = request.headers.get('x-session-id');

    if (!flowId || !sessionId) {
      return new Response(
        JSON.stringify({ error: 'flowId and sessionId required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'save') {
      const conversationData: ConversationData = {
        flowId,
        messages,
        lastUpdated: Date.now(),
        sessionId,
      };
      const success = await saveConversation(conversationData);

      return new Response(
        JSON.stringify({ success }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'load') {
      const data = await getConversation(flowId, sessionId);
      return new Response(
        JSON.stringify({ data: data || null }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'delete') {
      const success = await deleteConversation(flowId, sessionId);
      return new Response(
        JSON.stringify({ success }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Unknown action' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in conversation API:', error);
    const isDev = process.env.NODE_ENV === 'development';
    return new Response(
      JSON.stringify({
        error: 'Failed to manage conversation',
        code: 'CONVERSATION_ERROR',
        ...(isDev && { details: error instanceof Error ? error.message : String(error) }),
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
