import { Header } from '@/components/Header'
import { Announcement } from '@/components/Announcement'
import { Footer } from '@/components/Footer'
import { MusicButton } from '@/components/MusicButton'
import { FiftyFiftyHero } from '@/components/sections/FiftyFiftyHero'
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
      <ProductSection
        id="bracelets"
        kicker={{ zh: '手環．精選', en: 'Bracelets · Featured' }}
        title={{ zh: '寶石系列', en: 'Stone Collection' }}
        viewAll={{ zh: '查看全部手環 →', en: 'View all bracelets →' }}
        products={bracelets}
      />
      <LargeHero />
      <ProductSection
        id="earrings"
        kicker={{ zh: '耳環', en: 'Earrings' }}
        title={{ zh: '編織圓圈．流蘇', en: 'Woven Hoops & Tassels' }}
        viewAll={{ zh: '查看全部耳環 →', en: 'View all earrings →' }}
        products={earrings}
      />
      <CustomSection />
      <EditorialSection />
      <PaymentShipping />
      <Newsletter />
      <Footer />
      <MusicButton />
    </>
  )
}
