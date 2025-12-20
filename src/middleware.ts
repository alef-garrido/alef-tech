import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware: redirect root to default locale and leave other requests untouched.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If user hits root with no locale segment, redirect to /en
  if (pathname === '/' || pathname === '') {
    const url = request.nextUrl.clone();
    url.pathname = '/en';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
