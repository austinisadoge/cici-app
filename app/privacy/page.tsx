'use client'

import { LegalLayout } from '@/components/LegalLayout'

export default function PrivacyPage() {
  return (
    <LegalLayout
      title={{ zh: '隱私權政策', en: 'Privacy Policy' }}
      updated="2026-06-12"
      sections={[
        {
          h: { zh: '我們收集什麼', en: 'What we collect' },
          ps: [
            {
              zh: '下單時的姓名、Email、電話與收件地址，以及訂單內容。訂閱電子報時的 Email。客製詢問時您主動提供的需求描述。',
              en: 'Your name, email, phone and shipping address when ordering, plus order contents. Your email when subscribing to our letters. Details you share when requesting a custom piece.',
            },
          ],
        },
        {
          h: { zh: '我們怎麼使用', en: 'How we use it' },
          ps: [
            {
              zh: '僅用於訂單處理、出貨與到貨通知、回覆您的詢問，以及（若您訂閱）寄送工作室通訊。我們不出售您的資料，也不提供給第三方做行銷。',
              en: 'Only to process orders, ship and notify you, answer your inquiries, and (if subscribed) send studio letters. We never sell your data or share it for third-party marketing.',
            },
          ],
        },
        {
          h: { zh: '資料存放在哪', en: 'Where it lives' },
          ps: [
            {
              zh: '網站架設於 Vercel，訂單資料儲存於 Supabase，通知信由 Resend 寄送，均為業界標準服務商並採加密傳輸。',
              en: 'The site runs on Vercel, order data is stored in Supabase, and emails are sent via Resend — industry-standard providers with encrypted transport.',
            },
          ],
        },
        {
          h: { zh: 'Cookie', en: 'Cookies' },
          ps: [
            {
              zh: '僅使用必要的本機儲存：記住您的語言、幣別偏好與購物袋內容。沒有廣告追蹤。',
              en: 'We only use essential local storage: your language, currency preference and bag contents. No ad tracking.',
            },
          ],
        },
        {
          h: { zh: '您的權利', en: 'Your rights' },
          ps: [
            {
              zh: '您可隨時來信 hello@cicidailystudio.com 查詢、更正或刪除您的個人資料，我們會於 14 天內處理。',
              en: 'Email hello@cicidailystudio.com anytime to access, correct or delete your personal data. We will act within 14 days.',
            },
          ],
        },
      ]}
    />
  )
}
