import { Header } from '@/components/Header'
import { Announcement } from '@/components/Announcement'
import { Footer } from '@/components/Footer'
import { MusicButton } from '@/components/MusicButton'
import { CartDrawer } from '@/components/CartDrawer'
import { FiveBanner } from '@/components/sections/FiveBanner'
import { FiftyFiftyHero } from '@/components/sections/FiftyFiftyHero'
import { SeriesSection } from '@/components/sections/SeriesSection'
import { LargeHero } from '@/components/sections/LargeHero'
import { CustomSection } from '@/components/sections/CustomSection'
import { PaymentShipping } from '@/components/sections/PaymentShipping'

export default function HomePage() {
  return (
    <>
      <Header />
      <Announcement />
      <FiveBanner />
      <FiftyFiftyHero />
      <SeriesSection />
      <LargeHero />
      <CustomSection />
      <PaymentShipping />
      <Footer />
      <MusicButton />
      <CartDrawer />
    </>
  )
}
