'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface ProductRow {
  id: string
  slug: string
  series: string
  category: string
  name_zh: string
  name_en: string
  price_twd: number
  price_myr: number
  stock_status: string
  is_active: boolean
  is_new: boolean
}

const SERIES_ZH: Record<string, string> = {
  'living-scenery': '生活風景',
  'stone-stories': '礦石物語',
  'daily-glimmers': '日常拾光',
  'little-blessings': '祝福小物',
  'living-force': '生物力量',
}

export default function AdminProducts() {
  const [items, setItems] = useState<ProductRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/products')
      .then(r => r.json())
      .then(d => {
        if (d.error) setError(d.error)
        else setItems(d.products || [])
        setLoading(false)
      })
      .catch(e => { setError(String(e)); setLoading(false) })
  }, [])

  return (
    <main className="admin-page">
      <div className="admin-nav">
        <h1 className="serif">CiCi Admin</h1>
        <nav>
          <Link href="/admin/orders">Orders</Link>
          <Link href="/admin/products" className="active">Products</Link>
        </nav>
      </div>

      <div className="admin-section-head">
        <h2>Products ({items.length})</h2>
        <a
          href="https://supabase.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-btn-light"
        >
          Manage in Supabase →
        </a>
      </div>

      <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 24 }}>
        商品上架／改價／改描述：可以在 Supabase Dashboard 直接編輯 products 表，或之後做個編輯介面。
      </p>

      {loading && <p>Loading...</p>}
      {error && <div className="form-error">{error}</div>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Slug</th>
              <th>Series</th>
              <th>Category</th>
              <th>Name (zh / en)</th>
              <th>NT$</th>
              <th>RM</th>
              <th>Stock</th>
              <th>New</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {items.map(p => (
              <tr key={p.id}>
                <td className="mono">{p.slug}</td>
                <td>{SERIES_ZH[p.series] || p.series || '—'}</td>
                <td>{p.category}</td>
                <td>{p.name_zh} / {p.name_en}</td>
                <td>{p.price_twd.toLocaleString()}</td>
                <td>{p.price_myr.toLocaleString()}</td>
                <td>{p.stock_status}</td>
                <td>{p.is_new ? '✓' : '—'}</td>
                <td>{p.is_active ? '✓' : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
