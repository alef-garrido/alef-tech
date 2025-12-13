import { NextRequest, NextResponse } from 'next/server';
import { verifyCSRFToken } from '@/lib/csrf';

// Paths that require CSRF protection (POST methods)
const CSRF_PROTECTED_PATHS = [
  '/api/chat',
  '/api/leads',
  '/api/conversations',
];

export function middleware(request: NextRequest) {
  // Only apply CSRF check to POST requests on protected paths
  if (request.method === 'POST') {
    const pathname = request.nextUrl.pathname;
    const isProtectedPath = CSRF_PROTECTED_PATHS.some(path => pathname.startsWith(path));

    if (isProtectedPath) {
      // Get CSRF token from request header
      const csrfToken = request.headers.get('x-csrf-token');
      
      // Verify the token
      if (!verifyCSRFToken(request, csrfToken || '')) {
        return NextResponse.json(
          { error: 'CSRF token validation failed' },
          { status: 403 }
        );
      }
    }
  }

  const response = NextResponse.next();

  // Set security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  // CSP Header - allows Gemini API, Supabase, and external assets for 3D animation
  const cspHeader = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://generativelanguage.googleapis.com https://*.supabase.co https://api.github.com https://miroleon.github.io",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
  response.headers.set('Content-Security-Policy', cspHeader);

  // HSTS header - enforce HTTPS
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  return response;
}

// Configure which routes the middleware applies to
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
