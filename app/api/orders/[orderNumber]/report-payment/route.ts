import { NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const { orderNumber } = await params
    const body = await req.json()
    const { email, last5, screenshot_url, notes } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }
    if (!last5 && !screenshot_url) {
      return NextResponse.json({ error: 'Provide last 5 digits or screenshot' }, { status: 400 })
    }

    const sb = getServiceClient()

    // 驗證身分：email 要跟下單時一致，防止猜單號亂改別人的訂單
    const { data: order, error: findError } = await sb
      .from('orders')
      .select('id, customer_email, customer_notes')
      .eq('order_number', orderNumber)
      .single()
    if (findError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    if (order.customer_email.trim().toLowerCase() !== email.trim().toLowerCase()) {
      return NextResponse.json(
        { error: 'Email does not match this order' },
        { status: 403 }
      )
    }

    // 付款備註用附加的，不蓋掉結帳時的備註
    const appendedNotes = notes
      ? [order.customer_notes, `[付款回報] ${String(notes).slice(0, 500)}`]
          .filter(Boolean)
          .join('\n')
      : order.customer_notes

    const { error } = await sb
      .from('orders')
      .update({
        payment_status: 'reported',
        payment_last5: last5 ? String(last5).slice(0, 5) : null,
        payment_screenshot_url: screenshot_url || null,
        payment_reported_at: new Date().toISOString(),
        customer_notes: appendedNotes,
      })
      .eq('id', order.id)

    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Server error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
