import { LeadFormData } from '@/app/types/lead';

interface LeadSubmission extends LeadFormData {
  submittedAt: string;
  source: string;
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

    // Prepare lead submission
    const submission: LeadSubmission = {
      ...body,
      submittedAt: new Date().toISOString(),
      source: 'squeeze-page',
    };

    // Log the submission
    console.log('Lead capture submission:', {
      email: body.email,
      service: body.service,
      company: body.company,
    });

    // TODO: Send to email, CRM, or database
    // Example: Send welcome email, store in Supabase, etc.
    console.log('Lead submission:', submission);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for your submission. We will be in touch soon.',
        leadId: `lead-${Date.now()}`,
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
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
