import { NextRequest, NextResponse } from 'next/server';

const CSRF_TOKEN_HEADER = 'x-csrf-token';
const CSRF_TOKEN_COOKIE = '__csrf_token__';
const TOKEN_LENGTH = 32;
const TOKEN_TTL = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Generate a new CSRF token using webcrypto
 */
export function generateCSRFToken(): string {
  const buffer = new Uint8Array(TOKEN_LENGTH);
  crypto.getRandomValues(buffer);
  return Array.from(buffer).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify CSRF token from request header matches cookie
 */
export function verifyCSRFToken(request: NextRequest, token: string): boolean {
  const cookieToken = request.cookies.get(CSRF_TOKEN_COOKIE)?.value;

  if (!cookieToken || !token) {
    return false;
  }

  try {
    // Simple constant-time comparison
    if (token.length !== cookieToken.length) {
      return false;
    }
    let match = 0;
    for (let i = 0; i < token.length; i++) {
      match |= token.charCodeAt(i) ^ cookieToken.charCodeAt(i);
    }
    return match === 0;
  } catch {
    return false;
  }
}
