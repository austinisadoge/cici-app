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
            '選色．選石．編你的故事。',
            'Choose your colours, your stone, your story.'
          )}
        </h2>
        <p>
          {t(
            '找不到喜歡的配色？告訴我們你想要的色系、尺寸與寶石，匠人為你親手編一件獨一無二的作品。從下單到出貨約 14 天。',
            'Cannot find the colour you love? Tell us your palette, size and stone, and an artisan will weave one for you, by hand. Allow 14 days from order to shipment.'
          )}
        </p>
        <div className="steps">
          <div>
            <b className="serif">01</b>
            <span>{t('選擇配色', 'Select colours')}</span>
          </div>
          <div>
            <b className="serif">02</b>
            <span>{t('挑一顆石', 'Pick a stone')}</span>
          </div>
          <div>
            <b className="serif">03</b>
            <span>{t('手工編織', 'Hand-woven')}</span>
          </div>
        </div>
        <button className="btn">
          {t('開始客製訂單 →', 'START CUSTOM ORDER →')}
        </button>
      </div>
    </section>
  )
}
