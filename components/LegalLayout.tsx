'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useI18n } from '@/lib/i18n'

export type LegalSection = {
  h: { zh: string; en: string }
  ps: { zh: string; en: string }[]
}

export function LegalLayout({
  title,
  updated,
  sections,
}: {
  title: { zh: string; en: string }
  updated: string
  sections: LegalSection[]
}) {
  const { t } = useI18n()
  return (
    <>
      <Header />
      <main className="legal-wrap">
        <h1 className="serif">{t(title.zh, title.en)}</h1>
        <div className="legal-updated">
          {t(`最後更新：${updated}`, `Last updated: ${updated}`)}
        </div>
        {sections.map((s, i) => (
          <section key={i} className="legal-sec">
            <h2>{t(s.h.zh, s.h.en)}</h2>
            {s.ps.map((p, j) => (
              <p key={j}>{t(p.zh, p.en)}</p>
            ))}
          </section>
        ))}
        <div className="legal-contact">
          {t(
            '任何問題，歡迎來信 hello@cicidailystudio.com 或透過 Instagram @cicidailyjewelry 聯繫。',
            'Questions? Reach us at hello@cicidailystudio.com or on Instagram @cicidailyjewelry.'
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
