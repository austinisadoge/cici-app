'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useI18n } from '@/lib/i18n'

// 作品索引（業主提供）。作品名保留中文，系列與品類雙語。
const SERIES_EN: Record<string, string> = {
  '生活風景': 'Living Scenery', '礦石物語': 'Stone Stories', '日常拾光': 'Daily Glimmers',
  '祝福小物': 'Little Blessings', '生命力量': 'Living Force',
}
const TYPE_EN: Record<string, string> = {
  '手繩': 'Braided Bracelet', '手鍊': 'Chain Bracelet', '手串': 'Beaded Bracelet',
  '項鍊': 'Necklace', '耳飾': 'Earrings', '掛飾': 'Charm', '擺飾': 'Decor',
  '扇箍': 'Fan Band', '包掛飾': 'Bag Charm', '包·車掛飾': 'Bag / Car Charm',
  '車掛飾': 'Car Charm', '門掛飾': 'Door Charm',
}

type Work = { name: string; type: string; display?: boolean }
const WORKS: { series: string; items: Work[] }[] = [
  {
    series: '生活風景',
    items: [
      { name: '雲河', type: '手繩' }, { name: '晨霧茶園', type: '手繩' }, { name: '海岸綠野', type: '手繩' },
      { name: '靜海深藍', type: '手繩' }, { name: '磷波點點', type: '手繩' }, { name: '銀露晨曦', type: '手繩' },
      { name: '山畔青禾', type: '手繩' }, { name: '斜陽映影', type: '手繩' }, { name: '星河映夢', type: '手繩' },
      { name: '潮汐之律', type: '手繩' }, { name: '曙光之環', type: '手繩' }, { name: '潮澗時光', type: '手繩' },
      { name: '晨曦映山', type: '手繩' }, { name: '靜海之網', type: '手繩' }, { name: '逐浪之心', type: '手繩' },
      { name: '雲天變奏曲', type: '手繩' }, { name: '自然色章（共八色）', type: '手繩' },
    ],
  },
  {
    series: '礦石物語',
    items: [
      { name: '紅湖', type: '手繩' }, { name: '水晶魔盒 ×30', type: '手鍊' }, { name: '玫瑰湖', type: '手串' },
      { name: '東大門', type: '手串' }, { name: '地球儀', type: '項鍊' }, { name: '拜倫灣', type: '項鍊' },
      { name: '宼科利夫', type: '項鍊' },
    ],
  },
  {
    series: '日常拾光',
    items: [
      { name: '米蘭蘇', type: '耳飾' }, { name: '金綠樹', type: '耳飾' },
      { name: '環語 01／02／03', type: '耳飾' }, { name: '直徑 01／02', type: '耳飾' },
      { name: '雙珠 01／02／03', type: '耳飾' }, { name: '幾何方珠 01／02／03', type: '耳飾' },
      { name: '苔影 01／02', type: '耳飾' }, { name: '金冠 01／02', type: '耳飾' },
      { name: '花座 01／02', type: '耳飾' }, { name: '宮廷棕', type: '耳飾' }, { name: '旋織藍', type: '耳飾' },
      { name: '花金簪', type: '手繩' }, { name: '櫻色信箋', type: '手繩' }, { name: '迴旋之舞', type: '手繩' },
      { name: '躍金之律', type: '手繩' }, { name: '緋戀之織', type: '手繩' }, { name: '粽影龍舟', type: '手繩' },
      { name: '甜甜湯時光', type: '手鍊' }, { name: '瑪格麗特披薩', type: '手鍊' }, { name: '奶茶', type: '手繩' },
      { name: '紅茶', type: '項鍊' }, { name: '卡布奇諾', type: '項鍊' }, { name: '焦糖巧克力', type: '項鍊' },
      { name: '白色俄羅斯', type: '項鍊' }, { name: '冬日層次穿搭葫蘆組（×7）', type: '擺飾' },
      { name: '萬聖小南瓜', type: '掛飾', display: true }, { name: '萬聖小蜘蛛', type: '手繩', display: true },
    ],
  },
  {
    series: '祝福小物',
    items: [
      { name: '峰與谷', type: '手繩' }, { name: '迴迴錦', type: '手繩' }, { name: '天使之翼', type: '手繩' },
      { name: '聖光之翼', type: '手繩' }, { name: '花生滿路', type: '手繩' }, { name: '藤生之力', type: '手繩' },
      { name: '雄鷹之翼', type: '手繩' }, { name: '啟動紫頻', type: '手繩' }, { name: '柔光禮讚', type: '手繩' },
      { name: '無限可能', type: '手繩' }, { name: '循環之織', type: '手繩' }, { name: '雙心同織', type: '手繩' },
      { name: '生命旋律', type: '手繩' }, { name: '護法紋章', type: '扇箍' },
      { name: '葫蘆福守 銀霜／桃光／山霽／瑞金／櫻霧／山青／琥棕', type: '包掛飾' },
      { name: '葫蘆福守 藏藍／紅彤／棕金', type: '包·車掛飾' },
      { name: '小仙葫 清涼風／元氣風', type: '車掛飾' },
      { name: '小葉抱抱葫 紫／棕', type: '門掛飾' },
      { name: '小月餅', type: '掛飾', display: true }, { name: '小白菜', type: '掛飾', display: true },
      { name: '蝴蝶葫蘆 ×6', type: '擺飾' }, { name: '保庇保庇 ×6', type: '擺飾' },
      { name: '五福蛇', type: '擺飾', display: true },
    ],
  },
  {
    series: '生命力量',
    items: [
      { name: '櫻瓣綻歌', type: '手繩' }, { name: '玫麗花廊', type: '手繩' }, { name: '林間花徑', type: '手繩' },
      { name: '風中葉語', type: '手繩' }, { name: '再生之章', type: '手繩' }, { name: '秋陽之狐', type: '手繩' },
      { name: '琉光花結', type: '手繩' }, { name: '陽光麥田', type: '手繩' }, { name: '綠藤金果', type: '手繩' },
      { name: '靜紫之環', type: '手繩' }, { name: '翩紫之詩', type: '手繩' }, { name: '花開引蝶', type: '手繩' },
      { name: '紫丁香之願', type: '手繩' }, { name: '彩色的季節', type: '手繩' },
      { name: '穗光頌 金穗／夜穗／青穗／春穗', type: '手鍊' },
      { name: '木雕玫瑰 藍／黃', type: '包掛飾' }, { name: '沉香玫瑰 紫／咖', type: '包掛飾' },
      { name: '萌萌生態園葫蘆組（×7）', type: '擺飾' },
      { name: '蝴蝶標本王國', type: '擺飾', display: true }, { name: '可愛小狐狸', type: '擺飾', display: true },
    ],
  },
]

export default function WorksPage() {
  const { t } = useI18n()
  return (
    <>
      <Header />
      <main className="content-wrap content-wide">
        <span className="kicker">{t('作品索引', 'Works Index')}</span>
        <h1 className="serif">{t('一件一件，慢慢編成', 'Woven one by one')}</h1>
        <p className="content-intro">
          {t(
            '這是 CiCi 目前的作品全覽。標「僅供展示」者為展示作品，不對外販售。想購買的款式，可在商品頁或私訊我們詢問。',
            'A full view of CiCi’s works. Items marked “display only” are not for sale. To purchase, browse the shop or message us.'
          )}
        </p>
        {WORKS.map(w => (
          <section key={w.series} className="works-series">
            <h2 className="serif">{t(w.series, SERIES_EN[w.series] ?? w.series)}</h2>
            <ul className="works-list">
              {w.items.map(it => (
                <li key={it.name}>
                  <span className="works-name">{it.name}</span>
                  <span className="works-type">
                    {t(it.type, TYPE_EN[it.type] ?? it.type)}
                    {it.display ? t('．僅供展示', ' · display only') : ''}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
      <Footer />
    </>
  )
}
