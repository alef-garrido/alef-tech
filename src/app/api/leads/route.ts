import { LeadFormData } from '@/app/types/lead';
import { createClient } from '@supabase/supabase-js';

interface LeadSubmission extends LeadFormData {
  submittedAt: string;
  source: string;
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

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

    // Prepare lead submission
    const submission: LeadSubmission = {
      ...body,
      submittedAt: new Date().toISOString(),
      source: 'squeeze-page',
    };

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
      service: body.service,
      specific_needs: body.specificNeeds || null,
      budget: body.budget || null,
      timeline: body.timeline || null,
      notes: body.notes || null,
      submitted_at: new Date().toISOString(),
      source: source,
      status: 'new',
    };

    const { data, error } = await supabase
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
