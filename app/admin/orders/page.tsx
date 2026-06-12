'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'

interface Order {
  id: string
  order_number: string
  customer_name: string
  customer_email: string
  shipping_country: string
  shipping_address: string | null
  payment_method: string
  payment_status: string
  shipping_status: string
  payment_last5: string | null
  total: number
  currency: string
  created_at: string
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/orders')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load')
      setOrders(data.orders || [])
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const confirmPayment = async (id: string) => {
    if (!confirm('確認已收款？')) return
    const res = await fetch(`/api/admin/orders/${id}/confirm-payment`, { method: 'POST' })
    if (res.ok) load()
    else { const d = await res.json(); alert(d.error) }
  }

  const ship = async (id: string) => {
    const tracking = prompt('物流單號')
    if (!tracking) return
    const carrier = prompt('物流商（中華郵政、SF、宅配通…）') || ''
    const res = await fetch(`/api/admin/orders/${id}/ship`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tracking_no: tracking, carrier }),
    })
    if (res.ok) load()
    else { const d = await res.json(); alert(d.error) }
  }

  return (
    <main className="admin-page">
      <div className="admin-nav">
        <h1 className="serif">CiCi Admin</h1>
        <nav>
          <Link href="/admin/orders" className="active">Orders</Link>
          <Link href="/admin/products">Products</Link>
        </nav>
      </div>

      <div className="admin-section-head">
        <h2>Orders ({orders.length})</h2>
        <button onClick={load} className="admin-btn-light">Refresh</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <div className="form-error">{error}</div>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Country</th>
              <th>Payment</th>
              <th>Last5</th>
              <th>Pay Status</th>
              <th>Ship Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td className="mono">{o.order_number}</td>
                <td>
                  <div>{o.customer_name}</div>
                  <small>{o.customer_email}</small>
                </td>
                <td>
                  {o.shipping_country === 'TW' && /門市|超商/.test(o.shipping_address || '') ? (
                    <span className="ship-badge store" title={o.shipping_address || ''}>🏪 超商</span>
                  ) : o.shipping_country === 'MY' ? (
                    <span className="ship-badge my" title={o.shipping_address || ''}>🇲🇾 馬國</span>
                  ) : (
                    <span className="ship-badge" title={o.shipping_address || ''}>🇹🇼 台灣</span>
                  )}
                  {o.shipping_address && (
                    <small className="ship-addr">{o.shipping_address}</small>
                  )}
                </td>
                <td>{o.payment_method === 'tng' ? 'TNG' : 'Bank'}</td>
                <td className="mono">{o.payment_last5 || '—'}</td>
                <td><span className={`status status-${o.payment_status}`}>{o.payment_status}</span></td>
                <td><span className={`status status-${o.shipping_status}`}>{o.shipping_status}</span></td>
                <td>{o.currency === 'MYR' ? 'RM' : 'NT$'} {o.total.toLocaleString()}</td>
                <td>
                  {o.payment_status === 'reported' && (
                    <button onClick={() => confirmPayment(o.id)} className="admin-btn">確認收款</button>
                  )}
                  {o.payment_status === 'confirmed' && o.shipping_status === 'pending' && (
                    <button onClick={() => ship(o.id)} className="admin-btn">標記出貨</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
