'use client'

import { LegalLayout } from '@/components/LegalLayout'

export default function TermsPage() {
  return (
    <LegalLayout
      title={{ zh: '服務條款', en: 'Terms of Service' }}
      updated="2026-06-12"
      sections={[
        {
          h: { zh: '商品特性', en: 'About the pieces' },
          ps: [
            {
              zh: '所有作品均為手工製作，紋理、色澤與礦石紋路會有細微差異，這是手作的本質，不構成瑕疵。商品照片因螢幕顯色略有色差，以實品為準。',
              en: 'All pieces are handmade. Small variations in weave, colour and stone patterns are the nature of the craft, not defects. Colours may vary slightly between screens and the actual piece.',
            },
          ],
        },
        {
          h: { zh: '價格與幣別', en: 'Pricing & currency' },
          ps: [
            {
              zh: '台灣訂單以新台幣（NT$）計價，馬來西亞訂單以馬幣（RM）計價，以結帳當下頁面顯示之金額為準。',
              en: 'Taiwan orders are priced in NT$, Malaysia orders in RM. The amount shown at checkout is final.',
            },
          ],
        },
        {
          h: { zh: '訂單成立與取消', en: 'Order confirmation & cancellation' },
          ps: [
            {
              zh: '訂單於我們確認收到款項後正式成立並開始備貨／製作。下單後 7 天內未完成付款，訂單自動取消。',
              en: 'An order is confirmed once payment is verified, after which preparation or crafting begins. Unpaid orders are cancelled automatically after 7 days.',
            },
            {
              zh: '客製訂單於開始製作後即無法取消。',
              en: 'Custom orders cannot be cancelled once crafting has begun.',
            },
          ],
        },
        {
          h: { zh: '付款方式', en: 'Payment' },
          ps: [
            {
              zh: '台灣：銀行匯款（轉帳後回填末五碼）。馬來西亞：TNG eWallet 掃碼付款（付款後回報）。',
              en: 'Taiwan: bank transfer (submit the last 5 digits after transfer). Malaysia: TNG eWallet QR payment (report after paying).',
            },
          ],
        },
        {
          h: { zh: '出貨時程', en: 'Shipping' },
          ps: [
            {
              zh: '現貨於款項確認後 48 小時內出貨；訂製作品約 3–7 個工作天。台灣採超商店到店（7-11、全家），馬來西亞以台灣郵局寄送。如遇不可抗力（天候、物流異常）將另行通知。',
              en: 'In-stock pieces ship within 48 hours after payment is verified; custom pieces in 3–7 business days. Taiwan uses convenience-store pickup (7-11, FamilyMart); Malaysia ships via the post office in Taiwan. We will notify you of delays beyond our control.',
            },
          ],
        },
        {
          h: { zh: '智慧財產權', en: 'Intellectual property' },
          ps: [
            {
              zh: '本網站之文字、攝影與作品設計均屬 CiCi Daily Studio 所有，未經同意請勿轉載或商用。',
              en: 'All text, photography and designs on this site belong to CiCi Daily Studio. Please do not reproduce or use commercially without permission.',
            },
          ],
        },
        {
          h: { zh: '準據法', en: 'Governing law' },
          ps: [
            {
              zh: '本條款依中華民國（台灣）法律解釋與適用。',
              en: 'These terms are governed by the laws of Taiwan (R.O.C.).',
            },
          ],
        },
      ]}
    />
  )
}
