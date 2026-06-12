'use client'

import { useEffect, useState, useCallback } from 'react'
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
  product_images?: { url: string; sort_order: number }[]
}

const SERIES_ZH: Record<string, string> = {
  'living-scenery': '生活風景',
  'stone-stories': '礦石物語',
  'daily-glimmers': '日常拾光',
  'little-blessings': '祝福小物',
  'living-force': '生物力量',
}

const STOCK_ZH: Record<string, string> = {
  'in-stock': '現貨',
  'made-to-order': '客製',
  'sold-out': '售罄',
}

export default function AdminProducts() {
  const [items, setItems] = useState<ProductRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState<string | null>(null)

  const load = useCallback(() => {
    setLoading(true)
    fetch('/api/admin/products')
      .then(r => r.json())
      .then(d => {
        if (d.error) setError(d.error)
        else setItems(d.products || [])
        setLoading(false)
      })
      .catch(e => { setError(String(e)); setLoading(false) })
  }, [])

  useEffect(load, [load])

  const toggleActive = async (p: ProductRow) => {
    setBusy(p.id)
    try {
      const res = await fetch(`/api/admin/products/${p.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !p.is_active }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      setItems(curr => curr.map(x => x.id === p.id ? { ...x, is_active: !p.is_active } : x))
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Failed')
    } finally {
      setBusy(null)
    }
  }

  const remove = async (p: ProductRow) => {
    if (!confirm(`確定要刪除「${p.name_zh}」？\n\n刪除後店面就看不到了（歷史訂單不受影響）。\n如果只是暫時不賣，建議用「下架」就好。`)) return
    setBusy(p.id)
    try {
      const res = await fetch(`/api/admin/products/${p.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error((await res.json()).error)
      setItems(curr => curr.filter(x => x.id !== p.id))
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Failed')
    } finally {
      setBusy(null)
    }
  }

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
        <h2>商品（{items.length}）</h2>
        <Link href="/admin/products/new" className="admin-btn">＋ 新增商品</Link>
      </div>

      {loading && <p>Loading...</p>}
      {error && <div className="form-error">{error}</div>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>圖</th>
              <th>名稱</th>
              <th>系列</th>
              <th>分類</th>
              <th>NT$ / RM</th>
              <th>庫存</th>
              <th>狀態</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {items.map(p => {
              const img = (p.product_images ?? []).slice().sort((a, b) => a.sort_order - b.sort_order)[0]?.url
              return (
                <tr key={p.id} className={p.is_active ? '' : 'row-inactive'}>
                  <td>
                    {img
                      ? <img src={img} alt="" className="admin-thumb" />
                      : <span className="admin-thumb admin-thumb-empty">—</span>}
                  </td>
                  <td>
                    <b>{p.name_zh}</b>
                    <span className="admin-sub">{p.name_en} · {p.slug}</span>
                  </td>
                  <td>{SERIES_ZH[p.series] || p.series || '—'}</td>
                  <td>{p.category}</td>
                  <td>{p.price_twd.toLocaleString()} / {p.price_myr}</td>
                  <td>{STOCK_ZH[p.stock_status] || p.stock_status}{p.is_new ? '．新品' : ''}</td>
                  <td>{p.is_active ? '✅ 上架中' : '⏸ 已下架'}</td>
                  <td className="admin-row-actions">
                    <Link href={`/admin/products/${p.id}/edit`} className="admin-btn-light">編輯</Link>
                    <button
                      type="button"
                      className="admin-btn-light"
                      disabled={busy === p.id}
                      onClick={() => toggleActive(p)}
                    >
                      {p.is_active ? '下架' : '上架'}
                    </button>
                    <button
                      type="button"
                      className="admin-btn-light admin-danger"
                      disabled={busy === p.id}
                      onClick={() => remove(p)}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </main>
  )
}
