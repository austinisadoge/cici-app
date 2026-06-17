'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useI18n } from '@/lib/i18n'

type Lex = { zh: string; en: string }
type Group = { title: Lex; tags: Lex[] }
const tg = (zh: string, en: string): Lex => ({ zh, en })

// 風格地圖：五大系列各自的意象分類（業主提供，雙語）
const MAP: { series: Lex; groups: Group[] }[] = [
  {
    series: tg('生活風景', 'Living Scenery'),
    groups: [
      { title: tg('天空風景', 'Sky'), tags: [tg('晨曦', 'Dawn'), tg('朝露', 'Morning Dew'), tg('雲朵', 'Clouds'), tg('日照', 'Sunlight'), tg('月光', 'Moonlight'), tg('星辰', 'Stars'), tg('彩虹', 'Rainbow'), tg('霧氣', 'Mist'), tg('細雨', 'Drizzle'), tg('雪景', 'Snow'), tg('閃電', 'Lightning'), tg('微風', 'Breeze')] },
      { title: tg('山川湖海', 'Land & Water'), tags: [tg('山巒', 'Mountains'), tg('河流', 'River'), tg('海洋', 'Ocean'), tg('湖泊', 'Lake'), tg('海岸', 'Coast'), tg('大地', 'Earth'), tg('田野', 'Fields'), tg('草原', 'Grassland'), tg('茶園', 'Tea Garden')] },
      { title: tg('季節與時間', 'Seasons & Time'), tags: [tg('春', 'Spring'), tg('夏', 'Summer'), tg('秋', 'Autumn'), tg('冬', 'Winter'), tg('清晨', 'Morning'), tg('黃昏', 'Dusk'), tg('夜晚', 'Night')] },
      { title: tg('自然現象', 'Natural Phenomena'), tags: [tg('潮汐', 'Tides'), tg('微風', 'Breeze'), tg('流雲', 'Drifting Clouds'), tg('雨滴', 'Raindrops'), tg('光影', 'Light & Shadow'), tg('陰晴圓缺', 'Waxing & Waning')] },
    ],
  },
  {
    series: tg('礦石物語', 'Stone Stories'),
    groups: [
      { title: tg('礦石景觀', 'Mineral Scenery'), tags: [tg('森林', 'Forest'), tg('海浪', 'Waves'), tg('雲霧', 'Clouds & Mist'), tg('麥田', 'Wheat Field'), tg('煙火', 'Fireworks'), tg('星河', 'Galaxy'), tg('地貌', 'Terrain')] },
      { title: tg('礦石紋理', 'Mineral Texture'), tags: [tg('線條', 'Lines'), tg('層次', 'Layers'), tg('纏絲', 'Threads'), tg('斑點', 'Speckles'), tg('色塊', 'Colour Blocks'), tg('裂紋', 'Cracks'), tg('羽毛紋', 'Feather Pattern'), tg('水墨感', 'Ink Wash'), tg('景觀感', 'Scenic'), tg('圖畫感', 'Painterly')] },
      { title: tg('礦石想像', 'Mineral Imagination'), tags: [tg('神話', 'Myth'), tg('精靈', 'Sprites'), tg('魔法', 'Magic'), tg('秘境', 'Wonderland'), tg('夢境', 'Dreamscape'), tg('宇宙', 'Cosmos'), tg('古文明', 'Ancient Civilisation')] },
      { title: tg('魔盒世界', 'Crystal Box World'), tags: [tg('白幽靈', 'White Phantom'), tg('綠幽靈', 'Green Phantom'), tg('草莓晶', 'Strawberry Quartz'), tg('女皇貝', 'Queen Shell'), tg('四季幽靈', 'Four-Season Phantom'), tg('各色水晶', 'Assorted Crystals')] },
    ],
  },
  {
    series: tg('日常拾光', 'Daily Glimmers'),
    groups: [
      { title: tg('日常飲品', 'Drinks'), tags: [tg('咖啡', 'Coffee'), tg('奶茶', 'Milk Tea'), tg('可可', 'Cocoa'), tg('果茶', 'Fruit Tea'), tg('美酒', 'Wine')] },
      { title: tg('風味美食', 'Flavours'), tags: [tg('西點', 'Pastry'), tg('甜點', 'Dessert'), tg('披薩', 'Pizza'), tg('餅乾', 'Cookies'), tg('糖果', 'Candy')] },
      { title: tg('生活小物', 'Little Things'), tags: [tg('書籤', 'Bookmark'), tg('信箋', 'Letter'), tg('香氛', 'Fragrance'), tg('日常用品', 'Everyday Items')] },
      { title: tg('節慶文化', 'Festivals'), tags: [tg('復活節', 'Easter'), tg('端午節', 'Dragon Boat'), tg('中秋節', 'Mid-Autumn'), tg('萬聖節', 'Halloween'), tg('感恩節', 'Thanksgiving'), tg('聖誕節', 'Christmas'), tg('農曆年', 'Lunar New Year')] },
      { title: tg('生活縮影', 'Slices of Life'), tags: [tg('旅行', 'Travel'), tg('休憩', 'Rest'), tg('窗景', 'Window View'), tg('市集', 'Market'), tg('咖啡館', 'Café'), tg('特色小店', 'Boutiques')] },
    ],
  },
  {
    series: tg('祝福小物', 'Little Blessings'),
    groups: [
      { title: tg('平安守護', 'Protection'), tags: [tg('葫蘆', 'Gourd'), tg('御守', 'Amulet'), tg('吉祥物', 'Mascot'), tg('守護獸', 'Guardian Beast'), tg('各方神明', 'Deities'), tg('宗教小物', 'Sacred Charms')] },
      { title: tg('吉祥寓意', 'Auspicious Meaning'), tags: [tg('平安', 'Peace'), tg('招財', 'Wealth'), tg('納福', 'Fortune'), tg('護身', 'Safekeeping'), tg('豐收', 'Harvest'), tg('團圓', 'Reunion'), tg('喜樂', 'Joy')] },
      { title: tg('心願與祝福', 'Wishes & Blessings'), tags: [tg('鼓勵', 'Encouragement'), tg('勇氣', 'Courage'), tg('堅韌', 'Resilience'), tg('耐力', 'Endurance'), tg('堅持', 'Perseverance')] },
    ],
  },
  {
    series: tg('生命力量', 'Living Force'),
    groups: [
      { title: tg('森林植物', 'Forest Plants'), tags: [tg('樹木', 'Trees'), tg('葉子', 'Leaves'), tg('藤蔓', 'Vines'), tg('花朵', 'Flowers'), tg('麥穗', 'Wheat Ears'), tg('秋葉', 'Autumn Leaves'), tg('新芽', 'Sprouts'), tg('種子', 'Seeds'), tg('果實', 'Fruit')] },
      { title: tg('動物昆蟲', 'Animals & Insects'), tags: [tg('蝴蝶', 'Butterfly'), tg('蜜蜂', 'Bee'), tg('小鳥', 'Bird'), tg('蝸牛', 'Snail'), tg('青蛙', 'Frog'), tg('烏龜', 'Turtle'), tg('守宮', 'Gecko'), tg('瓢蟲', 'Ladybug'), tg('森林動物', 'Forest Animals')] },
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
          <section key={s.series.en} className="smap-series">
            <h2 className="serif">{t(s.series.zh, s.series.en)}</h2>
            {s.groups.map(g => (
              <div key={g.title.en} className="smap-group">
                <div className="smap-group-title">{t(g.title.zh, g.title.en)}</div>
                <div className="smap-tags">
                  {g.tags.map(tag => (
                    <span key={tag.en} className="smap-tag">{t(tag.zh, tag.en)}</span>
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
