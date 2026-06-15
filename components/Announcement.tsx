'use client'

import { useI18n } from '@/lib/i18n'
import { BRAND } from '@/lib/brand'

export function Announcement() {
  const { t } = useI18n()
  return (
    <div className="announce">
      {t(BRAND.announcement.zh, BRAND.announcement.en)}
    </div>
  )
}
