import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import {
  loginAdmin,
  isRateLimited,
  recordLoginFailure,
  clearLoginFailures,
} from '@/lib/admin-auth'

function clientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req)

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again in 15 minutes.' },
      { status: 429 }
    )
  }

  const { password } = await req.json()
  const res = loginAdmin(password)

  if (res.status === 401) {
    recordLoginFailure(ip)
    // 失敗多等半秒，拖慢自動化嘗試
    await new Promise(r => setTimeout(r, 500))
  } else if (res.status === 200) {
    clearLoginFailures(ip)
  }

  return res
}
