import { supabase } from '@/lib/supabase';
import { logger } from '@/lib/logger';
import { leadRatelimit, ratelimit, getIp } from '@/lib/rate-limiter'; // Import ratelimiters

export interface LeadInput {
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  service_interested: string;
  preferred_time?: string;
  notes?: string;
  flow_id: string;
  session_id: string;
}

export async function POST(request: Request) {
  try {
    const ip = getIp(request);
    const { success, pending, limit, reset, remaining } = await leadRatelimit.limit(ip);

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

    const body = await request.json() as LeadInput;
    const { email, service_interested, flow_id, session_id } = body;

    // Validation
    if (!email || !service_interested || !flow_id || !session_id) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: email, service_interested, flow_id, session_id' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if lead already exists for this flow + email combination
    const { data: existingLead } = await supabase
      .from('leads')
      .select('id')
      .eq('email', email)
      .eq('flow_id', flow_id)
      .maybeSingle();

    let result;

    if (existingLead) {
      // Update existing lead
      const { data, error } = await supabase
        .from('leads')
        .update({
          ...body,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingLead.id)
        .select()
        .single();

      if (error) {
        throw error;
      }
      result = data;
      logger.info(`Lead updated: ${email} for flow ${flow_id}`);
    } else {
      // Create new lead
      const { data, error } = await supabase
        .from('leads')
        .insert([{
          ...body,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }
      result = data;
      logger.info(`Lead created: ${email} for flow ${flow_id}`);
    }

    return new Response(
      JSON.stringify({ success: true, lead: result }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    logger.error('Lead API error', error);
    const isDev = process.env.NODE_ENV === 'development';
    return new Response(
      JSON.stringify({
        error: 'Failed to save lead',
        code: 'LEAD_SAVE_ERROR',
        ...(isDev && { details: error instanceof Error ? error.message : String(error) }),
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function GET(request: Request) {
  try {
    const ip = getIp(request);
    const { success, pending, limit, reset, remaining } = await ratelimit.limit(ip);

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

    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    const flowId = url.searchParams.get('flow_id');

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email parameter required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let query = supabase
      .from('leads')
      .select('*')
      .eq('email', email);

    if (flowId) {
      query = query.eq('flow_id', flowId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ leads: data || [] }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    logger.error('Lead GET error', error);
    const isDev = process.env.NODE_ENV === 'development';
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch leads',
        code: 'LEAD_FETCH_ERROR',
        ...(isDev && { details: error instanceof Error ? error.message : String(error) }),
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
