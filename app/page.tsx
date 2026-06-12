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
  const bracelets = catalog.filter(p => p.category === 'braided-bracelets')
  const earrings = catalog.filter(p => p.category === 'earrings')
  const others = catalog.filter(
    p => p.category !== 'braided-bracelets' && p.category !== 'earrings'
  )

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
        viewAll={{ zh: '查看全部手繩 →', en: 'View all bracelets →' }}
        viewAllHref="/shop?category=braided-bracelets"
        products={bracelets}
      />
      <LargeHero />
      <ProductSection
        id="earrings"
        kicker={{ zh: '精選．耳飾', en: 'Featured · Earrings' }}
        title={{ zh: '編織圓圈．流蘇', en: 'Woven Hoops & Tassels' }}
        viewAll={{ zh: '查看全部耳飾 →', en: 'View all earrings →' }}
        viewAllHref="/shop?category=earrings"
        products={earrings}
      />
      {others.length > 0 && (
        <ProductSection
          id="more"
          kicker={{ zh: '更多作品', en: 'More Pieces' }}
          title={{ zh: '項鍊．掛飾．小物', en: 'Necklaces, Charms & More' }}
          viewAll={{ zh: '查看全部 →', en: 'View all →' }}
          viewAllHref="/shop"
          products={others}
        />
      )}
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
