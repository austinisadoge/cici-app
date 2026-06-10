'use client'

import { useI18n } from '@/lib/i18n'

export function Announcement() {
  const { t } = useI18n()
  return (
    <div className="announce">
      {t(
        '滿 NT$1,500 免運．從台灣寄送全球',
        'Free shipping over NT$1,500 · Worldwide delivery from Taiwan'
      )}
    </div>
  )
}
