'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

// 漢堡選單＝服務說明中心（業主指定）。系列導覽首頁已有，這裡專放購買前須知。
const SECTIONS: { href: string; zh: string; en: string }[] = [
  { href: '/guide#product-notes', zh: '商品說明', en: 'Product Notes' },
  { href: '/guide#stones', zh: '天然礦石特性說明', en: 'Natural Stones' },
  { href: '/guide#glass', zh: '尼泊爾手工琉璃說明', en: 'Nepalese Handmade Glass' },
  { href: '/guide#care-guide', zh: '保養與配戴建議', en: 'Care & Wearing' },
  { href: '/guide#limited', zh: '限量款說明', en: 'Limited Pieces' },
  { href: '/guide#custom-info', zh: '訂製說明', en: 'Custom Orders' },
  { href: '/guide#returns', zh: '退換貨說明', en: 'Returns & Exchanges' },
  { href: '/guide#service', zh: '客服說明', en: 'Customer Service' },
  { href: '/guide#shipping', zh: '物流說明', en: 'Shipping' },
]

export function MegaMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n()

  return (
    <>
      {open && <div className="drawer-backdrop" onClick={onClose} />}
      <aside className={`menu-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-head">
          <h3 className="serif">{t('服務說明', 'Service Guide')}</h3>
          <button
            type="button"
            className="drawer-close"
            onClick={onClose}
            aria-label={t('關閉選單', 'Close menu')}
          >
            ×
          </button>
        </div>

        <div className="menu-note">
          {t('下單前，邀請你先讀一讀這些說明。', 'Before you order, take a moment to read through.')}
        </div>

        <nav className="menu-list">
          {SECTIONS.map((s, i) => (
            <Link key={s.href} href={s.href} className="menu-link" onClick={onClose}>
              <span className="menu-link-no serif">{String(i + 1).padStart(2, '0')}</span>
              <span className="menu-link-name">{t(s.zh, s.en)}</span>
            </Link>
          ))}
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
