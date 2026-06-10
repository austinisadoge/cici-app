import { NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const { orderNumber } = await params
    const body = await req.json()
    const { last5, screenshot_url, notes } = body

    if (!last5 && !screenshot_url) {
      return NextResponse.json({ error: 'Provide last 5 digits or screenshot' }, { status: 400 })
    }

    const sb = getServiceClient()
    const { error } = await sb
      .from('orders')
      .update({
        payment_status: 'reported',
        payment_last5: last5 || null,
        payment_screenshot_url: screenshot_url || null,
        payment_reported_at: new Date().toISOString(),
        customer_notes: notes || null,
      })
      .eq('order_number', orderNumber)

    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Server error'
    console.error('[report-payment] error:', e)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
