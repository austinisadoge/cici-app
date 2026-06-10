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
              收藏生活中<br />的風景。
            </>
          ) : (
            <>
              Collecting the<br /><em>sceneries</em> of life.
            </>
          )}
        </h1>
        <p className="lead">
          {t(
            '透過編織、針線與顏料等多元媒材，將自然色彩、天然素材與礦石紋理，一件一件慢慢化為獨一無二的手工作品。',
            'Through weaving, needlework and paint, natural colours, organic materials and mineral textures slowly become one-of-a-kind handmade pieces.'
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
