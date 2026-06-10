'use client'

import { useI18n } from '@/lib/i18n'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer>
      <div className="container-x">
        <div className="foot">
          <div>
            <div className="brand-name">CiCi</div>
            <p className="brand-desc">
              {t(
                '台灣手作編織飾品。一根繩、一顆石、無數個結，從台灣寄送到每一位珍惜手作的人手上。',
                'Handwoven jewelry from Taiwan. A strand, a stone, countless knots, shipped from Taiwan to those who value the craft.'
              )}
            </p>
          </div>
          <div>
            <h4>{t('選購', 'Shop')}</h4>
            <ul>
              <li>{t('全部手環', 'All Bracelets')}</li>
              <li>{t('全部耳環', 'All Earrings')}</li>
              <li>{t('客製訂製', 'Made to Order')}</li>
              <li>{t('新品上架', 'New Arrivals')}</li>
            </ul>
          </div>
          <div>
            <h4>{t('客服', 'Help')}</h4>
            <ul>
              <li>{t('付款方式', 'Payment')}</li>
              <li>{t('寄送說明', 'Shipping')}</li>
              <li>{t('退換貨', 'Returns')}</li>
              <li>{t('客製須知', 'Custom Order Guide')}</li>
            </ul>
          </div>
          <div>
            <h4>{t('聯絡', 'Contact')}</h4>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/cicidailyjewelry/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram · @cicidailyjewelry
                </a>
              </li>
              <li>LINE @cici.handmade</li>
              <li>WhatsApp</li>
              <li>hello@cici.studio</li>
            </ul>
          </div>
        </div>
        <div className="foot-bot">
          <span>
            {t('© 2026 CiCi．台灣手作', '© 2026 CiCi · HANDWOVEN IN TAIWAN')}
          </span>
          <span>{t('隱私．條款', 'PRIVACY · TERMS')}</span>
        </div>
      </div>
    </footer>
  )
}
