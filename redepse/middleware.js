import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
    const isEscuelaRoute = req.nextUrl.pathname.startsWith('/escuela');

    if (isAdminRoute && payload.tipo !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (isEscuelaRoute && payload.tipo !== 'escuela') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
  } catch (e) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', '/escuela/:path*'],
};