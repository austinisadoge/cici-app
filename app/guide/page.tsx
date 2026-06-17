'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useI18n } from '@/lib/i18n'
import { BRAND } from '@/lib/brand'
import { BrandAdvantages } from '@/components/BrandAdvantages'

export default function GuidePage() {
  const { t } = useI18n()
  return (
    <>
      <Header />
      <main className="guide-wrap">
        <h1 className="serif">{t('購物說明', 'Shopping Guide')}</h1>
        <p className="guide-intro">
          {t(
            '下單前，邀請你花點時間讀一下這些說明，讓每一次相遇都安心。',
            'Before you order, please take a moment to read through. So every encounter feels at ease.'
          )}
        </p>

        {/* 限量款 + 訂製（共用元件）*/}
        <BrandAdvantages />

        {/* 退換貨 */}
        <section className="guide-sec" id="returns">
          <h2 className="serif">✦ {t('退換貨說明', 'Returns & Exchanges')}</h2>
          <ol className="guide-ol">
            <li>
              {t(
                '耳環類商品屬貼身飾品，基於衛生考量，拆封後不適用 7 天鑑賞期；客製化商品亦不適用 7 天鑑賞期，謝謝您的理解與喜愛。',
                'Earrings are personal items; for hygiene reasons the 7-day inspection period does not apply once opened. Custom pieces are likewise not eligible. Thank you for your understanding.'
              )}
            </li>
            <li>
              {t(
                '若商品本身有瑕疵或寄送錯誤，請於收到商品後儘速與客服聯繫，我們將盡力協助處理。',
                'If a piece is defective or sent in error, please contact us as soon as you receive it and we will do our best to help.'
              )}
            </li>
          </ol>
        </section>

        {/* 客服 */}
        <section className="guide-sec">
          <h2 className="serif">✦ {t('客服說明', 'Customer Service')}</h2>
          <ol className="guide-ol">
            <li>{t('下單前請詳閱商品說明。', 'Please read the product details before ordering.')}</li>
            <li>{t('客製需求請務必先與客服聯繫。', 'For custom requests, please contact us first.')}</li>
            <li>
              {t(
                '若對尺寸、材質或細節有任何疑問，都歡迎先與客服聯繫，我們很樂意為您說明，希望您能安心選購。',
                'For any questions on size, material or detail, reach out first. We are glad to help so you can shop with peace of mind.'
              )}
            </li>
            <li>
              <strong>{t('客服時間：每日 10:00 – 20:00', 'Hours: daily 10:00 AM – 8:00 PM')}</strong>
            </li>
            <li>
              {t('聯繫客服請私訊 Instagram：', 'Reach us on Instagram: ')}
              <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer">
                @{BRAND.instagramHandle}
              </a>
            </li>
          </ol>
        </section>

        {/* 物流 */}
        <section className="guide-sec">
          <h2 className="serif">✦ {t('物流說明', 'Shipping')}</h2>
          <ol className="guide-ol">
            <li>
              {t(
                '成品現貨類商品，自下單日起 48 小時內發貨。',
                'In-stock pieces ship within 48 hours of your order.'
              )}
            </li>
            <li>
              {t(
                '訂製客製類商品，需考量製作難易度，自下單日起 3–7 個工作天內發貨。',
                'Custom pieces ship within 3–7 business days, depending on the difficulty of the work.'
              )}
            </li>
            <li>
              {t(
                '台灣地區，請提供超商店到店資訊（目前只提供 7-11、全家超商）。',
                'Taiwan: please provide convenience-store pickup details (currently 7-11 and FamilyMart only).'
              )}
            </li>
            <li>
              {t(
                '馬來西亞地區，以台灣當地郵局配達日期為準。',
                'Malaysia: delivery follows the dispatch date from the local post office in Taiwan.'
              )}
            </li>
          </ol>
        </section>

        <div className="guide-contact">
          {t(
            `還有問題嗎？歡迎透過 Instagram @${BRAND.instagramHandle} 私訊我們，客服時間每日 10:00 – 20:00。`,
            `More questions? Message us on Instagram @${BRAND.instagramHandle}, daily 10:00 AM – 8:00 PM.`
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
