'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useI18n } from '@/lib/i18n'
import { BRAND } from '@/lib/brand'

export default function AboutPage() {
  const { t } = useI18n()
  return (
    <>
      <Header />
      <main className="content-wrap">
        <span className="kicker">{t('品牌故事', 'Our Story')}</span>
        <h1 className="serif">
          {t('收藏生活中的風景', 'Collecting the sceneries of life')}
        </h1>
        <div className="content-body">
          <p>{t(BRAND.philosophy1.zh, BRAND.philosophy1.en)}</p>
          <p>{t(BRAND.philosophy2.zh, BRAND.philosophy2.en)}</p>
          <p className="content-sign serif">
            {t(BRAND.philosophySign.zh, BRAND.philosophySign.en)}
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
