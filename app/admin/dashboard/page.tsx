'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Stats {
  totalOrders: number
  pendingPayment: number
  toShip: number
  todayCount: number
  monthCount: number
  monthRevTWD: number
  monthRevMYR: number
  top: { name: string; quantity: number }[]
}

export default function AdminDashboard() {
  const [s, setS] = useState<Stats | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(d => (d.error ? setError(d.error) : setS(d)))
      .catch(e => setError(String(e)))
  }, [])

  return (
    <main className="admin-page">
      <div className="admin-nav">
        <h1 className="serif">CiCi Admin</h1>
        <nav>
          <Link href="/admin/dashboard" className="active">總覽</Link>
          <Link href="/admin/orders">訂單</Link>
          <Link href="/admin/products">商品</Link>
        </nav>
      </div>

      {error && <div className="form-error">{error}</div>}
      {!s && !error && <p>Loading...</p>}

      {s && (
        <>
          {/* 待辦：最需要岳母處理的 */}
          <div className="dash-grid">
            <Link href="/admin/orders" className="dash-card dash-todo">
              <div className="dash-num">{s.pendingPayment}</div>
              <div className="dash-label">待收款</div>
              <div className="dash-hint">客人回報付款，等你確認</div>
            </Link>
            <Link href="/admin/orders" className="dash-card dash-todo">
              <div className="dash-num">{s.toShip}</div>
              <div className="dash-label">待出貨</div>
              <div className="dash-hint">已收款，準備寄出</div>
            </Link>
          </div>

          {/* 數字概況 */}
          <h2 className="dash-section-title">本月概況</h2>
          <div className="dash-grid">
            <div className="dash-card">
              <div className="dash-num">{s.todayCount}</div>
              <div className="dash-label">今日訂單</div>
            </div>
            <div className="dash-card">
              <div className="dash-num">{s.monthCount}</div>
              <div className="dash-label">本月訂單</div>
            </div>
            <div className="dash-card">
              <div className="dash-num serif">NT$ {s.monthRevTWD.toLocaleString()}</div>
              <div className="dash-label">本月台灣營收（已收款）</div>
            </div>
            <div className="dash-card">
              <div className="dash-num serif">RM {s.monthRevMYR.toLocaleString()}</div>
              <div className="dash-label">本月馬國營收（已收款）</div>
            </div>
          </div>

          {/* 熱賣商品 */}
          <h2 className="dash-section-title">熱賣商品 Top 5</h2>
          <div className="dash-top">
            {s.top.length === 0 && <p className="admin-hint">還沒有銷售紀錄。</p>}
            {s.top.map((t, i) => (
              <div key={t.name} className="dash-top-row">
                <span className="dash-top-rank">{i + 1}</span>
                <span className="dash-top-name">{t.name}</span>
                <span className="dash-top-qty">{t.quantity} 件</span>
              </div>
            ))}
          </div>

          <p className="admin-hint" style={{ marginTop: 28 }}>
            營收只計入「已收款」的訂單。待收款的還沒算進去。
          </p>
        </>
      )}
    </main>
  )
}
