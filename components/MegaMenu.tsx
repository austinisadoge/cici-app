'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { SERIES, SERIES_CATEGORIES, categoryById } from '@/lib/products'

export function MegaMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n()
  const [expanded, setExpanded] = useState<string | null>(null)
  const toggle = (id: string) => setExpanded(e => (e === id ? null : id))

  return (
    <>
      {open && <div className="drawer-backdrop" onClick={onClose} />}
      <aside className={`menu-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-head">
          <h3 className="serif">{t('選單', 'Menu')}</h3>
          <button
            type="button"
            className="drawer-close"
            onClick={onClose}
            aria-label={t('關閉選單', 'Close menu')}
          >
            ×
          </button>
        </div>

        <nav className="menu-list">
          {SERIES.map(s => {
            const isOpen = expanded === s.id
            return (
              <div key={s.id} className={`menu-item ${isOpen ? 'open' : ''}`}>
                <div className="menu-row">
                  <Link
                    href={`/shop?series=${s.id}`}
                    className="menu-series"
                    onClick={onClose}
                  >
                    <span className="menu-no serif">{s.no}</span>
                    <span className="menu-name serif">{t(s.name.zh, s.name.en)}</span>
                  </Link>
                  <button
                    type="button"
                    className="menu-chevron"
                    onClick={() => toggle(s.id)}
                    aria-expanded={isOpen}
                    aria-label={t('展開分類', 'Expand categories')}
                  >
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 4.5 L6 7.5 L9 4.5" />
                    </svg>
                  </button>
                </div>
                <div className="menu-sub">
                  <div className="menu-sub-inner">
                    {SERIES_CATEGORIES[s.id].map(cid => {
                      const c = categoryById(cid)
                      return (
                        <Link
                          key={cid}
                          href={`/shop?series=${s.id}&category=${cid}`}
                          onClick={onClose}
                        >
                          {t(c.name.zh, c.name.en)}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </nav>

        <div className="menu-foot">
          <Link href="/shop" onClick={onClose}>
            {t('全部作品', 'All Pieces')} →
          </Link>
          <Link href="/custom" onClick={onClose}>
            {t('客製訂製', 'Custom Order')} →
          </Link>
        </div>
      </aside>
    </>
  )
}
