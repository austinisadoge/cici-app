'use client'

import { useState, FormEvent } from 'react'
import { useI18n } from '@/lib/i18n'
import { pixelSubscribe } from '@/lib/fbpixel'

export function Newsletter() {
  const { lang, t } = useI18n()
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setState('sending')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, language: lang }),
      })
      if (!res.ok) throw new Error('failed')
      pixelSubscribe()
      setState('done')
      setEmail('')
    } catch {
      setState('error')
    }
  }

  return (
    <section className="news">
      <div className="container-x">
        <h2 className="serif">
          {t('月兩封，安靜的信。', 'Quiet letters, twice a month.')}
        </h2>
        <p>
          {t(
            '新品、補貨、工作室筆記。沒有噪音，只有手作。',
            'New pieces, restocks, and notes from the studio. No noise, only craft.'
          )}
        </p>
        {state === 'done' ? (
          <div className="news-done">
            {t('訂閱成功，期待與你分享下一件作品 ✓', 'Subscribed. The next piece will find you ✓')}
          </div>
        ) : (
          <form className="news-form" onSubmit={onSubmit}>
            <input
              type="email"
              required
              placeholder={t('你的 Email', 'Your email address')}
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={state === 'sending'}
            />
            <button type="submit" disabled={state === 'sending'}>
              {state === 'sending' ? t('送出中…', 'Sending…') : t('訂閱 →', 'Subscribe →')}
            </button>
          </form>
        )}
        {state === 'error' && (
          <div className="news-error">
            {t('出了點問題，請再試一次。', 'Something went wrong, please try again.')}
          </div>
        )}
      </div>
    </section>
  )
}
