import { Header } from '@/components/Header'
import { Announcement } from '@/components/Announcement'
import { Footer } from '@/components/Footer'
import { MusicButton } from '@/components/MusicButton'
import { CartDrawer } from '@/components/CartDrawer'
import { FiftyFiftyHero } from '@/components/sections/FiftyFiftyHero'
import { SeriesSection } from '@/components/sections/SeriesSection'
import { ProductSection } from '@/components/sections/ProductSection'
import { LargeHero } from '@/components/sections/LargeHero'
import { CustomSection } from '@/components/sections/CustomSection'
import { EditorialSection } from '@/components/sections/EditorialSection'
import { PaymentShipping } from '@/components/sections/PaymentShipping'
import { InstagramBand } from '@/components/sections/InstagramBand'
import { Newsletter } from '@/components/sections/Newsletter'
import { fetchCatalog } from '@/lib/catalog'

// 商品來自 Supabase，業主後台改了要即時反映，不吃 build 時快取
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const catalog = await fetchCatalog()
  // 首頁只精選手繩一區（其餘商品在 /shop 與選單裡）
  const bracelets = catalog.filter(p => p.category === 'braided-bracelets').slice(0, 3)

  return (
    <>
      <Header />
      <Announcement />
      <FiftyFiftyHero />
      <SeriesSection />
      <ProductSection
        id="bracelets"
        kicker={{ zh: '系列．礦石物語', en: 'Series · Stone Stories' }}
        title={{ zh: '手繩精選', en: 'Braided Bracelets' }}
        viewAll={{ zh: '看更多作品 →', en: 'View the collection →' }}
        viewAllHref="/shop"
        products={bracelets}
        editorial
      />
      <LargeHero />
      <CustomSection />
      <EditorialSection />
      <PaymentShipping />
      <InstagramBand />
      <Newsletter />
      <Footer />
      <MusicButton />
      <CartDrawer />
    </>
  )
}
