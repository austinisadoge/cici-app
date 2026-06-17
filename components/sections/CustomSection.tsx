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
