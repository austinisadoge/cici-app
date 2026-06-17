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
            <h4>{t('服務', 'Service')}</h4>
            <ul>
              <li><a href="/guide">{t('購物說明', 'Shopping Guide')}</a></li>
              <li><a href="/guide#returns">{t('退換貨說明', 'Returns')}</a></li>
              <li><a href="/custom">{t('客製訂製', 'Custom Orders')}</a></li>
              <li><a href="/#payment">{t('付款與寄送', 'Payment & Shipping')}</a></li>
            </ul>
          </div>
          <div>
            <h4>{t('客服', 'Contact')}</h4>
            <ul>
              <li>
                <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer">
                  Instagram · @{BRAND.instagramHandle}
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
