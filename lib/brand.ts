// ╔══════════════════════════════════════════════════════════════╗
// ║  品牌設定中心 — 複製出「新品牌」時，主要改這一個檔案。           ║
// ║  另外還要改：                                                  ║
// ║    1. app/globals.css 最上面的 :root 配色變數（換色）          ║
// ║    2. app/icon.svg 的字母（瀏覽器分頁小圖示）                  ║
// ║    3. Vercel 環境變數：銀行帳號、TNG QR、寄信網域、後台密碼     ║
// ║    4. 各自獨立的 Supabase / Vercel / 網域 / Resend            ║
// ║  詳見專案根目錄的「新品牌複製指南.md」。                        ║
// ╚══════════════════════════════════════════════════════════════╝

export type Lex = { zh: string; en: string }

export const BRAND = {
  // ── 身分 ──
  name: 'CiCi',                       // Logo 主字
  nameSub: 'DAILY STUDIO',            // Logo 下方小字
  nameFull: 'CiCi Daily Studio',     // 完整品牌名（信件、版權、SEO 用）
  domain: 'cicidailystudio.com',
  url: 'https://cicidailystudio.com',

  // ── 聯絡 / 社群 ──
  instagramHandle: 'cicidailyjewelry',
  instagramUrl: 'https://www.instagram.com/cicidailyjewelry/',
  lineId: '0968827209',
  lineUrl: 'https://line.me/R/ti/p/~0968827209',
  email: 'hello@cicidailystudio.com',

  // ── 行銷 ──
  metaPixelId: '1326900252206422',

  // ── SEO ──
  seoDescription: {
    zh: '透過編織、針線與顏料，收藏生活中的風景。台灣手作耳飾、手環、項鍊與更多。',
    en: 'Collecting the sceneries of life through weaving, needlework and paint. Handmade earrings, bracelets, necklaces and more, crafted in Taiwan.',
  } as Lex,

  // ── 主視覺文案 ──
  announcement: {
    zh: '滿 NT$1,500 免運．從台灣寄送全球',
    en: 'Free shipping over NT$1,500 · Worldwide delivery from Taiwan',
  } as Lex,
  heroKicker: { zh: '二〇二六．春夏新作', en: 'Spring · Summer 2026' } as Lex,
  // Hero 主標分兩行；英文版第二行的斜體字用 emWord 標出來
  heroTitle: {
    zh: ['收藏生活中', '的風景。'],
    en: ['Collecting the', 'sceneries of life.'],
    emWord: 'sceneries',
  },
  heroLead: {
    zh: '透過編織、針線與顏料等多元媒材，將自然色彩、天然素材與礦石紋理，一件一件慢慢化為獨一無二的手工作品。',
    en: 'Through weaving, needlework and paint, natural colours, organic materials and mineral textures slowly become one-of-a-kind handmade pieces.',
  } as Lex,

  // ── 品牌理念（首頁故事區）──
  philosophyTitle: {
    zh: ['那些讓妳駐足、微笑', '與感動的片刻。'],
    en: ['The moments that make', 'you pause and smile.'],
  },
  philosophy1: {
    zh: '透過編織、針線、顏料等多元化的創作媒材，收藏生活中的風景，是 CiCi 看待世界的方式。生活中某天當下的心情，那些能讓妳駐足、微笑、想像與感動的美好片刻，皆是創作靈感的泉源。',
    en: 'Collecting the sceneries of life through weaving, needlework and paint. This is how CiCi sees the world. The moments that make you pause, smile, imagine and feel, they are where every piece begins.',
  } as Lex,
  philosophy2: {
    zh: '將自然色彩、天然素材與礦石紋理所蘊藏的獨特風景，結合多樣式的手作技巧，一件一件慢慢地化為獨一無二的手工作品。願每一份喜歡，都能在某個瞬間，與自己溫柔的對話、與另一顆心產生共鳴。',
    en: 'Natural colours, organic materials and the landscapes hidden inside mineral stones, slowly transformed by hand into one-of-a-kind works. May every piece you love become a gentle conversation with yourself, and a quiet resonance with another heart.',
  } as Lex,
  philosophySign: { zh: '——CiCi Daily Studio．於台灣', en: '— CiCi Daily Studio, Taiwan' } as Lex,

  footerDesc: {
    zh: '透過編織、針線與顏料，收藏生活中的風景。運用大自然饋贈的禮物，創作兼具故事感與日常感的生活作品。',
    en: 'Collecting the sceneries of life through weaving, needlework and paint. Works made with gifts from nature, carrying both story and everyday ease.',
  } as Lex,
}
