'use client'

import { useState, useRef, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { SERIES, CATEGORIES } from '@/lib/products'
import { TWD_PER_MYR } from '@/lib/admin-products'

export interface ProductFormData {
  series: string
  category: string
  name_zh: string
  name_en: string
  meta_zh: string
  meta_en: string
  description_zh: string
  description_en: string
  price_twd: number | ''
  stock_status: string
  is_new: boolean
  is_active: boolean
  sort_order: number | ''
  images: string[]
}

const MAX_IMAGES = 8

const EMPTY: ProductFormData = {
  series: 'living-scenery',
  category: 'earrings',
  name_zh: '',
  name_en: '',
  meta_zh: '',
  meta_en: '',
  description_zh: '',
  description_en: '',
  price_twd: '',
  stock_status: 'in-stock',
  is_new: true,
  is_active: true,
  sort_order: 0,
  images: [],
}

export function ProductForm({
  initial,
  productId,
}: {
  initial?: Partial<ProductFormData>
  productId?: string
}) {
  const router = useRouter()
  const [form, setForm] = useState<ProductFormData>({ ...EMPTY, ...initial })
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const set = <K extends keyof ProductFormData>(k: K, v: ProductFormData[K]) =>
    setForm(f => ({ ...f, [k]: v }))

  const myrPreview =
    form.price_twd !== '' && Number(form.price_twd) > 0
      ? Math.max(1, Math.round(Number(form.price_twd) / TWD_PER_MYR))
      : null

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setError(null)
    setUploading(true)
    try {
      for (const file of files) {
        if (form.images.length >= MAX_IMAGES) break
        const fd = new FormData()
        fd.append('file', file)
        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || '上傳失敗，再試一次')
        setForm(f => ({ ...f, images: [...f.images, data.url].slice(0, MAX_IMAGES) }))
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : '上傳失敗，再試一次')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const removeImage = (i: number) =>
    setForm(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }))

  const makeCover = (i: number) =>
    setForm(f => {
      const imgs = [...f.images]
      const [picked] = imgs.splice(i, 1)
      return { ...f, images: [picked, ...imgs] }
    })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!form.name_zh) return setError('請填中文名稱')
    if (!form.name_en) return setError('請填英文名稱')
    if (form.price_twd === '' || Number(form.price_twd) <= 0) return setError('請填台幣售價')
    setSaving(true)
    try {
      const { images, ...rest } = form
      const payload = {
        ...rest,
        price_twd: Number(form.price_twd),
        sort_order: Number(form.sort_order) || 0,
        image_urls: images,
      }
      const res = await fetch(
        productId ? `/api/admin/products/${productId}` : '/api/admin/products',
        {
          method: productId ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '儲存失敗，再試一次')
      router.push('/admin/products')
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : '儲存失敗，再試一次')
      setSaving(false)
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      {/* ── 照片：手機上最大最好按，可多張 ── */}
      <div className="admin-form-section">
        <h3>① 商品照片（可多張，第一張是封面）</h3>
        {form.images.length > 0 && (
          <div className="admin-img-grid">
            {form.images.map((url, i) => (
              <div key={url} className="admin-img-cell">
                <img src={url} alt="" />
                {i === 0 && <span className="admin-cover-tag">封面</span>}
                <button
                  type="button"
                  className="admin-img-x"
                  onClick={() => removeImage(i)}
                  aria-label="移除這張"
                >
                  ×
                </button>
                {i > 0 && (
                  <button type="button" className="admin-img-cover" onClick={() => makeCover(i)}>
                    設為封面
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        {form.images.length < MAX_IMAGES && (
          <label htmlFor="admin-file" className={`admin-upload-btn ${uploading ? 'busy' : ''} ${form.images.length > 0 ? 'admin-upload-swap' : ''}`}>
            {uploading
              ? '上傳中，等我一下…'
              : form.images.length > 0
                ? '＋ 再加一張'
                : '📷 拍照或從相簿選'}
          </label>
        )}
        <input
          ref={fileRef}
          id="admin-file"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          onChange={onFile}
          disabled={uploading}
          hidden
        />
        <p className="admin-hint">手機直拍即可，一次可選多張（每張 5MB 以內，最多 {MAX_IMAGES} 張）</p>
      </div>

      {/* ── 名稱與定價：最少必填 ── */}
      <div className="admin-form-section">
        <h3>② 名稱與價格</h3>
        <label>
          中文名稱 *
          <input
            value={form.name_zh}
            onChange={e => set('name_zh', e.target.value)}
            placeholder="例：灰綠"
          />
        </label>
        <label>
          英文名稱 *
          <input
            value={form.name_en}
            onChange={e => set('name_en', e.target.value)}
            placeholder="例：Sage"
          />
        </label>
        <label>
          台幣售價 NT$ *
          <input
            type="number"
            inputMode="numeric"
            min="1"
            step="1"
            value={form.price_twd}
            onChange={e => set('price_twd', e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="例：1280"
          />
        </label>
        <p className="admin-myr-preview">
          {myrPreview
            ? `馬來西亞客人會看到：RM ${myrPreview}（台幣 ÷ ${TWD_PER_MYR} 自動換算）`
            : `馬幣售價自動換算（台幣 ÷ ${TWD_PER_MYR}），不用填`}
        </p>
      </div>

      {/* ── 分類 ── */}
      <div className="admin-form-section">
        <h3>③ 系列與分類</h3>
        <label>
          系列 *
          <select value={form.series} onChange={e => set('series', e.target.value)}>
            {SERIES.map(s => (
              <option key={s.id} value={s.id}>{s.name.zh}</option>
            ))}
          </select>
        </label>
        <label>
          分類 *
          <select value={form.category} onChange={e => set('category', e.target.value)}>
            {CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>{c.name.zh}</option>
            ))}
          </select>
        </label>
        <label>
          庫存狀態
          <select value={form.stock_status} onChange={e => set('stock_status', e.target.value)}>
            <option value="in-stock">現貨（可直接買）</option>
            <option value="made-to-order">客製訂製（下單後製作）</option>
            <option value="sold-out">售罄（顯示但不能買）</option>
          </select>
        </label>
        <div className="admin-checks">
          <label className="admin-check">
            <input type="checkbox" checked={form.is_new} onChange={e => set('is_new', e.target.checked)} />
            標示「新品」
          </label>
          <label className="admin-check">
            <input type="checkbox" checked={form.is_active} onChange={e => set('is_active', e.target.checked)} />
            上架販售
          </label>
        </div>
      </div>

      {/* ── 選填區收進摺疊 ── */}
      <details className="admin-form-section admin-details">
        <summary>④ 描述與進階（選填，可跳過）</summary>
        <label>
          中文短描述（商品卡上的一行字）
          <input value={form.meta_zh} onChange={e => set('meta_zh', e.target.value)} placeholder="例：手工編織．太陽石" />
        </label>
        <label>
          英文短描述
          <input value={form.meta_en} onChange={e => set('meta_en', e.target.value)} placeholder="例：Handwoven · Sunstone" />
        </label>
        <label>
          中文詳細介紹
          <textarea rows={3} value={form.description_zh} onChange={e => set('description_zh', e.target.value)} />
        </label>
        <label>
          英文詳細介紹
          <textarea rows={3} value={form.description_en} onChange={e => set('description_en', e.target.value)} />
        </label>
        <label>
          排序（數字小的排前面）
          <input
            type="number"
            inputMode="numeric"
            step="1"
            value={form.sort_order}
            onChange={e => set('sort_order', e.target.value === '' ? '' : Number(e.target.value))}
          />
        </label>
      </details>

      {error && <div className="form-error">{error}</div>}

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn admin-save" disabled={saving || uploading}>
          {saving ? '儲存中…' : productId ? '✓ 儲存修改' : '✓ 上架這件商品'}
        </button>
        <button type="button" className="admin-btn-light" onClick={() => router.push('/admin/products')}>
          取消
        </button>
      </div>
    </form>
  )
}
