import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './actions/session.action';

// 1. Specify protected and public routes
const protectedRoutes = ['/', '/dashboard'];
const authRoutes = ['/login', '/signup'];

export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isAuthRoute = authRoutes.includes(path);

    // 3. Decrypt the session from the cookie
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);
    if (path === '/') {
        return NextResponse.redirect(new URL('/home', req.nextUrl));
    }

    if (isProtectedRoute && !session?.id) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    if (isAuthRoute && session?.id) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }

    return NextResponse.next();
}
