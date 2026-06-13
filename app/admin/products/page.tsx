'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { SERIES, CATEGORIES } from '@/lib/products'

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

const STOCK_ZH: Record<string, string> = {
  'in-stock': '現貨',
  'made-to-order': '客製',
  'sold-out': '售罄',
}

const seriesZh = (id: string) => SERIES.find(s => s.id === id)?.name.zh ?? id
const categoryZh = (id: string) => CATEGORIES.find(c => c.id === id)?.name.zh ?? id
const thumbOf = (p: ProductRow) =>
  (p.product_images ?? []).slice().sort((a, b) => a.sort_order - b.sort_order)[0]?.url

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

  const Actions = ({ p }: { p: ProductRow }) => (
    <>
      <Link href={`/admin/products/${p.id}/edit`} className="admin-btn-light">編輯</Link>
      <button type="button" className="admin-btn-light" disabled={busy === p.id} onClick={() => toggleActive(p)}>
        {p.is_active ? '下架' : '上架'}
      </button>
      <button type="button" className="admin-btn-light admin-danger" disabled={busy === p.id} onClick={() => remove(p)}>
        刪除
      </button>
    </>
  )

  return (
    <main className="admin-page">
      <div className="admin-nav">
        <h1 className="serif">CiCi Admin</h1>
        <nav>
          <Link href="/admin/dashboard">總覽</Link>
          <Link href="/admin/orders">訂單</Link>
          <Link href="/admin/products" className="active">商品</Link>
        </nav>
      </div>

      <div className="admin-section-head">
        <h2>商品（{items.length}）</h2>
        <Link href="/admin/products/new" className="admin-btn">＋ 上架新商品</Link>
      </div>

      {loading && <p>Loading...</p>}
      {error && <div className="form-error">{error}</div>}

      {/* 手機卡片版 */}
      <div className="admin-cards">
        {items.map(p => (
          <div key={p.id} className={`admin-card ${p.is_active ? '' : 'row-inactive'}`}>
            {thumbOf(p)
              ? <img src={thumbOf(p)} alt="" className="admin-card-img" />
              : <div className="admin-card-img admin-thumb-empty">無圖</div>}
            <div className="admin-card-body">
              <div className="admin-card-name">
                {p.name_zh} <span>{p.name_en}</span>
              </div>
              <div className="admin-card-meta">
                {seriesZh(p.series)}．{categoryZh(p.category)}
              </div>
              <div className="admin-card-price">
                NT$ {p.price_twd.toLocaleString()}
                <span className="admin-sub-inline">RM {p.price_myr}</span>
              </div>
              <div className="admin-card-status">
                {p.is_active ? '✅ 上架中' : '⏸ 已下架'}．{STOCK_ZH[p.stock_status] || p.stock_status}
                {p.is_new ? '．新品' : ''}
              </div>
              <div className="admin-card-actions">
                <Actions p={p} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 桌機表格版 */}
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
            {items.map(p => (
              <tr key={p.id} className={p.is_active ? '' : 'row-inactive'}>
                <td>
                  {thumbOf(p)
                    ? <img src={thumbOf(p)} alt="" className="admin-thumb" />
                    : <span className="admin-thumb admin-thumb-empty">—</span>}
                </td>
                <td>
                  <b>{p.name_zh}</b>
                  <span className="admin-sub">{p.name_en}</span>
                </td>
                <td>{seriesZh(p.series)}</td>
                <td>{categoryZh(p.category)}</td>
                <td>{p.price_twd.toLocaleString()} / {p.price_myr}</td>
                <td>{STOCK_ZH[p.stock_status] || p.stock_status}{p.is_new ? '．新品' : ''}</td>
                <td>{p.is_active ? '✅ 上架中' : '⏸ 已下架'}</td>
                <td className="admin-row-actions"><Actions p={p} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
