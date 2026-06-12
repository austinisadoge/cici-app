import type { SupabaseClient } from '@supabase/supabase-js'

// 業主只填台幣，馬幣一律 ÷8 自動換算（業主指定）
export const TWD_PER_MYR = 8
export function computeMyr(twd: number): number {
  return Math.max(1, Math.round(twd / TWD_PER_MYR))
}

// 只允許這些欄位進資料庫（slug 與 price_myr 由伺服器決定，不收前端的）
export const PRODUCT_FIELDS = [
  'series', 'category',
  'name_zh', 'name_en',
  'meta_zh', 'meta_en',
  'description_zh', 'description_en',
  'price_twd',
  'stock_status', 'is_new', 'is_active', 'sort_order',
] as const

export function pickProductFields(body: Record<string, unknown>) {
  const out: Record<string, unknown> = {}
  for (const f of PRODUCT_FIELDS) {
    if (body[f] !== undefined) out[f] = body[f]
  }
  return out
}

export function validateNewProduct(p: Record<string, unknown>): string | null {
  for (const f of ['series', 'category', 'name_zh', 'name_en'] as const) {
    if (!p[f] || typeof p[f] !== 'string') return `${f} is required`
  }
  if (typeof p.price_twd !== 'number' || p.price_twd <= 0) return 'price_twd must be a positive number'
  return null
}

// slug 自動生成：英文名 → 小寫連字號；slugify 不出東西就用時間戳
export function generateSlug(nameEn: string): string {
  const s = nameEn
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
  return s || `p-${Date.now().toString(36)}`
}

export function slugWithSuffix(slug: string): string {
  return `${slug}-${Math.random().toString(36).slice(2, 6)}`
}

// 多圖：整批換掉，順序照陣列（第一張＝封面），上限 8 張
export const MAX_IMAGES = 8

export function normalizeImageUrls(body: Record<string, unknown>): string[] | null {
  if (Array.isArray(body.image_urls)) {
    return (body.image_urls as unknown[])
      .filter((u): u is string => typeof u === 'string' && u.length > 0)
      .slice(0, MAX_IMAGES)
  }
  // 舊欄位相容：image_url 字串＝單圖、空字串＝清空
  if (typeof body.image_url === 'string') {
    return body.image_url ? [body.image_url] : []
  }
  return null // 沒帶 = 不動圖
}

export async function setProductImages(
  sb: SupabaseClient,
  productId: string,
  urls: string[]
) {
  await sb.from('product_images').delete().eq('product_id', productId)
  if (urls.length) {
    await sb.from('product_images').insert(
      urls.map((url, i) => ({ product_id: productId, url, sort_order: i }))
    )
  }
}
