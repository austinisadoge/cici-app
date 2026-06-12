'use client'

import { useState } from 'react'
import { useI18n } from '@/lib/i18n'
import { useCart } from '@/lib/cart'
import { MegaMenu } from './MegaMenu'

export function Header() {
  const { lang, setLang, cur, setCur, t } = useI18n()
  const { itemCount, toggle } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="nav">
      <div className="container-x nav-in">
        <div className="nav-left">
          <a href="/#series">{t('系列', 'SERIES')}</a>
          <a href="/#bracelets">{t('手繩', 'BRACELETS')}</a>
          <a href="/#earrings">{t('耳飾', 'EARRINGS')}</a>
          <a href="/#about">{t('理念', 'PHILOSOPHY')}</a>
        </div>
        <a href="/" className="nav-logo">
          CiCi
          <span className="nav-logo-sub">DAILY STUDIO</span>
        </a>
        <div className="nav-right">
          <div className="lang-switch" title="Switch language">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2 a15 15 0 0 1 0 20 a15 15 0 0 1 0 -20" />
            </svg>
            <span
              className={`lang-pill ${lang === 'zh' ? 'on' : ''}`}
              onClick={() => setLang('zh')}
            >
              繁
            </span>
            <span className="lang-divider">／</span>
            <span
              className={`lang-pill ${lang === 'en' ? 'on' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </span>
          </div>
          <div className="cur-switch">
            <span
              className={`cur-pill ${cur === 'nt' ? 'on' : ''}`}
              onClick={() => setCur('nt')}
            >
              NT$
            </span>
            <span className="lang-divider">／</span>
            <span
              className={`cur-pill ${cur === 'rm' ? 'on' : ''}`}
              onClick={() => setCur('rm')}
            >
              RM
            </span>
          </div>
          <span className="nav-action">{t('搜尋', 'SEARCH')}</span>
          <button
            type="button"
            className="nav-action bag"
            onClick={toggle}
            aria-label={t('開啟購物袋', 'Open bag')}
          >
            <span className="bag-text">{t('購物袋', 'BAG')}</span>
            <svg
              className="bag-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 8h12l-1.2 12.2a1 1 0 0 1-1 .8H8.2a1 1 0 0 1-1-.8L6 8z" />
              <path d="M9 10V7a3 3 0 0 1 6 0v3" />
            </svg>
            {itemCount > 0 && <b className="bag-badge">{itemCount}</b>}
          </button>
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
