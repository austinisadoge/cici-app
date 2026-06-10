export type Product = {
  id: string
  slug: string
  category: 'bracelet' | 'earring'
  name: { zh: string; en: string }
  meta: { zh: string; en: string }
  price: { twd: number; myr: number }
  stock: 'in-stock' | 'made-to-order'
  isNew?: boolean
  image: string
}

export const products: Product[] = [
  {
    id: 'sage',
    slug: 'sage',
    category: 'bracelet',
    name: { zh: '灰綠', en: 'Sage' },
    meta: { zh: '手工編織．包體水晶', en: 'Handwoven · Lodolite Quartz' },
    price: { twd: 1680, myr: 230 },
    stock: 'made-to-order',
    image: '/images/bracelet-sage.jpg',
  },
  {
    id: 'coral',
    slug: 'coral',
    category: 'bracelet',
    name: { zh: '珊瑚', en: 'Coral' },
    meta: { zh: '手工編織．髮晶', en: 'Handwoven · Rutilated Quartz' },
    price: { twd: 1580, myr: 216 },
    stock: 'made-to-order',
    image: '/images/bracelet-coral.jpg',
  },
  {
    id: 'mist',
    slug: 'mist',
    category: 'bracelet',
    name: { zh: '灰藍', en: 'Mist' },
    meta: { zh: '手工編織．太陽石', en: 'Handwoven · Sunstone' },
    price: { twd: 1480, myr: 202 },
    stock: 'in-stock',
    image: '/images/bracelet-gray.jpg',
  },
  {
    id: 'rosa',
    slug: 'rosa',
    category: 'earring',
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
    category: 'earring',
    name: { zh: '藍綠', en: 'Azure' },
    meta: { zh: '編織圓圈．金屬細線', en: 'Woven Hoop · Metallic Thread' },
    price: { twd: 920, myr: 126 },
    stock: 'in-stock',
    image: '/images/earring-hoop-blue.jpg',
  },
  {
    id: 'plume',
    slug: 'plume',
    category: 'earring',
    name: { zh: '流蘇', en: 'Plume' },
    meta: { zh: '箭羽流蘇．黃銅耳鉤', en: 'Chevron Tassel · Brass Hook' },
    price: { twd: 1180, myr: 162 },
    stock: 'in-stock',
    image: '/images/earring-chevron.jpg',
  },
]

export const bracelets = products.filter(p => p.category === 'bracelet')
export const earrings = products.filter(p => p.category === 'earring')
