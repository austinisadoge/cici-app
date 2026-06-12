'use client'

import { useI18n } from '@/lib/i18n'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer>
      <div className="container-x">
        <div className="foot">
          <div>
            <div className="brand-name">
              CiCi
              <span className="brand-name-sub">DAILY STUDIO</span>
            </div>
            <p className="brand-desc">
              {t(
                '透過編織、針線與顏料，收藏生活中的風景。運用大自然饋贈的禮物，創作兼具故事感與日常感的生活作品。',
                'Collecting the sceneries of life through weaving, needlework and paint. Works made with gifts from nature, carrying both story and everyday ease.'
              )}
            </p>
          </div>
          <div>
            <h4>{t('五大系列', 'Series')}</h4>
            <ul>
              <li>{t('生活風景', 'Living Scenery')}</li>
              <li>{t('礦石物語', 'Stone Stories')}</li>
              <li>{t('日常拾光', 'Daily Glimmers')}</li>
              <li>{t('祝福小物', 'Little Blessings')}</li>
              <li>{t('生物力量', 'Living Force')}</li>
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
            {t(
              '© 2026 CiCi Daily Studio．台灣手作',
              '© 2026 CiCi DAILY STUDIO · HANDMADE IN TAIWAN'
            )}
          </span>
          <span>{t('隱私．條款', 'PRIVACY · TERMS')}</span>
        </div>
      </div>
    </footer>
  )
}
