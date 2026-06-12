'use client'

import { useI18n } from '@/lib/i18n'

export function CustomSection() {
  const { t } = useI18n()
  return (
    <section className="third" id="custom">
      <div className="left">
        <img src="/images/model-mustard.jpg" alt="custom" />
      </div>
      <div className="right">
        <span className="kicker">{t('為你量身', 'Made for you')}</span>
        <h2 className="serif">
          {t(
            '選你的色，帶你的料，編你的故事。',
            'Your colours, your material, your story.'
          )}
        </h2>
        <p>
          {t(
            '想要專屬的色系與尺寸，或把你珍藏的玉珮、礦石、吊墜交給我們，以同款工法重新編織，延續它的故事與陪伴。',
            'Want your own palette and size, or send us your treasured jade, stone or pendant to re-weave in the same style, continuing its story and companionship.'
          )}
        </p>
        <div className="steps">
          <div>
            <b className="serif">01</b>
            <span>{t('配色與尺寸', 'Colours & size')}</span>
          </div>
          <div>
            <b className="serif">02</b>
            <span>{t('來料重織', 'Re-weave your piece')}</span>
          </div>
          <div>
            <b className="serif">03</b>
            <span>{t('手工編織', 'Hand-woven')}</span>
          </div>
        </div>
        <a href="/custom" className="btn">
          {t('開始客製訂單 →', 'START CUSTOM ORDER →')}
        </a>
      </div>
    </section>
  )
}
