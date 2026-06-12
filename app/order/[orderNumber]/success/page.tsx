'use client'

import { use } from 'react'
import { useI18n } from '@/lib/i18n'
import { Header } from '@/components/Header'

export default function OrderSuccess({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = use(params)
  const { t } = useI18n()
  return (
    <>
      <Header />
      <main className="success-wrap">
        <div className="success-check">✓</div>
        <h1 className="serif success-title">{t('感謝你', 'Thank you')}</h1>
        <p className="success-text">
          {t(
            '我們收到你的付款回報。確認入帳後會立刻安排出貨，並寄信通知你。',
            "We've received your payment report. Once verified, we'll prepare your order for shipping and notify you by email."
          )}
        </p>
        <div className="success-number">{orderNumber}</div>
        <div className="order-save-tip">
          {t(
            '建議截圖保存訂單編號，方便日後查詢。',
            'Screenshot your order number for future reference.'
          )}
        </div>
        <a href="/" className="btn success-back">{t('繼續逛逛', 'CONTINUE SHOPPING')}</a>
      </main>
    </>
  )
}
