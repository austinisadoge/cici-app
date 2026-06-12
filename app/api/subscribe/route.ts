import { NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const language = body.language === 'en' ? 'en' : 'zh'

    if (!email || !email.includes('@') || email.length > 120) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const sb = getServiceClient()
    const { error } = await sb
      .from('newsletter_subscribers')
      .insert({ email, language })

    if (error) {
      // 23505 = 已訂閱過，視為成功（冪等）
      if (error.code === '23505') return NextResponse.json({ ok: true })
      console.error('[subscribe] insert failed:', error)
      return NextResponse.json({ error: 'Subscribe failed' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[subscribe] error:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
