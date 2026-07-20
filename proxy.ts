import { NextRequest, NextResponse } from 'next/server';

const AUTH_ROUTES = ['/login', '/register'];
const PROTECTED_ROUTES = ['/profile', '/notes'];

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const accessToken = req.cookies.has('accessToken');
  const refreshToken = req.cookies.has('refreshToken');

  if (AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    if (accessToken || refreshToken)
      return NextResponse.redirect(new URL('/notes', req.url));
    return NextResponse.next();
  }

  if (PROTECTED_ROUTES.some((r) => pathname.startsWith(r))) {
    if (!accessToken && !refreshToken)
      return NextResponse.redirect(new URL('/login', req.url));
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/notes/:path*', '/login', '/register'],
};
