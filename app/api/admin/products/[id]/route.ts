import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { isAdminAuth } from '@/lib/admin-auth'
import { getServiceClient } from '@/lib/supabase'
import { pickProductFields, setProductImages, normalizeImageUrls, computeMyr } from '@/lib/admin-products'

type Params = { params: Promise<{ id: string }> }

export async function GET(req: NextRequest, { params }: Params) {
  if (!isAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await params
    const sb = getServiceClient()
    const { data, error } = await sb
      .from('products')
      .select('*, product_images(url, sort_order)')
      .eq('id', id)
      .single()
    if (error) throw error
    return NextResponse.json({ product: data })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Server error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  if (!isAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await params
    const body = await req.json()
    const fields = pickProductFields(body)

    // 改台幣價就同步重算馬幣（一律 ÷8）
    if (typeof fields.price_twd === 'number') {
      if (fields.price_twd <= 0) {
        return NextResponse.json({ error: 'price_twd must be positive' }, { status: 400 })
      }
      fields.price_myr = computeMyr(fields.price_twd)
    }

    const sb = getServiceClient()
    if (Object.keys(fields).length > 0) {
      const { error } = await sb.from('products').update(fields).eq('id', id)
      if (error) throw error
    }

    // image_urls 有帶才動圖（整批換），沒帶＝不動
    const urls = normalizeImageUrls(body)
    if (urls !== null) {
      await setProductImages(sb, id, urls)
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Server error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  if (!isAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await params
    const sb = getServiceClient()
    const { error } = await sb.from('products').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Server error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
