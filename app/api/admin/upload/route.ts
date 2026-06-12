import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { isAdminAuth } from '@/lib/admin-auth'

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE = 5 * 1024 * 1024

export async function POST(req: NextRequest) {
  if (!isAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const form = await req.formData()
    const file = form.get('file')
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file' }, { status: 400 })
    }
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: 'Only JPG / PNG / WebP / GIF' }, { status: 400 })
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'Max 5MB' }, { status: 400 })
    }

    const base = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_KEY
    if (!base || !key) {
      return NextResponse.json({ error: 'Storage not configured' }, { status: 500 })
    }

    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg'
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    // Storage API 對新版 sb_secret 金鑰只認 apikey header，不能放 Authorization Bearer
    const res = await fetch(`${base}/storage/v1/object/product-images/${path}`, {
      method: 'POST',
      headers: {
        apikey: key,
        'Content-Type': file.type,
        'cache-control': 'public, max-age=31536000',
      },
      body: await file.arrayBuffer(),
    })
    if (!res.ok) {
      const detail = await res.text()
      console.error('[upload] storage error:', detail)
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }

    return NextResponse.json({
      url: `${base}/storage/v1/object/public/product-images/${path}`,
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Server error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
