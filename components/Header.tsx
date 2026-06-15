'use client'

import { useState } from 'react'
import { useI18n, type Lang, type Currency } from '@/lib/i18n'
import { useCart } from '@/lib/cart'
import { BRAND } from '@/lib/brand'
import { MegaMenu } from './MegaMenu'

type DD = 'lang' | 'cur' | null

export function Header() {
  const { lang, setLang, cur, setCur, t } = useI18n()
  const { itemCount, toggle } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dd, setDd] = useState<DD>(null)

  const pickLang = (l: Lang) => {
    setLang(l)
    setDd(null)
  }
  const pickCur = (c: Currency) => {
    setCur(c)
    setDd(null)
  }

  return (
    <header className="nav">
      {dd && <div className="nav-dd-backdrop" onClick={() => setDd(null)} />}
      <div className="container-x nav-in">
        <div className="nav-left">
          <a href="/#series">{t('系列', 'SERIES')}</a>
          <a href="/shop?category=braided-bracelets">{t('手繩', 'BRACELETS')}</a>
          <a href="/shop?category=earrings">{t('耳飾', 'EARRINGS')}</a>
          <a href="/#about">{t('理念', 'PHILOSOPHY')}</a>
        </div>
        <a href="/" className="nav-logo">
          {BRAND.name}
          <span className="nav-logo-sub">{BRAND.nameSub}</span>
        </a>
        <div className="nav-right">
          {/* 語言 */}
          <div className="nav-dd">
            <button
              type="button"
              className={`nav-icon-btn ${dd === 'lang' ? 'on' : ''}`}
              onClick={() => setDd(d => (d === 'lang' ? null : 'lang'))}
              aria-label={t('切換語言', 'Language')}
              aria-expanded={dd === 'lang'}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2 a15 15 0 0 1 0 20 a15 15 0 0 1 0 -20" />
              </svg>
            </button>
            {dd === 'lang' && (
              <div className="nav-dd-panel">
                <button type="button" className={lang === 'zh' ? 'on' : ''} onClick={() => pickLang('zh')}>
                  <span>繁體中文</span>
                  {lang === 'zh' && <i>✓</i>}
                </button>
                <button type="button" className={lang === 'en' ? 'on' : ''} onClick={() => pickLang('en')}>
                  <span>English</span>
                  {lang === 'en' && <i>✓</i>}
                </button>
              </div>
            )}
          </div>

          {/* 幣別 */}
          <div className="nav-dd">
            <button
              type="button"
              className={`nav-icon-btn ${dd === 'cur' ? 'on' : ''}`}
              onClick={() => setDd(d => (d === 'cur' ? null : 'cur'))}
              aria-label={t('切換幣別', 'Currency')}
              aria-expanded={dd === 'cur'}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M14.8 9.2c-.6-.8-1.6-1.3-2.8-1.3-1.9 0-3.4 1-3.4 2.3 0 3.4 6.8 1.5 6.8 4.6 0 1.3-1.5 2.3-3.4 2.3-1.2 0-2.2-.5-2.8-1.3" />
                <line x1="12" y1="5.8" x2="12" y2="18.2" />
              </svg>
            </button>
            {dd === 'cur' && (
              <div className="nav-dd-panel">
                <button type="button" className={cur === 'nt' ? 'on' : ''} onClick={() => pickCur('nt')}>
                  <span>NT$ {t('新台幣', 'TWD')}</span>
                  {cur === 'nt' && <i>✓</i>}
                </button>
                <button type="button" className={cur === 'rm' ? 'on' : ''} onClick={() => pickCur('rm')}>
                  <span>RM {t('馬幣', 'MYR')}</span>
                  {cur === 'rm' && <i>✓</i>}
                </button>
              </div>
            )}
          </div>

          {/* 購物袋 */}
          <button
            type="button"
            className="nav-icon-btn bag"
            onClick={toggle}
            aria-label={t('開啟購物袋', 'Open bag')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8h12l-1.2 12.2a1 1 0 0 1-1 .8H8.2a1 1 0 0 1-1-.8L6 8z" />
              <path d="M9 10V7a3 3 0 0 1 6 0v3" />
            </svg>
            {itemCount > 0 && <b className="bag-badge">{itemCount}</b>}
          </button>

          {/* 選單 */}
          <button
            type="button"
            className="nav-burger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={t('開啟選單', 'Open menu')}
            aria-expanded={menuOpen}
          >
            <svg viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <line x1="1" y1="1" x2="17" y2="1" />
              <line x1="1" y1="7" x2="17" y2="7" />
              <line x1="1" y1="13" x2="17" y2="13" />
            </svg>
          </button>
        </div>
      </div>
      <MegaMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
