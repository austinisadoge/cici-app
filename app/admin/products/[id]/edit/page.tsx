'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { ProductForm, type ProductFormData } from '@/components/admin/ProductForm'

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [initial, setInitial] = useState<Partial<ProductFormData> | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/admin/products/${id}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) return setError(d.error)
        const p = d.product
        const imgs = (p.product_images ?? []).sort(
          (a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order
        )
        setInitial({
          series: p.series,
          category: p.category,
          name_zh: p.name_zh ?? '',
          name_en: p.name_en ?? '',
          meta_zh: p.meta_zh ?? '',
          meta_en: p.meta_en ?? '',
          description_zh: p.description_zh ?? '',
          description_en: p.description_en ?? '',
          price_twd: p.price_twd,
          stock_status: p.stock_status,
          is_new: p.is_new,
          is_active: p.is_active,
          sort_order: p.sort_order ?? 0,
          image_url: imgs[0]?.url ?? '',
        })
      })
      .catch(e => setError(String(e)))
  }, [id])

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
        <h2>編輯商品</h2>
        <Link href="/admin/products" className="admin-btn-light">← 回商品列表</Link>
      </div>
      {error && <div className="form-error">{error}</div>}
      {!initial && !error && <p>Loading...</p>}
      {initial && <ProductForm initial={initial} productId={id} />}
    </main>
  )
}
