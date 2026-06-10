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
import { Newsletter } from '@/components/sections/Newsletter'
import { bracelets, earrings } from '@/lib/products'

export default function HomePage() {
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
        products={bracelets}
      />
      <LargeHero />
      <ProductSection
        id="earrings"
        kicker={{ zh: '精選．耳飾', en: 'Featured · Earrings' }}
        title={{ zh: '編織圓圈．流蘇', en: 'Woven Hoops & Tassels' }}
        viewAll={{ zh: '查看全部耳飾 →', en: 'View all earrings →' }}
        products={earrings}
      />
      <CustomSection />
      <EditorialSection />
      <PaymentShipping />
      <Newsletter />
      <Footer />
      <MusicButton />
      <CartDrawer />
    </>
  )
}
