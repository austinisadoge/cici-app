import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = req.cookies.get('cici-admin-session')?.value
    const pwd = process.env.ADMIN_PASSWORD
    if (!session || !pwd || session !== pwd) {
      const url = new URL('/admin/login', req.url)
      url.searchParams.set('next', pathname)
      return NextResponse.redirect(url)
    }
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
