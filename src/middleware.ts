import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './lib/auth/fetch'

const protectedRoutes = new Set(['/cart'])
const registerRoutes = new Set(['/signup', '/login'])

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.has(path)

  const authorized = await verifyToken()

  if (isProtectedRoute && !authorized) {
    const loginUrl = new URL('/login', req.nextUrl)
    loginUrl.searchParams.set('next', req.nextUrl.pathname)

    return NextResponse.redirect(loginUrl)
  }

  const isRegisterRoute = registerRoutes.has(path)

  if (isRegisterRoute && authorized) {
    return NextResponse.redirect('/')
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