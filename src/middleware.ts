import { NextRequest, NextResponse } from 'next/server'
import { validateAccountToken } from './lib/auth/server-only'

// Middleware currently only supports the Edge runtime. The Node.js runtime can not be used.

const protectedRoutes = new Set(['/me', '/admin/dashboard', '/admin/products'])
const registerRoutes = new Set(['/signup', '/login'])

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.has(path)
  const isRegisterRoute = registerRoutes.has(path)

  if (!isProtectedRoute && !isRegisterRoute) {
    return NextResponse.next()
  }

  const account = await validateAccountToken()

  const authorized = !!account

  if (isProtectedRoute && !authorized) {
    const loginUrl = new URL('/login', req.nextUrl)
    loginUrl.searchParams.set('next', req.nextUrl.pathname)

    return NextResponse.redirect(loginUrl)
  }

  if (isRegisterRoute && authorized) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - the homepage path /
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|$).*)',
  ],
}
