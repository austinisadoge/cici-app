'use client'

import Link from 'next/link'
import { ProductForm } from '@/components/admin/ProductForm'

export default function NewProductPage() {
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
        <h2>新增商品</h2>
        <Link href="/admin/products" className="admin-btn-light">← 回商品列表</Link>
      </div>
      <ProductForm />
    </main>
  )
}
