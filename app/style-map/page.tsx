'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useI18n } from '@/lib/i18n'

// 風格地圖：五大系列各自的意象分類（業主提供）
const MAP: { series: string; groups: { title: string; tags: string[] }[] }[] = [
  {
    series: '生活風景',
    groups: [
      { title: '天空風景', tags: ['晨曦', '朝露', '雲朵', '日照', '月光', '星辰', '彩虹', '霧氣', '細雨', '雪景', '閃電', '微風'] },
      { title: '山川湖海', tags: ['山巒', '河流', '海洋', '湖泊', '海岸', '大地', '田野', '草原', '茶園'] },
      { title: '季節與時間', tags: ['春', '夏', '秋', '冬', '清晨', '黃昏', '夜晚'] },
      { title: '自然現象', tags: ['潮汐', '微風', '流雲', '雨滴', '光影', '陰晴圓缺'] },
    ],
  },
  {
    series: '礦石物語',
    groups: [
      { title: '礦石景觀', tags: ['森林', '海浪', '雲霧', '麥田', '煙火', '星河', '地貌'] },
      { title: '礦石紋理', tags: ['線條', '層次', '纏絲', '斑點', '色塊', '裂紋', '羽毛紋', '水墨感', '景觀感', '圖畫感'] },
      { title: '礦石想像', tags: ['神話', '精靈', '魔法', '秘境', '夢境', '宇宙', '古文明'] },
      { title: '魔盒世界', tags: ['白幽靈', '綠幽靈', '草莓晶', '女皇貝', '四季幽靈', '各色水晶'] },
    ],
  },
  {
    series: '日常拾光',
    groups: [
      { title: '日常飲品', tags: ['咖啡', '奶茶', '可可', '果茶', '美酒'] },
      { title: '風味美食', tags: ['西點', '甜點', '披薩', '餅乾', '糖果'] },
      { title: '生活小物', tags: ['書籤', '信箋', '香氛', '日常用品'] },
      { title: '節慶文化', tags: ['復活節', '端午節', '中秋節', '萬聖節', '感恩節', '聖誕節', '農曆年'] },
      { title: '生活縮影', tags: ['旅行', '休憩', '窗景', '市集', '咖啡館', '特色小店'] },
    ],
  },
  {
    series: '祝福小物',
    groups: [
      { title: '平安守護', tags: ['葫蘆', '御守', '吉祥物', '守護獸', '各方神明', '宗教小物'] },
      { title: '吉祥寓意', tags: ['平安', '招財', '納福', '護身', '豐收', '團圓', '喜樂'] },
      { title: '心願與祝福', tags: ['鼓勵', '勇氣', '堅韌', '耐力', '堅持'] },
    ],
  },
  {
    series: '生命力量',
    groups: [
      { title: '森林植物', tags: ['樹木', '葉子', '藤蔓', '花朵', '麥穗', '秋葉', '新芽', '種子', '果實'] },
      { title: '動物昆蟲', tags: ['蝴蝶', '蜜蜂', '小鳥', '蝸牛', '青蛙', '烏龜', '守宮', '瓢蟲', '森林動物'] },
    ],
  },
]

export default function StyleMapPage() {
  const { t } = useI18n()
  return (
    <>
      <Header />
      <main className="content-wrap content-wide">
        <span className="kicker">{t('風格地圖', 'Style Map')}</span>
        <h1 className="serif">{t('每件作品，都是一種想像', 'Every piece, a small imagination')}</h1>
        <p className="content-intro">
          {t(
            '我們從生活與自然中取材，把這些意象化為可佩戴的風景。下面是 CiCi 創作的靈感地圖。',
            'We draw from life and nature, turning these images into wearable landscapes. Below is the map of imagination behind CiCi.'
          )}
        </p>
        {MAP.map(s => (
          <section key={s.series} className="smap-series">
            <h2 className="serif">{s.series}</h2>
            {s.groups.map(g => (
              <div key={g.title} className="smap-group">
                <div className="smap-group-title">{g.title}</div>
                <div className="smap-tags">
                  {g.tags.map(tag => (
                    <span key={tag} className="smap-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}
      </main>
      <Footer />
    </>
  )
}
