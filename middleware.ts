import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('admin_session')?.value;

    // 1. If accessing admin pages (excluding login) and no token -> Redirect to Login
    if (path.startsWith('/admin') && !token && path !== '/admin/login') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // 2. If accessing Login page and HAS token -> Redirect to Dashboard
    if (path === '/admin/login' && token) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
