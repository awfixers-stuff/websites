import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  // Skip auth for static files and API routes
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api/auth') ||
    request.nextUrl.pathname.startsWith('/api/patreon') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  const sessionCookie = request.cookies.get('better-auth.session_token');
  
  if (!sessionCookie) {
    // Redirect to sign-in for protected routes
    if (request.nextUrl.pathname.startsWith('/protected')) {
      const signInUrl = new URL('/api/auth/signin/patreon', request.url);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  }

  // Add auth status to headers for components
  const response = NextResponse.next();
  
  // Add user agent for debugging
  response.headers.set('x-user-agent', request.headers.get('user-agent') || '');
  
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};