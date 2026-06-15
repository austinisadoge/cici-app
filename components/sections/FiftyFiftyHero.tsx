'use client'

import { useI18n } from '@/lib/i18n'
import { BRAND } from '@/lib/brand'

// 把英文第二行的 emWord 包成斜體
function emphasize(line: string, word?: string) {
  if (!word || !line.includes(word)) return line
  const [before, after] = line.split(word)
  return (
    <>
      {before}
      <em>{word}</em>
      {after}
    </>
  )
}

export function FiftyFiftyHero() {
  const { lang, t } = useI18n()
  const title = lang === 'zh' ? BRAND.heroTitle.zh : BRAND.heroTitle.en
  return (
    <section className="fifty">
      <div className="img hero1" />
      <div className="text">
        <span className="kicker">
          {t(BRAND.heroKicker.zh, BRAND.heroKicker.en)}
        </span>
        <h1 className="serif">
          {title[0]}
          <br />
          {lang === 'en' ? emphasize(title[1], BRAND.heroTitle.emWord) : title[1]}
        </h1>
        <p className="lead">
          {t(BRAND.heroLead.zh, BRAND.heroLead.en)}
        </p>
        <div className="btn-row">
          <a className="btn" href="/shop">
            {t('逛逛全系列 →', 'SHOP THE COLLECTION →')}
          </a>
          <a className="btn-line" href="#about">
            {t('品牌故事', 'OUR STORY')}
          </a>
        </div>
      </div>
    </section>
  )
}
