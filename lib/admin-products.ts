import type { SupabaseClient } from '@supabase/supabase-js'

// 只允許這些欄位進資料庫，防止亂塞
export const PRODUCT_FIELDS = [
  'slug', 'series', 'category',
  'name_zh', 'name_en',
  'meta_zh', 'meta_en',
  'description_zh', 'description_en',
  'price_twd', 'price_myr',
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
  for (const f of ['slug', 'series', 'category', 'name_zh', 'name_en'] as const) {
    if (!p[f] || typeof p[f] !== 'string') return `${f} is required`
  }
  if (typeof p.price_twd !== 'number' || p.price_twd < 0) return 'price_twd must be a number'
  if (typeof p.price_myr !== 'number' || p.price_myr < 0) return 'price_myr must be a number'
  return null
}

// MVP：每個商品一張主圖，整批換掉
export async function setPrimaryImage(
  sb: SupabaseClient,
  productId: string,
  imageUrl: string | null
) {
  await sb.from('product_images').delete().eq('product_id', productId)
  if (imageUrl) {
    await sb.from('product_images').insert({
      product_id: productId,
      url: imageUrl,
      sort_order: 0,
    })
  }
}
