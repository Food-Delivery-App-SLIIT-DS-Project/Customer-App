import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of paths that need authentication
const protectedPaths = ['/home', 'restaurant', '/cart', '/checkout', '/order-confirmation', '/orders', '/profile'];
// const protectedPaths = ['/hee'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isProtected = protectedPaths.some((path) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  });
  if (!isProtected) {
    return NextResponse.next(); // Allow
  }

  const accessToken = request.cookies.get('accessToken')?.value;

  if (!accessToken) {
    const loginUrl = new URL('/login', request.url);
    // After login, you can redirect back
    // loginUrl.searchParams.set('redirect', pathname); 
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next(); // Allow
}
