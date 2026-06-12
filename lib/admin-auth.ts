import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE = 'cici-admin-session'

// 登入防爆破：同一 IP 15 分鐘內錯 5 次就鎖
// （serverless 記憶體限制：cold start 會歸零，但已大幅拉高暴力破解成本）
const WINDOW_MS = 15 * 60 * 1000
const MAX_FAILS = 5
const failures = new Map<string, { count: number; first: number }>()

export function isRateLimited(ip: string): boolean {
  const rec = failures.get(ip)
  if (!rec) return false
  if (Date.now() - rec.first > WINDOW_MS) {
    failures.delete(ip)
    return false
  }
  return rec.count >= MAX_FAILS
}

export function recordLoginFailure(ip: string) {
  const rec = failures.get(ip)
  if (!rec || Date.now() - rec.first > WINDOW_MS) {
    failures.set(ip, { count: 1, first: Date.now() })
  } else {
    rec.count++
  }
  // 防止 Map 無限長大
  if (failures.size > 5000) failures.clear()
}

export function clearLoginFailures(ip: string) {
  failures.delete(ip)
}

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
