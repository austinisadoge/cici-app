'use client'

import { useI18n } from '@/lib/i18n'

export function Price({ twd, myr }: { twd: number; myr: number }) {
  const { cur } = useI18n()
  if (cur === 'rm') return <div className="price">RM {myr}</div>
  return <div className="price">NT$ {twd.toLocaleString()}</div>
}
