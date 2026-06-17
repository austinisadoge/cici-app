'use client'

import { useI18n } from '@/lib/i18n'

// 限量款 + 訂製說明（品牌優勢頁與購物說明頁共用，改一處兩邊同步）
export function BrandAdvantages() {
  const { t } = useI18n()
  return (
    <>
      <section className="guide-sec">
        <h2 className="serif">✦ {t('限量款說明', 'Limited Pieces')}</h2>
        <p>
          {t(
            'CiCi Daily Studio 每件作品皆為手工製作，精挑細選的素材可能僅此一件或數量有限，因此多為限量款式。售完後不一定能再次相遇，若遇見喜歡的作品，也許就是與它最美好的邂逅。',
            'Every CiCi Daily Studio piece is made by hand. The carefully chosen materials are often one-of-a-kind or limited, so most pieces are limited editions. Once sold out, a piece may not return. If you meet one you love, perhaps it is the most beautiful encounter of all.'
          )}
        </p>
      </section>

      <section className="guide-sec">
        <h2 className="serif">✦ {t('訂製說明', 'Custom Orders')}</h2>
        <ol className="guide-ol">
          <li>
            {t(
              '關於手繩、手串類的手圍尺寸，與項鍊長度尺寸的訂製，請於下單前務必先至客服溝通。',
              'For wrist sizes on bracelets and beaded pieces, and necklace lengths, please contact us before ordering.'
            )}
          </li>
          <li>
            {t(
              '關於編織線材顏色的訂製，請於下單前務必先至客服溝通。',
              'For custom thread colours, please contact us before ordering.'
            )}
          </li>
          <li>
            {t('關於來料訂製的服務：', 'On bring-your-own-material custom work:')}
            <ol className="guide-ol-sub">
              <li>
                {t(
                  '如果您在商品頁看到喜歡的款式，CiCi 提供來料訂製服務，歡迎您將具有紀念意義或珍藏已久的玉珮、吊墜、手串等飾品交由 CiCi 重新同款編織，延續它們的故事與陪伴。',
                  'If you find a style you love, CiCi offers a service to re-weave your own treasured jade, pendants or beads in the same style, continuing their story and companionship.'
                )}
              </li>
              <li>
                {t(
                  '來料訂製採一對一討論方式，將依照材料特性、編織難易度及您的需求進行設計與報價。',
                  'This is handled one-on-one. Design and pricing follow the material, the difficulty of weaving, and your wishes.'
                )}
              </li>
              <li>
                {t(
                  '客人需自行將材料寄送至指定地址，作品完成後，將連同原有材料一併寄回。',
                  'You send the materials to a given address; the finished piece is returned together with the original materials.'
                )}
              </li>
              <li>
                {t(
                  '因材料本身為客人所有，若材料原有細紋、脆裂、磨損、老化、鬆動等情況，CiCi 會於製作前盡可能與您確認，但無法保證材料在製作過程中不會因其原有狀況而產生變化。',
                  'As the materials are yours, if there are existing cracks, wear, ageing or looseness, CiCi will confirm with you beforehand where possible, but cannot guarantee the material will not change during the work due to its prior condition.'
                )}
              </li>
              <li>
                {t(
                  '來料訂製屬客製化服務，確認製作後恕不接受退換貨。',
                  'As a custom service, returns are not accepted once the work is confirmed.'
                )}
              </li>
              <li>
                {t(
                  '如對設計、配色或尺寸有任何想法，歡迎事先與 CiCi 討論。有些飾品珍貴的不是價格，而是陪伴的歲月與回憶。CiCi 很榮幸能參與這份延續，讓舊時光以新的模樣，再次陪伴您的日常。',
                  'Share any thoughts on design, colour or size with us first. Some pieces are precious not for their price, but for the years and memories they hold. CiCi is honoured to be part of that continuation, letting old time accompany your days in a new form.'
                )}
              </li>
              <li>
                {t(
                  '來料寄送風險提醒：請妥善包裝並建議使用可追蹤之寄送方式；若因物流遺失、延誤或不可抗力因素造成損失，將依物流業者相關規定處理。',
                  'Shipping risk: please pack well and use a trackable method. Losses from courier loss, delay or force majeure follow the courier’s terms.'
                )}
              </li>
            </ol>
          </li>
        </ol>
      </section>
    </>
  )
}
