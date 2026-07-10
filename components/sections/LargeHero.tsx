'use client'

import { useI18n } from '@/lib/i18n'
import { BRAND } from '@/lib/brand'

export function LargeHero() {
  const { lang, t } = useI18n()
  return (
    <section className="large-hero">
      <div className="lh-text">
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
        <p className="lh-lead">
          {t(
            '手工製品為什麼值得擁有，因為有人將生命中的一段時間，特意定格留下來給妳。',
            'Why is a handmade piece worth owning? Because someone took a stretch of their life and set it still, leaving it just for you.'
          )}
        </p>
        <div className="lh-sign serif">— {BRAND.nameFull}</div>
        <a className="btn" href="/shop">{t('探索 →', 'DISCOVER →')}</a>
      </div>
      <div className="lh-img" />
    </section>
  )
}
