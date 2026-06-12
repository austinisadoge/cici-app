import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { isAdminAuth } from '@/lib/admin-auth'
import { getServiceClient } from '@/lib/supabase'
import { pickProductFields, validateNewProduct, setPrimaryImage } from '@/lib/admin-products'

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

    const sb = getServiceClient()
    const { data: product, error } = await sb
      .from('products')
      .insert(fields)
      .select()
      .single()
    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: `Slug "${fields.slug}" already exists` }, { status: 409 })
      }
      throw error
    }

    if (typeof body.image_url === 'string' && body.image_url) {
      await setPrimaryImage(sb, product.id, body.image_url)
    }

    return NextResponse.json({ product })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Server error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
