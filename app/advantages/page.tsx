'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BrandAdvantages } from '@/components/BrandAdvantages'
import { useI18n } from '@/lib/i18n'

export default function AdvantagesPage() {
  const { t } = useI18n()
  return (
    <>
      <Header />
      <main className="guide-wrap">
        <h1 className="serif">{t('品牌優勢', 'Why CiCi')}</h1>
        <p className="guide-intro">
          {t(
            '為什麼選 CiCi：每一件都是限量手作，還能把你珍藏的材料交給我們重新編織。',
            'Why choose CiCi: every piece is a limited handmade work, and we can re-weave your own treasured materials too.'
          )}
        </p>
        <BrandAdvantages />
      </main>
      <Footer />
    </>
  )
}
