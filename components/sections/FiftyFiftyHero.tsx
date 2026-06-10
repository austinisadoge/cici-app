'use client'

import { useI18n } from '@/lib/i18n'

export function FiftyFiftyHero() {
  const { lang, t } = useI18n()
  return (
    <section className="fifty">
      <div className="img hero1" />
      <div className="text">
        <span className="kicker">
          {t('二〇二六．春夏新作', 'Spring · Summer 2026')}
        </span>
        <h1 className="serif">
          {lang === 'zh' ? (
            <>
              手作的<br />耐心。
            </>
          ) : (
            <>
              Handwoven<br />with <em>patience</em>.
            </>
          )}
        </h1>
        <p className="lead">
          {t(
            '每一條手環、每一對耳環，都由匠人在台灣以雙手逐結編成。沒有兩件相同，這是手作的本質。',
            'Each bracelet, each pair of earrings is woven by hand in Taiwan, one knot at a time. No two are alike. That is the nature of the craft.'
          )}
        </p>
        <div className="btn-row">
          <button className="btn">
            {t('逛逛全系列 →', 'SHOP THE COLLECTION →')}
          </button>
          <a className="btn-line" href="#about">
            {t('品牌故事', 'OUR STORY')}
          </a>
        </div>
      </div>
    </section>
  )
}
