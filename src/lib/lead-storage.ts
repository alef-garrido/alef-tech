import { getSessionId } from './conversation-storage';

export interface LeadData {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service_interested?: string;
  preferred_time?: string;
  notes?: string;
}

/**
 * Get CSRF token from cookie
 */
function getCSRFToken(): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/(?:^|; )__csrf_token__=([^;]*)/);
  return match ? match[1] : '';
}

export async function saveLead(
  flowId: string,
  leadData: LeadData
): Promise<boolean> {
  try {
    if (!leadData.email) {
      return false;
    }

    const sessionId = getSessionId();
    const csrfToken = getCSRFToken();

    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-session-id': sessionId,
        'x-csrf-token': csrfToken,
      },
      body: JSON.stringify({
        ...leadData,
        flow_id: flowId,
        session_id: sessionId,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to save lead:', error);
    return false;
  }
}

export async function getLead(
  email: string,
  flowId?: string
): Promise<LeadData | null> {
  try {
    const sessionId = getSessionId();
    const params = new URLSearchParams({ email });
    if (flowId) {
      params.append('flow_id', flowId);
    }

    const response = await fetch(`/api/leads?${params.toString()}`, {
      headers: {
        'x-session-id': sessionId,
      },
    });
    const data = await response.json();

    if (data.leads && data.leads.length > 0) {
      const lead = data.leads[0];
      return {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        service_interested: lead.service_interested,
        preferred_time: lead.preferred_time,
        notes: lead.notes,
      };
    }

    return null;
  } catch (error) {
    console.error('Failed to get lead:', error);
    return null;
  }
}
