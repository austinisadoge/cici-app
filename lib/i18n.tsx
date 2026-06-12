'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Lang = 'zh' | 'en'
export type Currency = 'nt' | 'rm'

interface I18nContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  cur: Currency
  setCur: (c: Currency) => void
  t: (zh: string, en: string) => string
}

const Ctx = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('zh')
  const [cur, setCurState] = useState<Currency>('nt')

  useEffect(() => {
    try {
      const sl = localStorage.getItem('cici-lang') as Lang | null
      const sc = localStorage.getItem('cici-cur') as Currency | null
      if (sl === 'zh' || sl === 'en') setLangState(sl)
      if (sc === 'nt' || sc === 'rm') setCurState(sc)
    } catch {}
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en'
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('cici-lang', l) } catch {}
  }
  const setCur = (c: Currency) => {
    setCurState(c)
    try { localStorage.setItem('cici-cur', c) } catch {}
  }
  const t = (zh: string, en: string) => (lang === 'zh' ? zh : en)

  return (
    <Ctx.Provider value={{ lang, setLang, cur, setCur, t }}>
      {children}
    </Ctx.Provider>
  )
}

export function useI18n() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useI18n must be used within I18nProvider')
  return c
}
