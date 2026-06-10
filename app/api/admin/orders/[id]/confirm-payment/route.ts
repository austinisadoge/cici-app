import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { isAdminAuth } from '@/lib/admin-auth'
import { getServiceClient } from '@/lib/supabase'
import { sendPaymentConfirmed } from '@/lib/email'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await params
    const sb = getServiceClient()
    const { data: order, error } = await sb
      .from('orders')
      .update({
        payment_status: 'confirmed',
        payment_confirmed_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()
    if (error) throw error

    const { data: items } = await sb.from('order_items').select('*').eq('order_id', id)

    await sendPaymentConfirmed({
      to: order.customer_email,
      customerName: order.customer_name,
      orderNumber: order.order_number,
      language: order.language || 'en',
      currency: order.currency,
      items: (items || []).map((i: { product_name_snapshot: string; quantity: number; unit_price: number }) => ({
        name: i.product_name_snapshot,
        quantity: i.quantity,
        unitPrice: i.unit_price,
      })),
      subtotal: order.subtotal,
      shippingFee: order.shipping_fee,
      total: order.total,
      paymentMethod: order.payment_method,
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Server error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
