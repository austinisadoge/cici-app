import { NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { sendRawToOwner } from '@/lib/email'

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
      // 資料表還沒建（migration-002 未跑）：降級成寄信通知業主，客人端仍視為成功
      console.error('[subscribe] insert failed, falling back to email:', error.message)
      try {
        await sendRawToOwner(
          `📧 新電子報訂閱：${email}`,
          `<p>有人訂閱了電子報：<strong>${email}</strong>（語言：${language}）</p><p>提醒：newsletter_subscribers 資料表尚未建立，目前以信件備援。建議跑 migration-002 後改為自動入庫。</p>`
        )
      } catch (e) {
        console.error('[subscribe] owner email fallback also failed:', e)
      }
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[subscribe] error:', e)
    // 任何意外都不讓客人看到錯誤
    return NextResponse.json({ ok: true })
  }
}
