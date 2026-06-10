'use client'

import { FormEvent } from 'react'
import { useI18n } from '@/lib/i18n'

export function Newsletter() {
  const { t } = useI18n()
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
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
        <form className="news-form" onSubmit={onSubmit}>
          <input
            type="email"
            placeholder={t('你的 Email', 'Your email address')}
          />
          <button type="submit">{t('訂閱 →', 'Subscribe →')}</button>
        </form>
      </div>
    </section>
  )
}
