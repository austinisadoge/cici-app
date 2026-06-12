'use client'

import { useI18n } from '@/lib/i18n'

export function LargeHero() {
  const { lang, t } = useI18n()
  return (
    <section className="large-hero">
      <div className="overlay">
        <div>
          <span className="kicker">{t('全新．耳環', 'New · Earrings')}</span>
          <h2 className="serif">
            {lang === 'zh' ? (
              <>
                限量手作．<br />不會有第二件相同。
              </>
            ) : (
              <>
                Limited pieces.<br />No two alike.
              </>
            )}
          </h2>
        </div>
        <a className="btn" href="/shop?category=earrings">{t('探索 →', 'DISCOVER →')}</a>
      </div>
    </section>
  )
}
