import { createClient } from '@supabase/supabase-js'
import {
  products as staticFallback,
  type Product,
  type SeriesId,
  type CategoryId,
} from './products'

type DbRow = {
  slug: string
  series: string
  category: string
  name_zh: string
  name_en: string
  meta_zh: string | null
  meta_en: string | null
  price_twd: number
  price_myr: number
  stock_status: string
  is_new: boolean
  product_images: { url: string; sort_order: number }[] | null
}

const staticBySlug = new Map(staticFallback.map(p => [p.slug, p]))

function mapRow(r: DbRow): Product {
  const imgs = (r.product_images ?? []).slice().sort((a, b) => a.sort_order - b.sort_order)
  return {
    id: r.slug,
    slug: r.slug,
    series: r.series as SeriesId,
    category: r.category as CategoryId,
    name: { zh: r.name_zh, en: r.name_en },
    meta: { zh: r.meta_zh ?? '', en: r.meta_en ?? '' },
    price: { twd: r.price_twd, myr: r.price_myr },
    stock: (r.stock_status as Product['stock']) ?? 'in-stock',
    isNew: r.is_new,
    image: imgs[0]?.url ?? staticBySlug.get(r.slug)?.image ?? '/images/hero-model-1.jpg',
  }
}

export type ProductDetail = Product & {
  description: { zh: string; en: string }
  images: string[]
}

/** 單一商品＋全部圖片＋詳細描述（詳情頁用） */
export async function fetchProductBySlug(slug: string): Promise<ProductDetail | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if (!url || !key) {
    const p = staticBySlug.get(slug)
    return p ? { ...p, description: { zh: '', en: '' }, images: [p.image] } : null
  }
  try {
    const sb = createClient(url, key)
    const { data, error } = await sb
      .from('products')
      .select(
        'slug, series, category, name_zh, name_en, meta_zh, meta_en, description_zh, description_en, price_twd, price_myr, stock_status, is_new, product_images(url, sort_order)'
      )
      .eq('slug', slug)
      .eq('is_active', true)
      .single()
    if (error || !data) return null
    const row = data as DbRow & { description_zh: string | null; description_en: string | null }
    const base = mapRow(row)
    const imgs = (row.product_images ?? [])
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(i => i.url)
    return {
      ...base,
      description: { zh: row.description_zh ?? '', en: row.description_en ?? '' },
      images: imgs.length ? imgs : [base.image],
    }
  } catch (e) {
    console.error('[catalog] fetchProductBySlug threw:', e)
    return null
  }
}

/**
 * 從 Supabase 抓上架中商品（business source of truth）。
 * 抓不到（env 沒設、網路掛）退回寫死資料，店面不開天窗。
 */
export async function fetchCatalog(): Promise<Product[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if (!url || !key) return staticFallback
  try {
    const sb = createClient(url, key)
    const { data, error } = await sb
      .from('products')
      .select(
        'slug, series, category, name_zh, name_en, meta_zh, meta_en, price_twd, price_myr, stock_status, is_new, sort_order, product_images(url, sort_order)'
      )
      .eq('is_active', true)
      .order('sort_order')
    if (error || !data?.length) {
      if (error) console.error('[catalog] fetch failed:', error.message)
      return staticFallback
    }
    return (data as DbRow[]).map(mapRow)
  } catch (e) {
    console.error('[catalog] fetch threw:', e)
    return staticFallback
  }
}
