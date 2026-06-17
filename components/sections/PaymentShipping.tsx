'use client'

import { useI18n } from '@/lib/i18n'

export function PaymentShipping() {
  const { t } = useI18n()
  return (
    <section className="pay-sec" id="payment">
      <div className="container-x">
        <div className="sec-head pay-head">
          <span className="kicker">{t('付款與寄送', 'Payment & Shipping')}</span>
          <h2 className="serif">
            {t('從台灣或馬來西亞下單', 'Buy from Taiwan or Malaysia')}
          </h2>
        </div>
        <div className="pay-grid">
          <div className="pay-cell">
            <div className="ic">TNG</div>
            <h3 className="serif">TNG eWallet</h3>
            <p>
              {t(
                '下單後顯示 TNG 收款 QR 碼，掃碼用馬幣付款，完成後回傳付款截圖。確認入帳後安排出貨。',
                'After ordering, a TNG QR code will be shown. Scan to pay in MYR, then send the payment screenshot. We ship once verified.'
              )}
            </p>
            <div className="where">{t('馬來西亞', 'Malaysia')}</div>
          </div>
          <div className="pay-cell">
            <div className="ic">{t('匯款', 'TRANSFER')}</div>
            <h3 className="serif">{t('銀行匯款', 'Bank Transfer')}</h3>
            <p>
              {t(
                '下單後系統顯示收款帳號，ATM 或臨櫃轉帳完成後回填末五碼。我們確認入帳後安排出貨。',
                'After placing an order, the bank account will be shown. Complete the transfer via ATM or in-branch, then reply with the last 5 digits to confirm. We ship once verified.'
              )}
            </p>
            <div className="where">{t('台灣', 'Taiwan')}</div>
          </div>
        </div>
        <div className="ship-row">
          <div>
            <b className="serif">{t('台灣', 'Taiwan')}</b>
            <span>{t('運費 NT$60 起．滿 NT$3,000 免運', 'Shipping from NT$60 · Free over NT$3,000')}</span>
          </div>
          <div>
            <b className="serif">{t('馬來西亞', 'Malaysia')}</b>
            <span>
              {t('運費 RM35 起．滿 RM300 免運', 'Shipping from RM35 · Free over RM300')}
            </span>
          </div>
          <div>
            <b className="serif">{t('出貨時間', 'Lead time')}</b>
            <span>
              {t(
                '現貨 48 小時．訂製 3–7 工作天',
                'In stock 48 hrs · Custom 3–7 business days'
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
