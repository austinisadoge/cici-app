'use client'

import { useI18n } from '@/lib/i18n'
import { BRAND } from '@/lib/brand'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer>
      <div className="container-x">
        <div className="foot">
          <div>
            <div className="brand-name">
              {BRAND.name}
              <span className="brand-name-sub">{BRAND.nameSub}</span>
            </div>
            <p className="brand-desc">
              {t(BRAND.footerDesc.zh, BRAND.footerDesc.en)}
            </p>
          </div>
          <div>
            <h4>{t('五大系列', 'Series')}</h4>
            <ul>
              <li>{t('生活風景', 'Living Scenery')}</li>
              <li>{t('礦石物語', 'Stone Stories')}</li>
              <li>{t('日常拾光', 'Daily Glimmers')}</li>
              <li>{t('祝福小物', 'Little Blessings')}</li>
              <li>{t('生命力量', 'Living Force')}</li>
            </ul>
          </div>
          <div>
            <h4>{t('客服', 'Help')}</h4>
            <ul>
              <li><a href="/guide">{t('購物說明', 'Shopping Guide')}</a></li>
              <li><a href="/guide#returns">{t('退換貨說明', 'Returns')}</a></li>
              <li><a href="/custom">{t('客製訂製', 'Custom Orders')}</a></li>
              <li><a href="/#payment">{t('付款與寄送', 'Payment & Shipping')}</a></li>
            </ul>
          </div>
          <div>
            <h4>{t('聯絡', 'Contact')}</h4>
            <ul>
              <li>
                <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer">
                  Instagram · @{BRAND.instagramHandle}
                </a>
              </li>
              <li>
                <a href={BRAND.lineUrl} target="_blank" rel="noopener noreferrer">
                  LINE · {BRAND.lineId}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bot">
          <span>
            {t(
              `© 2026 ${BRAND.nameFull}．台灣手作`,
              `© 2026 ${BRAND.nameFull} · HANDMADE IN TAIWAN`
            )}
          </span>
          <span>
            <a href="/privacy">{t('隱私', 'PRIVACY')}</a>
            {' · '}
            <a href="/terms">{t('條款', 'TERMS')}</a>
            {' · '}
            <a href="/returns">{t('退換貨', 'RETURNS')}</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
