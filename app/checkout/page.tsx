'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/lib/i18n'
import { useCart } from '@/lib/cart'
import { calcShipping } from '@/lib/shipping'
import { Header } from '@/components/Header'

export default function CheckoutPage() {
  const router = useRouter()
  const { lang, t, setCur } = useI18n()
  const { items, subtotal, clear } = useCart()
  const [country, setCountry] = useState<'TW' | 'MY'>('TW')
  const [paymentMethod, setPaymentMethod] = useState<'tng' | 'bank_transfer'>('bank_transfer')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    shipping_zip: '',
    customer_notes: '',
  })

  useEffect(() => {
    if (country === 'MY') {
      setPaymentMethod('tng')
      setCur('rm')
    } else {
      setPaymentMethod('bank_transfer')
      setCur('nt')
    }
  }, [country, setCur])

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="checkout-empty">
          <h1 className="serif">{t('購物袋是空的', 'Your bag is empty')}</h1>
          <p>{t('先去逛逛吧。', 'Browse the collection to add something.')}</p>
          <a href="/" className="btn">{t('回到首頁', 'BACK HOME →')}</a>
        </main>
      </>
    )
  }

  const sub = country === 'MY' ? subtotal.myr : subtotal.twd
  const shipping = calcShipping(country === 'MY' ? 'rm' : 'nt', sub)
  const total = sub + shipping
  const symbol = country === 'MY' ? 'RM' : 'NT$'

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          shipping_country: country,
          payment_method: paymentMethod,
          items: items.map(i => ({ productId: i.productId, quantity: i.quantity })),
          language: lang,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create order')
      clear()
      router.push(`/order/${data.orderNumber}?p=${paymentMethod}`)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed'
      setError(msg)
      setSubmitting(false)
    }
  }

  const handle = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <>
      <Header />
      <main className="checkout-wrap">
        <h1 className="serif checkout-title">{t('結帳', 'Checkout')}</h1>
        <div className="checkout-grid">
          <form onSubmit={onSubmit} className="checkout-form">
            <div className="form-section">
              <h2 className="form-title">{t('收件地區', 'Shipping to')}</h2>
              <div className="country-grid">
                <button type="button" className={`country-btn ${country === 'TW' ? 'on' : ''}`} onClick={() => setCountry('TW')}>
                  🇹🇼 {t('台灣', 'Taiwan')}
                </button>
                <button type="button" className={`country-btn ${country === 'MY' ? 'on' : ''}`} onClick={() => setCountry('MY')}>
                  🇲🇾 {t('馬來西亞', 'Malaysia')}
                </button>
              </div>
            </div>

            <div className="form-section">
              <h2 className="form-title">{t('聯絡資訊', 'Contact')}</h2>
              <input required type="email" placeholder="Email *" value={form.customer_email} onChange={handle('customer_email')} />
              <input required placeholder={t('姓名 *', 'Full name *')} value={form.customer_name} onChange={handle('customer_name')} />
              <input placeholder={t('電話', 'Phone')} value={form.customer_phone} onChange={handle('customer_phone')} />
            </div>

            <div className="form-section">
              <h2 className="form-title">{t('收件地址', 'Shipping address')}</h2>
              <textarea required placeholder={t('完整地址 *', 'Full address *')} value={form.shipping_address} onChange={handle('shipping_address')} rows={3} />
              <input placeholder={t('郵遞區號', 'Postal code')} value={form.shipping_zip} onChange={handle('shipping_zip')} />
            </div>

            <div className="form-section">
              <h2 className="form-title">{t('付款方式', 'Payment')}</h2>
              {country === 'TW' ? (
                <div className="payment-option on">
                  <div className="payment-name">{t('銀行匯款', 'Bank Transfer')}</div>
                  <div className="payment-meta">{t('下單後顯示帳號，匯款後回填末五碼。', 'Account shown after order. Reply with last 5 digits.')}</div>
                </div>
              ) : (
                <div className="payment-option on">
                  <div className="payment-name">TNG eWallet</div>
                  <div className="payment-meta">{t('下單後顯示 QR 碼，掃碼用馬幣付款。', 'QR code shown after order. Scan to pay in MYR.')}</div>
                </div>
              )}
            </div>

            <div className="form-section">
              <h2 className="form-title">{t('備註（選填）', 'Notes (optional)')}</h2>
              <textarea placeholder={t('客製需求、特殊配送指示等', 'Custom requests, special delivery instructions, etc.')} value={form.customer_notes} onChange={handle('customer_notes')} rows={3} />
            </div>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="btn checkout-submit" disabled={submitting}>
              {submitting
                ? t('處理中...', 'Processing...')
                : t(`下單　${symbol} ${total.toLocaleString()}`, `PLACE ORDER　${symbol} ${total.toLocaleString()}`)}
            </button>
          </form>

          <aside className="checkout-summary">
            <h2 className="form-title">{t('訂單明細', 'Order summary')}</h2>
            <div className="summary-items">
              {items.map(it => {
                const unit = country === 'MY' ? it.price.myr : it.price.twd
                return (
                  <div key={it.productId} className="summary-item">
                    <img src={it.image} alt="" />
                    <div className="summary-item-body">
                      <div className="summary-item-name">{t(it.name.zh, it.name.en)}</div>
                      <div className="summary-item-meta">× {it.quantity}</div>
                    </div>
                    <div className="summary-item-price">{symbol} {(unit * it.quantity).toLocaleString()}</div>
                  </div>
                )
              })}
            </div>
            <div className="summary-rows">
              <div className="summary-row">
                <span>{t('小計', 'Subtotal')}</span>
                <span>{symbol} {sub.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>{t('運費', 'Shipping')}</span>
                <span>{shipping === 0 ? t('免運', 'Free') : `${symbol} ${shipping}`}</span>
              </div>
              <div className="summary-row summary-total">
                <span>{t('總計', 'Total')}</span>
                <span className="serif">{symbol} {total.toLocaleString()}</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  )
}
