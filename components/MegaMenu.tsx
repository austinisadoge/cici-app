'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { SERIES, SERIES_CATEGORIES, categoryById } from '@/lib/products'

export function MegaMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n()
  return (
    <>
      {open && <div className="mega-backdrop" onClick={onClose} />}
      <div className={`mega ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="mega-head">
          <span className="kicker">{t('五大系列', 'Five Series')}</span>
          <button
            type="button"
            className="drawer-close"
            onClick={onClose}
            aria-label={t('關閉選單', 'Close menu')}
          >
            ×
          </button>
        </div>
        <div className="mega-grid">
          {SERIES.map(s => (
            <div key={s.id} className="mega-col">
              <Link
                href={`/shop?series=${s.id}`}
                className="mega-series"
                onClick={onClose}
              >
                <span className="mega-no serif">{s.no}</span>
                <span className="mega-name serif">{t(s.name.zh, s.name.en)}</span>
                <span className="mega-tag">{t(s.tagline.zh, s.tagline.en)}</span>
              </Link>
              <ul className="mega-cats">
                {SERIES_CATEGORIES[s.id].map(cid => {
                  const c = categoryById(cid)
                  return (
                    <li key={cid}>
                      <Link
                        href={`/shop?series=${s.id}&category=${cid}`}
                        onClick={onClose}
                      >
                        {t(c.name.zh, c.name.en)}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="mega-foot">
          <Link href="/shop" className="btn-line" onClick={onClose}>
            {t('查看全部作品 →', 'VIEW ALL PIECES →')}
          </Link>
        </div>
      </div>
    </>
  )
}
