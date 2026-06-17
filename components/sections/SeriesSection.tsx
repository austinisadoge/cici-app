'use client'

import { useI18n } from '@/lib/i18n'
import { SERIES } from '@/lib/products'

export function SeriesSection() {
  const { t } = useI18n()
  return (
    <section className="sec series-sec" id="series">
      <div className="container-x">
        <div className="sec-head pay-head" style={{ marginBottom: 32 }}>
          <span className="kicker">{t('五大系列', 'Five Series')}</span>
        </div>
        <div className="series-grid">
          {SERIES.map(s => (
            <a key={s.id} href={`/shop?series=${s.id}`} className="series-card">
              <div className="series-no serif">{s.no}</div>
              <h3 className="serif">{t(s.name.zh, s.name.en)}</h3>
              <div className="series-tagline">{t(s.tagline.zh, s.tagline.en)}</div>
              <p>{t(s.description.zh, s.description.en)}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
