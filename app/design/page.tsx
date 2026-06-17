'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useI18n } from '@/lib/i18n'
import { SERIES, SERIES_CATEGORIES, categoryById } from '@/lib/products'

export default function DesignPage() {
  const { t } = useI18n()
  return (
    <>
      <Header />
      <main className="content-wrap content-wide">
        <span className="kicker">{t('設計架構', 'Design Structure')}</span>
        <h1 className="serif">{t('五大系列，十三分類', 'Five series, thirteen categories')}</h1>
        <p className="content-intro">
          {t(
            '每個系列都有自己的概念，下面是它涵蓋的品類。點進任一品類即可看作品。',
            'Each series carries its own concept. Below are the categories it spans — tap any to browse.'
          )}
        </p>
        {SERIES.map(s => (
          <section key={s.id} className="design-series">
            <div className="design-series-head">
              <span className="design-no serif">{s.no}</span>
              <div>
                <h2 className="serif">{t(s.name.zh, s.name.en)}</h2>
                <div className="design-tagline">{t(s.tagline.zh, s.tagline.en)}</div>
                <p>{t(s.description.zh, s.description.en)}</p>
              </div>
            </div>
            <div className="design-cats">
              {SERIES_CATEGORIES[s.id].map(cid => {
                const c = categoryById(cid)
                return (
                  <Link key={cid} href={`/shop?series=${s.id}&category=${cid}`} className="design-cat">
                    {t(c.name.zh, c.name.en)}
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  )
}
