'use client'

import { useState, FormEvent } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'
import { useI18n } from '@/lib/i18n'
import { CATEGORIES } from '@/lib/products'

export default function CustomPage() {
  const { lang, t } = useI18n()
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    country: 'TW',
    category: 'braided-bracelets',
    colors: '',
    stone: '',
    budget: '',
    details: '',
    reference: '',
    website: '', // honeypot
  })

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }))

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const categoryLabel = CATEGORIES.find(c => c.id === form.category)
      const res = await fetch('/api/custom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          category: categoryLabel ? `${categoryLabel.name.zh} / ${categoryLabel.name.en}` : form.category,
          language: lang,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setDone(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed')
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <>
        <Header />
        <main className="checkout-empty">
          <h1 className="serif">{t('收到了！', 'Request received!')}</h1>
          <p>
            {t(
              '客製需求已送出，確認信寄到你的信箱了。匠人會在 1–2 個工作天內回覆，和你討論設計與報價。',
              'Your custom request is in. A confirmation email is on its way. Our artisan will reply within 1–2 business days to discuss the design and quote.'
            )}
          </p>
          <a href="/" className="btn">{t('回到首頁', 'BACK HOME →')}</a>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="checkout-wrap">
        <h1 className="serif checkout-title">{t('客製訂製', 'Custom Order')}</h1>
        <p className="custom-lead">
          {t(
            '告訴我們你想要的色系、品類與想像，匠人為你親手編一件獨一無二的作品。送出後 1–2 個工作天內回覆討論，確認設計與價格後才下單付款。',
            'Tell us your palette, piece and imagination, and our artisan will weave something one-of-a-kind for you. We reply within 1–2 business days; you only order and pay after the design and price are confirmed.'
          )}
        </p>
        <div className="checkout-grid custom-grid">
          <form onSubmit={onSubmit} className="checkout-form">
            <div className="form-section">
              <h2 className="form-title">{t('聯絡方式', 'Contact')}</h2>
              <label className="field">
                <span className="field-label">{t('稱呼 *', 'Name *')}</span>
                <input required placeholder={t('怎麼稱呼你', 'What should we call you')} value={form.name} onChange={set('name')} />
              </label>
              <label className="field">
                <span className="field-label">Email *</span>
                <input required type="email" placeholder={t('回覆討論用', 'For our reply')} value={form.email} onChange={set('email')} />
              </label>
              <input
                tabIndex={-1}
                autoComplete="off"
                name="website"
                value={form.website}
                onChange={set('website')}
                className="hp-field"
                aria-hidden="true"
              />
              <div className="country-grid">
                <button type="button" className={`country-btn ${form.country === 'TW' ? 'on' : ''}`} onClick={() => setForm(f => ({ ...f, country: 'TW' }))}>
                  🇹🇼 {t('台灣', 'Taiwan')}
                </button>
                <button type="button" className={`country-btn ${form.country === 'MY' ? 'on' : ''}`} onClick={() => setForm(f => ({ ...f, country: 'MY' }))}>
                  🇲🇾 {t('馬來西亞', 'Malaysia')}
                </button>
              </div>
            </div>

            <div className="form-section">
              <h2 className="form-title">{t('想做什麼', 'What would you like')}</h2>
              <label className="custom-label">
                {t('品類', 'Type of piece')}
                <select value={form.category} onChange={set('category')}>
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{t(c.name.zh, c.name.en)}</option>
                  ))}
                </select>
              </label>
              <input
                required
                placeholder={t('喜歡的色系 *（例：灰綠、奶茶色、海洋藍）', 'Colours you love * (e.g. sage, milk tea, ocean blue)')}
                value={form.colors}
                onChange={set('colors')}
              />
              <input
                placeholder={t('來料訂製：想帶來的珍藏（玉珮、礦石、吊墜…選填）', 'Re-weave your own piece (jade, stone, pendant… optional)')}
                value={form.stone}
                onChange={set('stone')}
              />
              <label className="custom-label">
                {t('預算範圍', 'Budget')}
                <select value={form.budget} onChange={set('budget')}>
                  <option value="">{t('還不確定', 'Not sure yet')}</option>
                  <option value="NT$1,000 以內">{t('NT$1,000 以內', 'Under NT$1,000')}</option>
                  <option value="NT$1,000–2,000">NT$1,000–2,000</option>
                  <option value="NT$2,000+">{t('NT$2,000 以上', 'NT$2,000+')}</option>
                </select>
              </label>
            </div>

            <div className="form-section">
              <h2 className="form-title">{t('描述你的想像', 'Describe your idea')}</h2>
              <textarea
                required
                rows={5}
                placeholder={t(
                  '想送人還是自己戴？場合？喜歡的感覺？尺寸？都可以寫 *',
                  'A gift or for yourself? The occasion? The feeling you want? Size? Anything helps *'
                )}
                value={form.details}
                onChange={set('details')}
              />
              <input
                placeholder={t('參考圖連結（IG / Pinterest，選填）', 'Reference link (IG / Pinterest, optional)')}
                value={form.reference}
                onChange={set('reference')}
              />
            </div>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="btn checkout-submit" disabled={submitting}>
              {submitting ? t('送出中…', 'Sending…') : t('送出客製需求 →', 'SEND REQUEST →')}
            </button>
          </form>

          <aside className="custom-aside">
            <div className="custom-step"><b className="serif">01</b><span>{t('送出需求，1–2 天內回覆討論', 'Send your idea, we reply in 1–2 days')}</span></div>
            <div className="custom-step"><b className="serif">02</b><span>{t('確認設計與報價，下單付款', 'Confirm design & quote, then order')}</span></div>
            <div className="custom-step"><b className="serif">03</b><span>{t('匠人手工製作，3–7 工作天寄出', 'Handwoven in 3–7 business days, then shipped')}</span></div>
            <img src="/images/model-mustard.jpg" alt="" className="custom-aside-img" />
          </aside>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
