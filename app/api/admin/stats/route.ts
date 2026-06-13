import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { isAdminAuth } from '@/lib/admin-auth'
import { getServiceClient } from '@/lib/supabase'

// 以台灣時間（Asia/Taipei）算「今天／本月」
function tpeDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA', { timeZone: 'Asia/Taipei' }) // YYYY-MM-DD
}

export async function GET(req: NextRequest) {
  if (!isAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const sb = getServiceClient()
    const [{ data: orders }, { data: items }] = await Promise.all([
      sb.from('orders').select('total, currency, payment_status, shipping_status, created_at'),
      sb.from('order_items').select('product_name_snapshot, quantity'),
    ])

    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Taipei' })
    const month = today.slice(0, 7)

    let pendingPayment = 0 // 待收款（含 pending / reported）
    let toShip = 0         // 已收款待出貨
    let todayCount = 0
    let monthCount = 0
    const monthRev: Record<string, number> = { TWD: 0, MYR: 0 }

    for (const o of orders ?? []) {
      const d = tpeDate(o.created_at)
      if (o.payment_status === 'pending' || o.payment_status === 'reported') pendingPayment++
      if (o.payment_status === 'confirmed' && o.shipping_status === 'pending') toShip++
      if (d === today) todayCount++
      if (d.slice(0, 7) === month) {
        monthCount++
        if (o.payment_status === 'confirmed') {
          monthRev[o.currency] = (monthRev[o.currency] ?? 0) + (o.total ?? 0)
        }
      }
    }

    // 熱賣商品 Top 5（依累計數量）
    const qty: Record<string, number> = {}
    for (const it of items ?? []) {
      const name = it.product_name_snapshot || '—'
      qty[name] = (qty[name] ?? 0) + (it.quantity ?? 0)
    }
    const top = Object.entries(qty)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, quantity]) => ({ name, quantity }))

    return NextResponse.json({
      totalOrders: orders?.length ?? 0,
      pendingPayment,
      toShip,
      todayCount,
      monthCount,
      monthRevTWD: monthRev.TWD,
      monthRevMYR: monthRev.MYR,
      top,
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Server error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
