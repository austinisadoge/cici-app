'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

const CELLS = [
  { href: '/about', zh: '品牌故事', en: 'Our Story' },
  { href: '/advantages', zh: '品牌優勢', en: 'Why Us' },
  { href: '/style-map', zh: '風格地圖', en: 'Style Map' },
  { href: '/design', zh: '設計架構', en: 'Design' },
  { href: '/works', zh: '作品索引', en: 'Works' },
]

export function FiveBanner() {
  const { t } = useI18n()
  return (
    <nav className="five-banner" aria-label="品牌導覽">
      {CELLS.map(c => (
        <Link key={c.href} href={c.href} className="five-cell">
          {t(c.zh, c.en)}
        </Link>
      ))}
    </nav>
  )
}
