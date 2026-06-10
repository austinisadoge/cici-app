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
            <span className="kicker">{t('我們的故事', 'Our Story')}</span>
            <h2 className="serif">
              {lang === 'zh' ? (
                <>
                  一根繩，一顆石，<br />一生的手藝。
                </>
              ) : (
                <>
                  A strand, a stone,<br />a lifetime of craft.
                </>
              )}
            </h2>
            <p>
              {t(
                'CiCi 不只是品牌，更是一種工序。從選線、配色、纏繞、打結，到鑲嵌寶石，每一步都由匠人在台灣手工完成。沒有機器、沒有捷徑，一件作品平均要花六到十二小時。',
                'CiCi is not only a brand, but a process. From selecting threads and layering colours, to knotting and setting the stone, every step is finished by hand in a Taipei studio. No machines, no shortcuts. A single piece takes six to twelve hours to complete.'
              )}
            </p>
            <p>
              {t(
                '我們相信，當作品花了這麼多時間誕生，戴上它的人會感覺得到。從台灣寄出，送到台灣與馬來西亞，到每一位珍惜手作的人手上。',
                'We believe that when a piece takes this much time to come into the world, the wearer can feel it. Shipped from Taiwan to Taiwan and Malaysia, into the hands of those who value the slow craft.'
              )}
            </p>
            <div className="sig">{t('——CiCi．於台灣', '— CiCi, Taiwan')}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
