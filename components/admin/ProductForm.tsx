'use client'

import { useState, useRef, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { SERIES, CATEGORIES } from '@/lib/products'

export interface ProductFormData {
  slug: string
  series: string
  category: string
  name_zh: string
  name_en: string
  meta_zh: string
  meta_en: string
  description_zh: string
  description_en: string
  price_twd: number | ''
  price_myr: number | ''
  stock_status: string
  is_new: boolean
  is_active: boolean
  sort_order: number | ''
  image_url: string
}

const EMPTY: ProductFormData = {
  slug: '',
  series: 'living-scenery',
  category: 'earrings',
  name_zh: '',
  name_en: '',
  meta_zh: '',
  meta_en: '',
  description_zh: '',
  description_en: '',
  price_twd: '',
  price_myr: '',
  stock_status: 'in-stock',
  is_new: false,
  is_active: true,
  sort_order: 0,
  image_url: '',
}

// 約略匯率，業主可手動覆寫
const TWD_PER_MYR = 7.3

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
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
  const [slugTouched, setSlugTouched] = useState(!!initial?.slug)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const set = <K extends keyof ProductFormData>(k: K, v: ProductFormData[K]) =>
    setForm(f => ({ ...f, [k]: v }))

  const onNameEn = (v: string) => {
    setForm(f => ({
      ...f,
      name_en: v,
      slug: slugTouched ? f.slug : slugify(v),
    }))
  }

  const onTwdBlur = () => {
    if (form.price_twd !== '' && form.price_myr === '') {
      set('price_myr', Math.round(Number(form.price_twd) / TWD_PER_MYR))
    }
  }

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      set('image_url', data.url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!form.name_zh || !form.name_en) return setError('中英文名稱都要填')
    if (!form.slug) return setError('Slug 不能空白')
    if (form.price_twd === '' || form.price_myr === '') return setError('兩種幣別的價格都要填')
    setSaving(true)
    try {
      const payload = {
        ...form,
        price_twd: Number(form.price_twd),
        price_myr: Number(form.price_myr),
        sort_order: Number(form.sort_order) || 0,
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
      if (!res.ok) throw new Error(data.error || 'Save failed')
      router.push('/admin/products')
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed')
      setSaving(false)
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      {error && <div className="form-error">{error}</div>}

      <div className="admin-form-section">
        <h3>商品照片</h3>
        <div className="admin-img-row">
          {form.image_url ? (
            <img src={form.image_url} alt="" className="admin-img-preview" />
          ) : (
            <div className="admin-img-empty">尚無照片</div>
          )}
          <div className="admin-img-actions">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={onFile}
              disabled={uploading}
            />
            {uploading && <span className="admin-hint">上傳中…</span>}
            {form.image_url && (
              <button type="button" className="admin-btn-light" onClick={() => set('image_url', '')}>
                移除照片
              </button>
            )}
            <span className="admin-hint">JPG / PNG / WebP，5MB 以內</span>
          </div>
        </div>
      </div>

      <div className="admin-form-section">
        <h3>基本資料</h3>
        <div className="admin-grid2">
          <label>
            中文名稱 *
            <input value={form.name_zh} onChange={e => set('name_zh', e.target.value)} placeholder="例：灰綠" />
          </label>
          <label>
            英文名稱 *
            <input value={form.name_en} onChange={e => onNameEn(e.target.value)} placeholder="e.g. Sage" />
          </label>
        </div>
        <div className="admin-grid2">
          <label>
            系列 *
            <select value={form.series} onChange={e => set('series', e.target.value)}>
              {SERIES.map(s => (
                <option key={s.id} value={s.id}>{s.name.zh}（{s.name.en}）</option>
              ))}
            </select>
          </label>
          <label>
            分類 *
            <select value={form.category} onChange={e => set('category', e.target.value)}>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name.zh}（{c.name.en}）</option>
              ))}
            </select>
          </label>
        </div>
        <div className="admin-grid2">
          <label>
            中文短描述（卡片上那行）
            <input value={form.meta_zh} onChange={e => set('meta_zh', e.target.value)} placeholder="例：手工編織．太陽石" />
          </label>
          <label>
            英文短描述
            <input value={form.meta_en} onChange={e => set('meta_en', e.target.value)} placeholder="e.g. Handwoven · Sunstone" />
          </label>
        </div>
        <label>
          網址代號 slug *（自動產生，可改，限小寫英數和連字號）
          <input
            value={form.slug}
            onChange={e => {
              setSlugTouched(true)
              set('slug', slugify(e.target.value))
            }}
          />
        </label>
      </div>

      <div className="admin-form-section">
        <h3>價格與庫存</h3>
        <div className="admin-grid2">
          <label>
            台幣價格 NT$ *
            <input
              type="number" min="0" step="1"
              value={form.price_twd}
              onChange={e => set('price_twd', e.target.value === '' ? '' : Number(e.target.value))}
              onBlur={onTwdBlur}
            />
          </label>
          <label>
            馬幣價格 RM *（台幣填完自動換算，可改）
            <input
              type="number" min="0" step="1"
              value={form.price_myr}
              onChange={e => set('price_myr', e.target.value === '' ? '' : Number(e.target.value))}
            />
          </label>
        </div>
        <div className="admin-grid2">
          <label>
            庫存狀態
            <select value={form.stock_status} onChange={e => set('stock_status', e.target.value)}>
              <option value="in-stock">現貨</option>
              <option value="made-to-order">客製訂製</option>
              <option value="sold-out">售罄</option>
            </select>
          </label>
          <label>
            排序（數字小的排前面）
            <input
              type="number" step="1"
              value={form.sort_order}
              onChange={e => set('sort_order', e.target.value === '' ? '' : Number(e.target.value))}
            />
          </label>
        </div>
        <div className="admin-checks">
          <label className="admin-check">
            <input type="checkbox" checked={form.is_new} onChange={e => set('is_new', e.target.checked)} />
            標示「新品」
          </label>
          <label className="admin-check">
            <input type="checkbox" checked={form.is_active} onChange={e => set('is_active', e.target.checked)} />
            上架（取消勾選＝下架，店面看不到）
          </label>
        </div>
      </div>

      <div className="admin-form-section">
        <h3>詳細描述（選填）</h3>
        <label>
          中文
          <textarea rows={3} value={form.description_zh} onChange={e => set('description_zh', e.target.value)} />
        </label>
        <label>
          英文
          <textarea rows={3} value={form.description_en} onChange={e => set('description_en', e.target.value)} />
        </label>
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn" disabled={saving || uploading}>
          {saving ? '儲存中…' : productId ? '儲存修改' : '新增商品'}
        </button>
        <button type="button" className="admin-btn-light" onClick={() => router.push('/admin/products')}>
          取消
        </button>
      </div>
    </form>
  )
}
