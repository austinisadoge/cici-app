import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { isAdminAuth } from '@/lib/admin-auth'
import { getServiceClient } from '@/lib/supabase'
import {
  pickProductFields,
  validateNewProduct,
  setPrimaryImage,
  generateSlug,
  slugWithSuffix,
  computeMyr,
} from '@/lib/admin-products'

export async function GET(req: NextRequest) {
  if (!isAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const sb = getServiceClient()
    const { data, error } = await sb
      .from('products')
      .select('*, product_images(url, sort_order)')
      .order('sort_order', { ascending: true })
    if (error) throw error
    return NextResponse.json({ products: data })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Server error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!isAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const fields = pickProductFields(body)
    const invalid = validateNewProduct(fields)
    if (invalid) {
      return NextResponse.json({ error: invalid }, { status: 400 })
    }

    // 伺服器決定 slug 與馬幣價
    fields.price_myr = computeMyr(fields.price_twd as number)
    fields.slug = generateSlug(fields.name_en as string)

    const sb = getServiceClient()

    let product = null
    for (let attempt = 0; attempt < 2; attempt++) {
      const { data, error } = await sb.from('products').insert(fields).select().single()
      if (!error) { product = data; break }
      if (error.code === '23505' && attempt === 0) {
        // slug 撞名，加亂數尾巴重試一次
        fields.slug = slugWithSuffix(generateSlug(fields.name_en as string))
        continue
      }
      throw error
    }
    if (!product) throw new Error('Insert failed')

    if (typeof body.image_url === 'string' && body.image_url) {
      await setPrimaryImage(sb, product.id, body.image_url)
    }

    return NextResponse.json({ product })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Server error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
