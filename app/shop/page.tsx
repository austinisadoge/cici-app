import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'
import { ProductSection } from '@/components/sections/ProductSection'
import { fetchCatalog } from '@/lib/catalog'
import { SERIES, CATEGORIES } from '@/lib/products'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Shop · CiCi Daily Studio',
}

type Params = Promise<{ series?: string; category?: string }>

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Params
}) {
  const { series, category } = await searchParams
  const catalog = await fetchCatalog()

  const s = SERIES.find(x => x.id === series)
  const c = CATEGORIES.find(x => x.id === category)

  const filtered = catalog.filter(
    p => (!s || p.series === s.id) && (!c || p.category === c.id)
  )

  const kicker = s ? s.tagline : { zh: '全部系列', en: 'All Series' }
  const title =
    s && c
      ? { zh: `${s.name.zh}．${c.name.zh}`, en: `${s.name.en} · ${c.name.en}` }
      : s
        ? s.name
        : c
          ? c.name
          : { zh: '全部作品', en: 'All Pieces' }

  return (
    <>
      <Header />
      <main>
        <ProductSection id="shop" kicker={kicker} title={title} products={filtered} compact />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
