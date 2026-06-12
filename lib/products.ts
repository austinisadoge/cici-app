export type SeriesId =
  | 'living-scenery'
  | 'stone-stories'
  | 'daily-glimmers'
  | 'little-blessings'
  | 'living-force'

export type CategoryId =
  | 'earrings'
  | 'braided-bracelets'
  | 'chain-bracelets'
  | 'beaded-bracelets'
  | 'necklaces'
  | 'anklets'
  | 'hanging-charms'
  | 'decor'
  | 'little-things'
  | 'paintings'
  | 'diamond-paintings'
  | 'cross-stitch'
  | 'embroidery'

export type Series = {
  id: SeriesId
  no: string
  name: { zh: string; en: string }
  tagline: { zh: string; en: string }
  description: { zh: string; en: string }
}

export const SERIES: Series[] = [
  {
    id: 'living-scenery',
    no: '01',
    name: { zh: '生活風景', en: 'Living Scenery' },
    tagline: { zh: '收藏自然風景的故事', en: "Stories gathered from nature's landscapes" },
    description: { zh: '來自大自然靈感的作品', en: 'Pieces inspired by the natural world' },
  },
  {
    id: 'stone-stories',
    no: '02',
    name: { zh: '礦石物語', en: 'Stone Stories' },
    tagline: { zh: '收藏礦石特質的故事', en: 'Stories held inside mineral stones' },
    description: { zh: '以內在想像為主角的作品', en: 'Pieces where inner imagination leads' },
  },
  {
    id: 'daily-glimmers',
    no: '03',
    name: { zh: '日常拾光', en: 'Daily Glimmers' },
    tagline: { zh: '收藏生活中的小確幸', en: 'Small joys collected from daily life' },
    description: { zh: '富含生活風味趣味的作品', en: 'Pieces full of everyday warmth and play' },
  },
  {
    id: 'little-blessings',
    no: '04',
    name: { zh: '祝福小物', en: 'Little Blessings' },
    tagline: { zh: '收藏美好的心意與祝願', en: 'Tokens of goodwill and blessing' },
    description: { zh: '希望大家都平安幸福的作品', en: 'Pieces that wish you peace and happiness' },
  },
  {
    id: 'living-force',
    no: '05',
    name: { zh: '生物力量', en: 'Living Force' },
    tagline: { zh: '收藏地球生物的故事', en: 'Stories of the living earth' },
    description: { zh: '注入動植物生命力的作品', en: 'Pieces alive with flora and fauna' },
  },
]

export const CATEGORIES: { id: CategoryId; name: { zh: string; en: string } }[] = [
  { id: 'earrings', name: { zh: '耳飾', en: 'Earrings' } },
  { id: 'braided-bracelets', name: { zh: '手繩', en: 'Braided Bracelets' } },
  { id: 'chain-bracelets', name: { zh: '手鍊', en: 'Chain Bracelets' } },
  { id: 'beaded-bracelets', name: { zh: '手串', en: 'Beaded Bracelets' } },
  { id: 'necklaces', name: { zh: '項鍊', en: 'Necklaces' } },
  { id: 'anklets', name: { zh: '足鍊', en: 'Anklets' } },
  { id: 'hanging-charms', name: { zh: '掛飾', en: 'Hanging Charms' } },
  { id: 'decor', name: { zh: '擺飾', en: 'Decor Pieces' } },
  { id: 'little-things', name: { zh: '小物', en: 'Little Things' } },
  { id: 'paintings', name: { zh: '畫作', en: 'Paintings' } },
  { id: 'diamond-paintings', name: { zh: '鑽石畫', en: 'Diamond Paintings' } },
  { id: 'cross-stitch', name: { zh: '十字繡', en: 'Cross Stitch' } },
  { id: 'embroidery', name: { zh: '歐式刺繡', en: 'European Embroidery' } },
]

export function seriesById(id: SeriesId): Series {
  return SERIES.find(s => s.id === id)!
}

