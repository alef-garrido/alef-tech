import { LeadFormData } from '@/app/types/lead';
import { createClient } from '@supabase/supabase-js';

// n8n webhook URL
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || '';

// Lazy-load Supabase client to avoid initialization errors during build
let supabaseInstance: ReturnType<typeof createClient> | null = null;

function getSupabaseClient() {
  if (supabaseInstance) {
    return supabaseInstance;
  }
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials are not configured. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.');
  }
  
  supabaseInstance = createClient(supabaseUrl, supabaseKey);
  return supabaseInstance;
}

/**
 * Send webhook payload to n8n workflow
 * This is done asynchronously and doesn't block the API response
 */
async function sendToN8nWebhook(leadData: Record<string, unknown>, leadId: string) {
  if (!N8N_WEBHOOK_URL) {
    console.warn('N8N_WEBHOOK_URL not configured, skipping webhook');
    return;
  }

  try {
    const payload = {
      leadId,
      ...leadData,
      capturedAt: new Date().toISOString(),
      source: 'xnoria-diagnostic',
    };

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`N8N webhook error: ${response.status}`, await response.text());
      return;
    }

    console.log('N8N webhook sent successfully', { leadId });
  } catch (error) {
    console.error('N8N webhook delivery failed:', error);
    // Don't throw - webhook failure shouldn't fail the lead capture
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as LeadFormData;

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.service) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Determine the source based on service type
    let source = 'squeeze-page';
    if (body.service === 'diagnostic') {
      source = 'xnoria-diagnostic';
    }

    // Save to Supabase
    const leadData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company || null,
      service_interested: body.service,
      preferred_time: body.timeline || null,
      notes: body.notes || null,
      flow_id: body.flowId || `flow-${Date.now()}`,
      session_id: body.sessionId || `session-${Date.now()}`,
    };

    const { data, error } = await (getSupabaseClient() as any)
      .from('leads')
      .insert([leadData])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      // Continue even if Supabase fails - log locally
    }

    const leadId = data?.[0]?.id || `lead-${Date.now()}`;

    console.log('Lead capture submission:', {
      leadId,
      email: body.email,
      service: body.service,
      company: body.company,
      source,
      timestamp: new Date().toISOString(),
    });

    // Send to n8n webhook asynchronously (don't await)
    if (body.service === 'diagnostic' && N8N_WEBHOOK_URL) {
      sendToN8nWebhook(leadData, String(leadId)).catch((err) => {
        console.error('Async webhook error:', err);
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for your submission. We will be in touch soon.',
        leadId,
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Lead capture error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to process lead submission',
        code: 'LEAD_SUBMISSION_ERROR',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
