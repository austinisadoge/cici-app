'use client'

import { useI18n } from '@/lib/i18n'
import { BRAND } from '@/lib/brand'

export function EditorialSection() {
  const { lang, t } = useI18n()
  const ptitle = lang === 'zh' ? BRAND.philosophyTitle.zh : BRAND.philosophyTitle.en
  return (
    <section className="editorial" id="about">
      <div className="container-x">
        <div className="ed-grid">
          <div className="ed-img" />
          <div>
            <span className="kicker">{t('品牌理念', 'Our Philosophy')}</span>
            <h2 className="serif">
              {ptitle[0]}<br />{ptitle[1]}
            </h2>
            <p>{t(BRAND.philosophy1.zh, BRAND.philosophy1.en)}</p>
            <p>{t(BRAND.philosophy2.zh, BRAND.philosophy2.en)}</p>
            <div className="sig">{t(BRAND.philosophySign.zh, BRAND.philosophySign.en)}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
