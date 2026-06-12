'use client'

import { useState, FormEvent, use } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useI18n } from '@/lib/i18n'
import { Header } from '@/components/Header'
import { BANK_INFO } from '@/lib/order'

export default function OrderPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = use(params)
  const router = useRouter()
  const search = useSearchParams()
  const { t } = useI18n()
  const paymentMethod = (search.get('p') as 'tng' | 'bank_transfer') || 'bank_transfer'
  const [email, setEmail] = useState('')
  const [last5, setLast5] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch(`/api/orders/${orderNumber}/report-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, last5, notes }),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Failed')
      }
      router.push(`/order/${orderNumber}/success`)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed'
      setError(msg)
      setSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main className="order-wrap">
        <h1 className="serif order-title">{t('訂單成立', 'Order Placed')}</h1>
        <div className="order-number">{orderNumber}</div>
        <div className="order-save-tip">
          {t(
            '怕這頁跳掉？別擔心，確認信已寄到你的信箱，裡面有按鈕可隨時回到這一頁回填付款（如未收到請查看垃圾信匣）。',
            'Worried about losing this page? A confirmation email is in your inbox with a button to return here and report payment anytime (check spam if missing).'
          )}
        </div>

        {paymentMethod === 'bank_transfer' ? (
          <div className="payment-box">
            <div className="kicker">{t('付款資訊．銀行匯款', 'Payment · Bank Transfer')}</div>
            <div className="payment-bank-name">{BANK_INFO.bank}</div>
            {BANK_INFO.holder && (
              <div className="payment-bank-row">{t('戶名', 'Account Holder')}：{BANK_INFO.holder}</div>
            )}
            <div className="payment-bank-row payment-bank-account">
              {t('帳號', 'Account')}：{BANK_INFO.account}
            </div>
            <p className="payment-note">
              {t(
                '請於 ATM 或臨櫃匯款後，回填轉帳末五碼以加速確認。',
                'After ATM or in-branch transfer, fill in the last 5 digits to speed up verification.'
              )}
            </p>
          </div>
        ) : (
          <div className="payment-box">
            <div className="kicker">{t('付款資訊．TNG eWallet', 'Payment · TNG eWallet')}</div>
            <div className="payment-bank-name">TNG QR Code</div>
            {process.env.NEXT_PUBLIC_TNG_QR_URL ? (
              <img
                src={process.env.NEXT_PUBLIC_TNG_QR_URL}
                alt="TNG QR Code"
                className="qr-img"
              />
            ) : (
              <div className="qr-placeholder">QR</div>
            )}
            <p className="payment-note">
              {t(
                '掃描上方 QR 碼用 TNG App 付款，金額為訂單總計（馬幣）。完成後回填末五碼或上傳截圖。',
                'Scan the QR code above with TNG App. Total in MYR. After paying, submit the last 5 digits or upload a screenshot.'
              )}
            </p>
          </div>
        )}

        <form onSubmit={onSubmit} className="report-form">
          <h2 className="form-title">{t('我已付款，回報帳號末五碼', 'Report your payment')}</h2>
          <p className="report-help">
            {paymentMethod === 'bank_transfer'
              ? t(
                  '匯款完成後，填入「您轉出帳號」的後五碼，我們會用它來核對這筆款項。',
                  'After your transfer, enter the last 5 digits of the account you paid FROM. We use it to match your payment.'
                )
              : t(
                  '付款完成後，填入「您 TNG 交易序號」的後五碼，或在備註附上付款截圖連結。',
                  'After paying, enter the last 5 digits of your TNG transaction number, or paste a screenshot link in the notes.'
                )}
          </p>
          <input
            type="email"
            inputMode="email"
            placeholder={t('下單時的 Email（驗證身分用）', 'Email used at checkout (for verification)')}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            inputMode="numeric"
            placeholder={t('帳號 / 交易序號 後五碼', 'Last 5 digits of account / transaction')}
            value={last5}
            onChange={e => setLast5(e.target.value)}
            maxLength={5}
            required
          />
          <textarea
            placeholder={t('備註（選填）', 'Notes (optional)')}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
          />
          {error && <div className="form-error">{error}</div>}
          <button type="submit" className="btn report-submit" disabled={submitting}>
            {submitting ? t('送出中', 'Submitting...') : t('我已付款 →', 'I HAVE PAID →')}
          </button>
        </form>
      </main>
    </>
  )
}
