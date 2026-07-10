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
        <h1 className="serif">{t('服務說明', 'Service Guide')}</h1>
        <p className="guide-intro">
          {t(
            '下單前，邀請你花點時間讀一下這些說明，讓每一次相遇都安心。',
            'Before you order, please take a moment to read through. So every encounter feels at ease.'
          )}
        </p>

        {/* 商品說明 */}
        <section className="guide-sec" id="product-notes">
          <h2 className="serif">✦ {t('商品說明', 'Product Notes')}</h2>
          <ol className="guide-ol">
            <li>
              {t(
                'CiCi Daily Studio 商品皆為實品拍攝，並盡可能忠實呈現商品顏色與細節。',
                'All CiCi Daily Studio pieces are photographed from the actual items, presented as faithfully as we can in colour and detail.'
              )}
            </li>
            <li>
              {t(
                '手工製作商品於尺寸、編織紋理及細節上可能存在些微差異，此屬正常現象，不影響使用與整體美觀。',
                'As every piece is handmade, slight variations in size, weave texture and detail may occur. This is natural and does not affect wear or overall beauty.'
              )}
            </li>
            <li>
              {t(
                '如對商品有任何疑問，歡迎於下單前與我們聯繫確認，以保障雙方權益。',
                'If you have any questions, please contact us before ordering so both sides can feel at ease.'
              )}
            </li>
          </ol>
        </section>

        {/* 天然礦石特性 */}
        <section className="guide-sec" id="stones">
          <h2 className="serif">✦ {t('天然礦石特性說明', 'Natural Stones')}</h2>
          <ol className="guide-ol">
            <li>
              {t(
                '天然水晶、瑪瑙、玉石、琉璃等天然礦石，因形成環境不同，可能帶有棉絮、冰裂、礦缺、色帶、生長紋理等天然特徵。',
                'Natural crystals, agates, jades and glazes form in different environments, and may carry inclusions, ice cracks, pits, colour bands or growth lines.'
              )}
            </li>
            <li>
              {t(
                '上述情況皆屬天然礦石正常現象，並非商品瑕疵。每顆礦石皆擁有獨一無二的自然紋理與色澤，下單前請確認可接受天然礦石之特性。',
                'These are natural characteristics of the stone, not defects. Every stone carries its own texture and colour; please make sure you can embrace these traits before ordering.'
              )}
            </li>
          </ol>
        </section>

        {/* 尼泊爾手工琉璃 */}
        <section className="guide-sec" id="glass">
          <h2 className="serif">✦ {t('尼泊爾手工琉璃說明', 'Nepalese Handmade Glass')}</h2>
          <ol className="guide-ol">
            <li>
              {t(
                '尼泊爾手工琉璃珠由工匠以傳統方式燒製完成，珠體可能帶有細微氣泡、紋理差異或手工痕跡。顏色深淺不一、紋路流動感、形狀微微不規則均為其特色，可是偏偏就是這些地方最迷人。',
                'Nepalese glass beads are fired by artisans in the traditional way. Tiny bubbles, texture variations and hand marks may appear; colours shift in depth, patterns flow, and shapes are slightly irregular. And these are exactly where the charm lies.'
              )}
            </li>
            <li>
              {t(
                '這些歲月與手作留下的印記，正是手工琉璃最珍貴的地方。',
                'These marks of time and hand are what make handmade glass precious.'
              )}
            </li>
            <li>
              {t(
                '每顆珠子都擁有自己的色彩與表情，因此每件作品也都是獨一無二的風景。',
                'Every bead has its own colour and expression, so every piece is a one-of-a-kind scenery.'
              )}
            </li>
          </ol>
        </section>

        {/* 保養與配戴建議 */}
        <section className="guide-sec" id="care-guide">
          <h2 className="serif">✦ {t('保養與配戴建議', 'Care & Wearing')}</h2>
          <ol className="guide-ol">
            <li>
              {t(
                '為維持飾品與天然礦石之良好狀態，建議避免長時間接觸水分、化學用品、高溫環境及陽光曝曬。',
                'To keep your piece and its stones in good condition, avoid prolonged contact with water, chemicals, high heat and direct sunlight.'
              )}
            </li>
            <li>
              {t(
                '洗澡、泡溫泉、游泳、運動流汗時，建議先行取下飾品。',
                'Please remove your piece before bathing, hot springs, swimming or heavy exercise.'
              )}
            </li>
            <li>
              {t(
                '配戴後可使用軟布擦拭表面，並存放於乾燥陰涼處，以延長商品使用壽命。',
                'After wearing, wipe gently with a soft cloth and store in a dry, cool place to extend its life.'
              )}
            </li>
          </ol>
        </section>

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
        <section className="guide-sec" id="service">
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
        <section className="guide-sec" id="shipping">
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
