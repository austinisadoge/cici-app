'use client'

import { useI18n } from '@/lib/i18n'

export function EditorialSection() {
  const { lang, t } = useI18n()
  return (
    <section className="editorial" id="about">
      <div className="container-x">
        <div className="ed-grid">
          <div className="ed-img" />
          <div>
            <span className="kicker">{t('品牌理念', 'Our Philosophy')}</span>
            <h2 className="serif">
              {lang === 'zh' ? (
                <>
                  那些讓妳駐足、微笑<br />與感動的片刻。
                </>
              ) : (
                <>
                  The moments that make<br />you pause and smile.
                </>
              )}
            </h2>
            <p>
              {t(
                '透過編織、針線、顏料等多元化的創作媒材，收藏生活中的風景，是 CiCi 看待世界的方式。生活中某天當下的心情，那些能讓妳駐足、微笑、想像與感動的美好片刻，皆是創作靈感的泉源。',
                'Collecting the sceneries of life through weaving, needlework and paint. This is how CiCi sees the world. The moments that make you pause, smile, imagine and feel, they are where every piece begins.'
              )}
            </p>
            <p>
              {t(
                '將自然色彩、天然素材與礦石紋理所蘊藏的獨特風景，結合多樣式的手作技巧，一件一件慢慢地化為獨一無二的手工作品。願每一份喜歡，都能在某個瞬間，與自己溫柔的對話、與另一顆心產生共鳴。',
                'Natural colours, organic materials and the landscapes hidden inside mineral stones, slowly transformed by hand into one-of-a-kind works. May every piece you love become a gentle conversation with yourself, and a quiet resonance with another heart.'
              )}
            </p>
            <div className="sig">{t('——CiCi Daily Studio．於台灣', '— CiCi Daily Studio, Taiwan')}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
