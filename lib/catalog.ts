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

export type Lex = { zh: string; en: string }
export type ProductDetail = Product & {
  description: Lex
  specs: {
    spec: Lex
    color: Lex
    occasion: Lex
    technique: Lex
    size: Lex
    material: Lex
  }
  care: Lex
  images: string[]
}

const lex = (zh: string | null, en: string | null): Lex => ({ zh: zh ?? '', en: en ?? '' })

/** 單一商品＋全部圖片＋詳細描述＋規格（詳情頁用） */
export async function fetchProductBySlug(slug: string): Promise<ProductDetail | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  const emptySpecs = {
    spec: lex('', ''), color: lex('', ''), occasion: lex('', ''),
    technique: lex('', ''), size: lex('', ''), material: lex('', ''),
  }
  if (!url || !key) {
    const p = staticBySlug.get(slug)
    return p ? { ...p, description: lex('', ''), specs: emptySpecs, care: lex('', ''), images: [p.image] } : null
  }
  try {
    const sb = createClient(url, key)
    const richCols =
      'slug, series, category, name_zh, name_en, meta_zh, meta_en, description_zh, description_en, price_twd, price_myr, stock_status, is_new, spec_zh, spec_en, color_zh, color_en, occasion_zh, occasion_en, technique_zh, technique_en, size_zh, size_en, material_zh, material_en, care_zh, care_en, product_images(url, sort_order)'
    const basicCols =
      'slug, series, category, name_zh, name_en, meta_zh, meta_en, description_zh, description_en, price_twd, price_myr, stock_status, is_new, product_images(url, sort_order)'
    const first = await sb
      .from('products').select(richCols).eq('slug', slug).eq('is_active', true).single()
    // 細節欄位尚未建立（migration 還沒跑）時退回基本欄位，避免詳情頁壞掉
    const result = first.error
      ? await sb.from('products').select(basicCols).eq('slug', slug).eq('is_active', true).single()
      : first
    const data: Record<string, unknown> | null = result.data
    if (result.error || !data) return null
    const row = data as unknown as Record<string, string | null> & { product_images: { url: string; sort_order: number }[] | null }
    const base = mapRow(data as unknown as DbRow)
    const imgs = (row.product_images ?? [])
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(i => i.url)
    return {
      ...base,
      description: lex(row.description_zh, row.description_en),
      specs: {
        spec: lex(row.spec_zh, row.spec_en),
        color: lex(row.color_zh, row.color_en),
        occasion: lex(row.occasion_zh, row.occasion_en),
        technique: lex(row.technique_zh, row.technique_en),
        size: lex(row.size_zh, row.size_en),
        material: lex(row.material_zh, row.material_en),
      },
      care: lex(row.care_zh, row.care_en),
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
