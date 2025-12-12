export function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  const stored = sessionStorage.getItem('__alef_session_id__');
  if (stored) return stored;
  
  const newId = generateSessionId();
  sessionStorage.setItem('__alef_session_id__', newId);
  return newId;
}

interface SavedMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
}

/**
 * Get CSRF token from cookie
 */
function getCSRFToken(): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/(?:^|; )__csrf_token__=([^;]*)/);
  return match ? match[1] : '';
}

export async function saveConversation(
  flowId: string,
  messages: SavedMessage[]
): Promise<boolean> {
  try {
    const sessionId = getSessionId();
    const csrfToken = getCSRFToken();
    const response = await fetch('/api/conversations', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-session-id': sessionId,
        'x-csrf-token': csrfToken,
      },
      body: JSON.stringify({
        action: 'save',
        flowId,
        sessionId,
        messages,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to save conversation:', error);
    return false;
  }
}

export async function loadConversation(flowId: string): Promise<SavedMessage[] | null> {
  try {
    const sessionId = getSessionId();
    const response = await fetch('/api/conversations', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-session-id': sessionId,
      },
      body: JSON.stringify({
        action: 'load',
        flowId,
        sessionId,
      }),
    });
    const data = await response.json();
    return data.data?.messages || null;
  } catch (error) {
    console.error('Failed to load conversation:', error);
    return null;
  }
}

export async function deleteConversation(flowId: string): Promise<boolean> {
  try {
    const sessionId = getSessionId();
    const csrfToken = getCSRFToken();
    const response = await fetch('/api/conversations', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-session-id': sessionId,
        'x-csrf-token': csrfToken,
      },
      body: JSON.stringify({
        action: 'delete',
        flowId,
        sessionId,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to delete conversation:', error);
    return false;
  }
}
