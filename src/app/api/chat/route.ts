import { GoogleGenerativeAI, Content } from '@google/generative-ai';

// Make sure to set the GOOGLE_API_KEY environment variable
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

interface ChatRequest {
  prompt: string;
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

export async function POST(request: Request) {
  try {
    const { prompt, flowId, systemPrompt, leadData } = (await request.json()) as ChatRequest;

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Build the full prompt with system context if available
    let fullPrompt = prompt;
    if (systemPrompt) {
      fullPrompt = `${systemPrompt}\n\nUser message: ${prompt}`;
    }

    // Add lead context if available
    if (leadData && Object.values(leadData).some(v => v)) {
      const leadContext = Object.entries(leadData)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n');
      fullPrompt = `${fullPrompt}\n\nLead information:\n${leadContext}`;
    }

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();

    // Log flow interaction for analytics (can be extended to store in DB)
    if (flowId) {
      console.log(`[Flow: ${flowId}] User: ${prompt}`);
      console.log(`[Flow: ${flowId}] AI: ${text}`);
    }

    return new Response(JSON.stringify({ text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
