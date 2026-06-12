import { NextResponse } from 'next/server'
import { sendCustomInquiry } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      name, email, country, category, colors,
      stone, budget, details, reference, language, website,
    } = body

    // honeypot：機器人會填這個隱藏欄位，假裝成功直接丟掉
    if (website) return NextResponse.json({ ok: true })

    if (!name || typeof name !== 'string' || name.length > 80) {
      return NextResponse.json({ error: 'Name required' }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || !email.includes('@') || email.length > 120) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }
    if (!details || typeof details !== 'string' || details.length > 3000) {
      return NextResponse.json({ error: 'Details required' }, { status: 400 })
    }

    const clamp = (v: unknown, n: number) =>
      typeof v === 'string' ? v.slice(0, n) : ''

    await sendCustomInquiry({
      name: clamp(name, 80),
      email: clamp(email, 120),
      country: country === 'MY' ? 'MY' : 'TW',
      category: clamp(category, 60),
      colors: clamp(colors, 200),
      stone: clamp(stone, 200),
      budget: clamp(budget, 60),
      details: clamp(details, 3000),
      reference: clamp(reference, 400),
      language: language === 'zh' ? 'zh' : 'en',
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Server error'
    console.error('[custom] error:', e)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
