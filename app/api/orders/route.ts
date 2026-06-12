import { NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { generateOrderNumber, paymentInstructions } from '@/lib/order'
import { sendOrderConfirmation } from '@/lib/email'
import { calcShipping } from '@/lib/shipping'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      items,
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      shipping_country,
      shipping_zip,
      payment_method,
      customer_notes,
      language,
    } = body

    if (!items?.length) return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    if (!customer_email || !customer_name || !shipping_address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!['TW', 'MY'].includes(shipping_country)) {
      return NextResponse.json({ error: 'Invalid country' }, { status: 400 })
    }
    if (!['tng', 'bank_transfer'].includes(payment_method)) {
      return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 })
    }

    const currency: 'TWD' | 'MYR' = shipping_country === 'MY' ? 'MYR' : 'TWD'
    const cur: 'rm' | 'nt' = currency === 'MYR' ? 'rm' : 'nt'
    const lang: 'zh' | 'en' = language === 'zh' ? 'zh' : 'en'

    // 價格從資料庫查，不信任前端送來的數字
    const sb = getServiceClient()
    const slugs = (items as Array<{ productId: string }>).map(i => i.productId)
    const { data: dbProducts, error: lookupError } = await sb
      .from('products')
      .select('id, slug, name_zh, name_en, price_twd, price_myr')
      .in('slug', slugs)
      .eq('is_active', true)
    if (lookupError) {
      console.error('[orders] product lookup failed:', lookupError)
      return NextResponse.json({ error: 'Product lookup failed' }, { status: 500 })
    }
    const bySlug = new Map((dbProducts ?? []).map(p => [p.slug, p]))

    let subtotal = 0
    const orderItems: Array<{
      product_id: string
      product_name_snapshot: string
      unit_price: number
      quantity: number
    }> = []

    for (const it of items as Array<{ productId: string; quantity: number }>) {
      const p = bySlug.get(it.productId)
      if (!p) continue
      const qty = Math.max(1, Math.min(99, Math.floor(Number(it.quantity)) || 1))
      const unitPrice = currency === 'MYR' ? p.price_myr : p.price_twd
      subtotal += unitPrice * qty
      orderItems.push({
        product_id: p.id,
        product_name_snapshot: lang === 'zh' ? p.name_zh : p.name_en,
        unit_price: unitPrice,
        quantity: qty,
      })
    }

    if (!orderItems.length) {
      return NextResponse.json({ error: 'No valid items' }, { status: 400 })
    }

    const shipping_fee = calcShipping(cur, subtotal)
    const total = subtotal + shipping_fee
    const orderNumber = generateOrderNumber()

    let orderId: string | null = null
    try {
      const { data: order, error } = await sb
        .from('orders')
        .insert({
          order_number: orderNumber,
          customer_name,
          customer_email,
          customer_phone: customer_phone || null,
          shipping_address,
          shipping_country,
          shipping_zip: shipping_zip || null,
          payment_method,
          subtotal,
          shipping_fee,
          total,
          currency,
          language: lang,
          customer_notes: customer_notes || null,
        })
        .select()
        .single()

      if (error) throw error
      orderId = order.id
      // orderItems 的 product_id 已是資料庫 uuid
      const itemsRows = orderItems.map(i => ({ ...i, order_id: orderId }))
      const { error: ie } = await sb.from('order_items').insert(itemsRows)
      if (ie) throw ie
    } catch (e) {
      console.error('[orders] Supabase insert failed:', e)
      // 仍回傳 orderNumber 讓客戶能進付款頁
    }

    try {
      await sendOrderConfirmation({
        to: customer_email,
        customerName: customer_name,
        orderNumber,
        language: lang,
        currency,
        items: orderItems.map(i => ({
          name: i.product_name_snapshot,
          quantity: i.quantity,
          unitPrice: i.unit_price,
        })),
        subtotal,
        shippingFee: shipping_fee,
        total,
        paymentMethod: payment_method,
        paymentInstructions: paymentInstructions(payment_method, lang),
      })
    } catch (e) {
      console.error('[orders] email failed:', e)
    }

    return NextResponse.json({
      ok: true,
      orderNumber,
      orderId,
      total,
      currency,
      paymentMethod: payment_method,
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Server error'
    console.error('[orders] error:', e)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
