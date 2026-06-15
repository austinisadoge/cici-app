import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'
import { ProductDetailView } from '@/components/ProductDetailView'
import { fetchProductBySlug } from '@/lib/catalog'
import { BRAND } from '@/lib/brand'

export const dynamic = 'force-dynamic'

type Params = Promise<{ slug: string }>

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { slug } = await params
  const p = await fetchProductBySlug(slug)
  if (!p) return { title: BRAND.nameFull }
  const title = `${p.name.en} ${p.name.zh} · ${BRAND.nameFull}`
  const description = p.meta.en || p.meta.zh || 'Handmade in Taiwan.'
  const img = p.images[0]
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: img ? [img.startsWith('http') ? img : `${BRAND.url}${img}`] : [],
    },
  }
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params
  const product = await fetchProductBySlug(slug)
  if (!product) notFound()

  return (
    <>
      <Header />
      <ProductDetailView product={product} />
      <Footer />
      <CartDrawer />
    </>
  )
}
