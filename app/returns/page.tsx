'use client'

import { LegalLayout } from '@/components/LegalLayout'

export default function ReturnsPage() {
  return (
    <LegalLayout
      title={{ zh: '退換貨說明', en: 'Returns & Exchanges' }}
      updated="2026-06-12"
      sections={[
        {
          h: { zh: '現貨商品', en: 'In-stock pieces' },
          ps: [
            {
              zh: '台灣訂單依消費者保護法享商品到貨 7 天鑑賞期。退換需保持全新未配戴、吊牌與包裝完整。',
              en: 'Taiwan orders enjoy a 7-day inspection period from delivery under the Consumer Protection Act. Items must be unworn and in original packaging.',
            },
          ],
        },
        {
          h: { zh: '客製商品', en: 'Made-to-order pieces' },
          ps: [
            {
              zh: '客製作品依您的需求專屬製作，除商品瑕疵外，恕不接受退換貨，請見諒。',
              en: 'Custom pieces are made exclusively for you. Except for defects, they are not eligible for return or exchange.',
            },
          ],
        },
        {
          h: { zh: '耳飾類商品', en: 'Earrings' },
          ps: [
            {
              zh: '基於衛生考量，耳飾類商品除瑕疵外恕不退換。',
              en: 'For hygiene reasons, earrings are not returnable except for defects.',
            },
          ],
        },
        {
          h: { zh: '瑕疵處理', en: 'Defects' },
          ps: [
            {
              zh: '收到商品如有瑕疵，請於 7 天內拍照並來信 hello@cicidailystudio.com，我們會優先安排換新或修補，運費由我們負擔。',
              en: 'If your piece arrives with a defect, photograph it and email hello@cicidailystudio.com within 7 days. We will replace or repair it first, shipping on us.',
            },
            {
              zh: '手工編織的紋理、色澤與礦石紋路本身略有差異，屬手作特性，不構成瑕疵。',
              en: 'Small variations in weave, colour and stone patterns are the nature of handcraft and do not constitute defects.',
            },
          ],
        },
        {
          h: { zh: '退貨運費與退款', en: 'Return shipping & refunds' },
          ps: [
            {
              zh: '非瑕疵退貨之運費由買方負擔。退款於收到退貨並確認後 7 個工作天內，依原付款方式退回。',
              en: 'Return shipping for non-defect returns is paid by the buyer. Refunds are issued within 7 business days after we receive and inspect the return, via the original payment method.',
            },
          ],
        },
        {
          h: { zh: '馬來西亞訂單', en: 'Malaysia orders' },
          ps: [
            {
              zh: '跨境郵寄成本較高，馬來西亞訂單除瑕疵外恕不接受退換；瑕疵同樣請於 7 天內聯繫，我們會妥善處理。',
              en: 'Due to cross-border shipping, Malaysia orders are not returnable except for defects. For defects, contact us within 7 days and we will make it right.',
            },
          ],
        },
      ]}
    />
  )
}
