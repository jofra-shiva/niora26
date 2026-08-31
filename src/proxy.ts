import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const PROTECTED_ROUTES = ['/dashboard', '/register/complete'];
// Routes that require admin
const ADMIN_ROUTES = ['/admin'];
// Routes that redirect to dashboard if already logged in
const AUTH_ROUTES = ['/login', '/signup', '/reset-password'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for session cookie (we set this on login)
  const session = request.cookies.get('hackspark26-session')?.value;

  // Redirect authenticated users away from auth pages
  if (AUTH_ROUTES.some(r => pathname.startsWith(r))) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Protect dashboard routes
  if (PROTECTED_ROUTES.some(r => pathname.startsWith(r))) {
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Protect admin routes
  if (ADMIN_ROUTES.some(r => pathname.startsWith(r))) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // Admin role is verified at the page/API level with firebase-admin
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/register/complete/:path*',
    '/login',
    '/signup',
    '/reset-password',
  ],
};
