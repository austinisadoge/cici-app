import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE = 'cici-admin-session'

export function isAdminAuth(req: NextRequest): boolean {
  const token = req.cookies.get(COOKIE)?.value
  const pwd = process.env.ADMIN_PASSWORD
  return !!token && !!pwd && token === pwd
}

export function loginAdmin(password: string): NextResponse {
  const pwd = process.env.ADMIN_PASSWORD
  if (!pwd) {
    return NextResponse.json({ error: 'ADMIN_PASSWORD not configured' }, { status: 500 })
  }
  if (password !== pwd) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE, password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return res
}

export function logoutAdmin(): NextResponse {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete(COOKIE)
  return res
}
