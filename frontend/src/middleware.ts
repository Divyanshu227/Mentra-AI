import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken');
  
  // Define protected routes
  const protectedRoutes = ['/generate', '/quiz'];
  const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  // Define auth routes (login, register, etc.)
  const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];
  const isAuthRoute = authRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  if (isProtectedRoute && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is already logged in, they shouldn't access login/register pages
  if (isAuthRoute && refreshToken) {
    return NextResponse.redirect(new URL('/generate', request.url));
  }

  // Also protect the root route if you want it to require auth
  if (request.nextUrl.pathname === '/' && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
