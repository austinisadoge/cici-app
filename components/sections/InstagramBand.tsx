'use client'

import { useI18n } from '@/lib/i18n'
import { BRAND } from '@/lib/brand'

const IG_URL = BRAND.instagramUrl

const PHOTOS = [
  '/images/bracelet-sage.jpg',
  '/images/earring-hoop-pink.jpg',
  '/images/bracelet-coral.jpg',
  '/images/earring-chevron.jpg',
]

export function InstagramBand() {
  const { t } = useI18n()
  return (
    <section className="ig-band">
      <div className="container-x">
        <div className="sec-head pay-head" style={{ marginBottom: 40 }}>
          <span className="kicker">Instagram</span>
          <h2 className="serif">@{BRAND.instagramHandle}</h2>
        </div>
        <div className="ig-grid">
          {PHOTOS.map(src => (
            <a
              key={src}
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ig-cell"
              aria-label="Instagram"
            >
              <img src={src} alt="" loading="lazy" />
            </a>
          ))}
        </div>
        <div className="ig-cta">
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="btn-line">
            {t('追蹤工作室日常 →', 'FOLLOW THE STUDIO →')}
          </a>
        </div>
      </div>
    </section>
  )
}
