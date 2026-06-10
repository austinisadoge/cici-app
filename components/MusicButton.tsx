'use client'

import { useState } from 'react'
import { useI18n } from '@/lib/i18n'

export function MusicButton() {
  const { t } = useI18n()
  const [playing, setPlaying] = useState(false)
  return (
    <button
      className={`music-toggle ${playing ? 'playing' : ''}`}
      onClick={() => setPlaying(p => !p)}
      aria-label={t('切換背景音樂', 'Toggle ambient music')}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
      <span className="wave">
        <i />
        <i />
        <i />
      </span>
      <span className="music-tip">{t('輕音樂', 'Ambient')}</span>
    </button>
  )
}
