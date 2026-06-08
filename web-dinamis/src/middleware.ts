import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Use env secret directly to avoid importing auth.ts which pulls in mysql2
  const secret = process.env.NEXTAUTH_SECRET || "your-super-secret-key-1234";
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/admin')) {
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