// 每個系列下的分類（品牌架構：足鍊只出現在祝福小物、生物力量）
const BASE_CATEGORIES: CategoryId[] = [
  'earrings', 'braided-bracelets', 'chain-bracelets', 'beaded-bracelets',
  'necklaces', 'hanging-charms', 'decor', 'little-things',
  'paintings', 'diamond-paintings', 'cross-stitch', 'embroidery',
]
const WITH_ANKLETS: CategoryId[] = [
  'earrings', 'braided-bracelets', 'chain-bracelets', 'beaded-bracelets',
  'necklaces', 'anklets', 'hanging-charms', 'decor', 'little-things',
  'paintings', 'diamond-paintings', 'cross-stitch', 'embroidery',
]

export const SERIES_CATEGORIES: Record<SeriesId, CategoryId[]> = {
  'living-scenery': BASE_CATEGORIES,
  'stone-stories': BASE_CATEGORIES,
  'daily-glimmers': BASE_CATEGORIES,
  'little-blessings': WITH_ANKLETS,
  'living-force': WITH_ANKLETS,
}

export function categoryById(id: CategoryId) {
  return CATEGORIES.find(c => c.id === id)!
}

export type Product = {
  id: string
  slug: string
  series: SeriesId
  category: CategoryId
  name: { zh: string; en: string }
  meta: { zh: string; en: string }
  price: { twd: number; myr: number }
  stock: 'in-stock' | 'made-to-order' | 'sold-out'
  isNew?: boolean
  image: string
}

export const products: Product[] = [
  {
    id: 'sage',
    slug: 'sage',
    series: 'stone-stories',
    category: 'braided-bracelets',
    name: { zh: '灰綠', en: 'Sage' },
    meta: { zh: '手工編織．包體水晶', en: 'Handwoven · Lodolite Quartz' },
    price: { twd: 1680, myr: 230 },
    stock: 'made-to-order',
    image: '/images/bracelet-sage.jpg',
  },
  {
    id: 'coral',
    slug: 'coral',
    series: 'stone-stories',
    category: 'braided-bracelets',
    name: { zh: '珊瑚', en: 'Coral' },
    meta: { zh: '手工編織．髮晶', en: 'Handwoven · Rutilated Quartz' },
    price: { twd: 1580, myr: 216 },
    stock: 'made-to-order',
    image: '/images/bracelet-coral.jpg',
  },
  {
    id: 'mist',
    slug: 'mist',
    series: 'stone-stories',
    category: 'braided-bracelets',
    name: { zh: '灰藍', en: 'Mist' },
    meta: { zh: '手工編織．太陽石', en: 'Handwoven · Sunstone' },
    price: { twd: 1480, myr: 202 },
    stock: 'in-stock',
    image: '/images/bracelet-gray.jpg',
  },
  {
    id: 'rosa',
    slug: 'rosa',
    series: 'daily-glimmers',
    category: 'earrings',
    name: { zh: '玫粉', en: 'Rosa' },
    meta: { zh: '編織圓圈．14k 包金耳鉤', en: 'Woven Hoop · 14k Gold-filled Hook' },
    price: { twd: 880, myr: 120 },
    stock: 'in-stock',
    isNew: true,
    image: '/images/earring-hoop-pink.jpg',
  },
  {
    id: 'azure',
    slug: 'azure',
    series: 'living-scenery',
    category: 'earrings',
    name: { zh: '藍綠', en: 'Azure' },
    meta: { zh: '編織圓圈．金屬細線', en: 'Woven Hoop · Metallic Thread' },
    price: { twd: 920, myr: 126 },
    stock: 'in-stock',
    image: '/images/earring-hoop-blue.jpg',
  },
  {
    id: 'plume',
    slug: 'plume',
    series: 'living-scenery',
    category: 'earrings',
    name: { zh: '流蘇', en: 'Plume' },
    meta: { zh: '箭羽流蘇．黃銅耳鉤', en: 'Chevron Tassel · Brass Hook' },
    price: { twd: 1180, myr: 162 },
    stock: 'in-stock',
    image: '/images/earring-chevron.jpg',
  },
]

export const bracelets = products.filter(p => p.category === 'braided-bracelets')
export const earrings = products.filter(p => p.category === 'earrings')
