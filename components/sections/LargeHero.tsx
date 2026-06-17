'use client'

import { useI18n } from '@/lib/i18n'

export function LargeHero() {
  const { lang, t } = useI18n()
  return (
    <section className="large-hero">
      <div className="overlay">
        <div>
          <h2 className="serif">
            {lang === 'zh' ? (
              <>
                限量手作<br />獨具一格
              </>
            ) : (
              <>
                Limited &amp; handmade,<br />one of a kind.
              </>
            )}
          </h2>
        </div>
        <a className="btn" href="/shop">{t('探索 →', 'DISCOVER →')}</a>
      </div>
    </section>
  )
}
