'use client'

import { useI18n } from '@/lib/i18n'
import { BRAND } from '@/lib/brand'

export function CustomSection() {
  const { t } = useI18n()
  return (
    <section className="third" id="custom">
      <div className="left">
        <img src="/images/home-custom.jpg" alt="custom" />
        <div className="photo-caption">
          {t(
            '手作的每一刻，都是對生活的熱愛與珍視，感受其中的美好與溫情。',
            'Every moment of handcraft carries a love and care for life. May you feel the warmth and beauty within.'
          )}
          <span className="serif">— {BRAND.nameFull}</span>
        </div>
      </div>
      <div className="right">
        <span className="kicker">{t('客製訂製', 'Custom')}</span>
        <h2 className="serif">
          {t('為你量身編織', 'Woven just for you')}
        </h2>
        <div className="custom-subtitle">
          {t('編織屬於自己的故事', 'Weave a story of your own')}
        </div>
        <p>
          {t(
            '想要專屬的色系與尺寸，或把你珍藏的玉珮、礦石、吊墜交給我們，以同款工法重新編織，延續它的故事與陪伴。',
            'Want your own palette and size, or send us your treasured jade, stone or pendant to re-weave in the same style, continuing its story and companionship.'
          )}
        </p>
        <a href="/custom" className="btn">
          {t('開始客製訂單 →', 'START CUSTOM ORDER →')}
        </a>
      </div>
    </section>
  )
}
