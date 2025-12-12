import { GoogleGenerativeAI } from '@google/generative-ai';
import { logger } from '@/lib/logger';
import { chatRatelimit, getIp } from '@/lib/rate-limiter'; // Import ratelimiter

// Make sure to set the GOOGLE_API_KEY environment variable
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
const MODEL = process.env.GOOGLE_MODEL || 'gemini-pro';

interface ChatRequest {
  prompt: string;
  messages?: Array<{
    id: string;
    sender: 'user' | 'ai';
    text: string;
    timestamp: number;
  }>;
  flowId?: string;
  systemPrompt?: string;
  leadData?: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    service_interested?: string;
    preferred_time?: string;
    notes?: string;
  };
}

// Function to sanitize and structure lead data to prevent prompt injection
function sanitizeAndStructureLeadData(leadData: ChatRequest['leadData']): string {
  if (!leadData || !Object.values(leadData).some(v => v)) {
    return '';
  }

  // Simple sanitizer: escape characters that might be used for injection
  const sanitizeForPrompt = (str: string) => 
    str.replace(/[[\]{}()]/g, '\\$&');

  const sanitizedContext = Object.entries(leadData)
    .filter(([, v]) => v)
    .map(([k, v]) => `  <${k}>${sanitizeForPrompt(v as string)}</${k}>`)
    .join('\n');

  return `\n\n<lead-information>\n${sanitizedContext}\n</lead-information>`;
}

export async function POST(request: Request) {
  try {
    const ip = getIp(request);
    const { success, pending, limit, reset, remaining } = await chatRatelimit.limit(ip);

    if (!success) {
      return new Response('Too Many Requests', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      });
    }

    const { prompt, messages, flowId, systemPrompt, leadData } = (await request.json()) as ChatRequest;

    const MAX_PROMPT_LENGTH = 1000;
    const MAX_HISTORY_LENGTH = 20;

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
      return new Response(JSON.stringify({ error: 'Prompt too long' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const model = genAI.getGenerativeModel({ model: MODEL });

    // Trim history to prevent token bloat
    const trimmedMessages = (messages || []).slice(-MAX_HISTORY_LENGTH);

    // Build conversation history for context
    const conversationHistory = trimmedMessages
      .map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }));

    // Build enhanced system prompt with sanitized lead data
    let fullSystemPrompt = systemPrompt || 'You are a helpful CX assistant.';
    fullSystemPrompt += sanitizeAndStructureLeadData(leadData);

    // Start chat session with history and system instruction
    const chat = model.startChat({
      history: conversationHistory.slice(0, -1),
      systemInstruction: fullSystemPrompt,
    });

    const result = await chat.sendMessage(prompt);
    const text = result.response.text();

    // Log for analytics
    if (flowId) {
      logger.info(`Chat request for flow: ${flowId}`, { messageCount: messages?.length || 1 });
    }

    return new Response(JSON.stringify({ text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    logger.error('Chat API error', error);
    const isDev = process.env.NODE_ENV === 'development';
    return new Response(
      JSON.stringify({
        error: 'Failed to generate AI response',
        code: 'CHAT_ERROR',
        ...(isDev && { details: error instanceof Error ? error.message : String(error) }),
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
