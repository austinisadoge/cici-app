-- Migration 003 · 商品細節欄位 + 上架 6 件真商品
-- 在 Supabase SQL Editor 整段貼上跑（可重複執行，安全）

begin;

-- 1. 加商品細節欄位
alter table products add column if not exists spec_zh text;
alter table products add column if not exists spec_en text;
alter table products add column if not exists color_zh text;
alter table products add column if not exists color_en text;
alter table products add column if not exists occasion_zh text;
alter table products add column if not exists occasion_en text;
alter table products add column if not exists technique_zh text;
alter table products add column if not exists technique_en text;
alter table products add column if not exists size_zh text;
alter table products add column if not exists size_en text;
alter table products add column if not exists material_zh text;
alter table products add column if not exists material_en text;
alter table products add column if not exists care_zh text;
alter table products add column if not exists care_en text;

-- 2. 停用舊的示範商品（sage/coral/mist/rosa/azure/plume）
update products set is_active = false
  where slug in ('sage','coral','mist','rosa','azure','plume');

-- 3. 上架 6 件真商品
insert into products
  (slug, series, category, name_zh, name_en, meta_zh, meta_en,
   description_zh, description_en,
   spec_zh, spec_en, color_zh, color_en, occasion_zh, occasion_en,
   technique_zh, technique_en, size_zh, size_en, material_zh, material_en,
   care_zh, care_en,
   price_twd, price_myr, stock_status, is_new, is_active, sort_order)
values
(
  'phosphor-waves','living-scenery','braided-bracelets',
  '磷波點點','Phosphor Waves',
  '寬版手繩．磷藍石 × 珍珠','Wide bracelet · Apatite × Pearl',
  '線色交織如同浪與沙的分界，美麗的珠光形成的潮間帶層次，完美支撐了貝殼與珍珠的意象。當潮水褪去後，貝殼外層的霧光彩線表達了豐富的海岸線色彩，藍是海、綠是海藻、銀白是浪花、黃色像是陽光灑在沙面上，珠粒起伏宛如浪花拍打著礁石，整體呈現一種靜默的節奏感。',
  'The threads interlace like the line between wave and sand, and pearly beads form the layers of a tidal flat, holding the image of shells and pearls. As the tide recedes, misty iridescent threads speak of a rich coastline — blue for the sea, green for seaweed, silver-white for foam, yellow like sunlight on the sand. The beads rise and fall like waves against the rocks, a quiet sense of rhythm throughout.',
  '寬版手繩','Wide bracelet','多色彩線','Multi-colour threads',
  '日常搭配／場合佩戴','Everyday & occasions',
  '四線斜卷結編織，最寬處 1.8 公分','Four-strand diagonal knotting, 1.8 cm at widest',
  '手圍均碼 16 公分＋4 公分彈性延長','One size, 16 cm + 4 cm stretch extension',
  '天然磷藍石刻面珠、飾品珍珠、合金尾扣＋延長鏈','Natural faceted apatite, pearls, alloy clasp + extension chain',
  null, null,
  1880, 235, 'in-stock', true, true, 1
),
(
  'frost-on-grass','stone-stories','braided-bracelets',
  '落在草上的霜','Frost on Grass',
  '水晶魔盒手繩．四季幽靈水晶','Stone-box bracelet · Phantom Quartz',
  '收藏礦石裡的風景。以天然礦石為核心，搭配合金鑲嵌與保護工藝製作而成。每顆礦石皆擁有獨特的紋理與景致，透過編織包覆，將自然的想像與故事化為可佩戴的收藏。',
  'Collecting the scenery held inside a stone. Built around a natural mineral with alloy setting and protective finishing. Each stone carries its own texture and landscape; wrapped in weaving, it turns nature’s imagination and story into a wearable keepsake.',
  '橢圓魔盒寬版手繩','Oval stone-box wide bracelet','湖水綠','Lake green',
  '日常搭配／清新脫俗','Everyday & understated',
  '八線人字紋編織，最寬處 1.2 公分','Eight-strand herringbone weave, 1.2 cm at widest',
  '手圍 15 公分＋4 公分彈性延長','15 cm + 4 cm stretch extension',
  '橢圓形四季幽靈水晶魔盒、合金尾扣＋延長鏈','Oval four-season phantom quartz, alloy clasp + extension chain',
  '水晶魔盒內部蘊藏的礦石紋理、顏色與景觀皆為自然形成，每顆皆獨一無二。表面採用樹脂保護工藝，可提升透明度與觀賞性。',
  'The textures, colours and scenery inside the crystal are all naturally formed, each one unique. The surface is finished with a protective resin to enhance clarity and beauty.',
  1680, 210, 'in-stock', true, true, 2
),
(
  'milan','daily-glimmers','earrings',
  '米蘭','Milan',
  '花樣編織耳飾．地中海宮廷風','Woven earrings · Mediterranean',
  '具有異國感的地中海＋宮廷風，立體花帶的編織感很高級，V 字下收加流蘇有修飾臉型的效果。',
  'An exotic Mediterranean-meets-baroque feel. The dimensional floral band reads refined, and the V-shaped drop with tassel flatters the face.',
  '耳飾','Earrings','卡其、藍加金','Khaki, blue & gold',
  '日常搭配','Everyday',
  '花樣編織','Patterned weave',
  '3.5 x 2 公分','3.5 x 2 cm',
  '合金珠、合金耳鈎','Alloy beads, alloy hooks',
  null, null,
  980, 123, 'in-stock', true, true, 10
),
(
  'forest','daily-glimmers','earrings',
  '林間','Forest',
  '花樣編織耳環．森林系','Woven earrings · Forest',
  '具有生命力的森林感，上圈綠加金色的立體顆粒，像松果、小花苞或果實聚集的畫面，屬於森林小精靈飾品的感覺。',
  'A forest full of life. The upper ring of green-and-gold dimensional beads gathers like pinecones, buds or berries — jewellery for a woodland sprite.',
  '耳環','Earrings','墨綠、墨綠加金','Deep green, green & gold',
  '日常搭配','Everyday',
  '花樣編織','Patterned weave',
  '3 x 2 公分','3 x 2 cm',
  '合金耳鈎','Alloy hooks',
  null, null,
  980, 123, 'in-stock', true, true, 11
),
(
  'gourd-guardian','little-blessings','hanging-charms',
  '葫蘆福守','Gourd Guardian',
  '天然葫蘆掛飾．福祿守護','Gourd charm · Blessing & guard',
  '天然小葫蘆，有福祿與護路的喻意，像御守、護身符般有守護感，是隨身攜帶的小力量。野生的小葫蘆，經過採摘、日照、風乾、蛻皮的過程，形成許多不同器型的可愛葫蘆。',
  'A small natural gourd — in Chinese, a homophone for fortune and prosperity, and a guard for the road. Like an amulet, it carries a sense of protection: a small strength to keep with you. Each wild gourd is picked, sun-dried, air-cured and peeled, forming its own charming shape.',
  '掛飾','Hanging charm','卡其色系','Khaki tones',
  '包掛飾、車掛飾、牆掛飾','Bag, car or wall charm',
  '多樣化編織、大流蘇','Mixed weaving, large tassel',
  '掛圈內徑 3.5 公分、葫蘆高 5.8 公分、底徑 3.3 公分','Ring inner Ø3.5 cm, gourd H5.8 cm, base Ø3.3 cm',
  '棉線、醒獅琺瑯珠、金剛菩提、各色裝飾珠','Cotton cord, lion enamel bead, bodhi seed, assorted beads',
  '天然葫蘆通常保留頂部的枝梗稱之為「龍頭」，龍頭經修剪後保留最自然的部分，纏上絲線再加上編織的葫蘆葉，不僅美觀更增添萌趣。掛在身邊、門邊、車上，也掛上了平安常駐、福氣常伴。',
  'A natural gourd usually keeps the stem at the top, called the “dragon head.” Trimmed to its most natural form, wrapped with silk thread and finished with woven gourd leaves, it is both pretty and playful. Hang it by your side, your door or your car — and hang peace and fortune alongside it.',
  1380, 173, 'in-stock', true, true, 20
),
(
  'forest-path','living-force','braided-bracelets',
  '林間花徑','Forest Path',
  '寬版手繩．春日野花','Wide bracelet · Spring blooms',
  '每一朵花都是勇敢的綻放，呈現春日溫暖有活力的意象。棕色菱形的格紋亦如堅固的土壤，粉嫩與新綠交織出野花叢生的感覺，規律的排列就像春花沿徑而開。',
  'Every flower is a brave bloom, a warm and lively image of spring. Brown diamond lattice reads like firm soil; soft pink and fresh green weave a field of wildflowers, their orderly rows like spring blossoms opening along a path.',
  '寬版手繩','Wide bracelet','栗色、桃色、岩草、棕色','Chestnut, peach, sage, brown',
  '日常搭配／清新脫俗','Everyday & understated',
  '八線斜卷結編織，最寬處 1.2 公分','Eight-strand diagonal knotting, 1.2 cm at widest',
  '手圍均碼 16 公分＋2 公分彈性延長','One size, 16 cm + 2 cm stretch extension',
  '椰殼尾扣＋保色不規則金塊珠','Coconut-shell clasp, colour-fast irregular gold nugget beads',
  null, null,
  1280, 160, 'in-stock', true, true, 30
)
on conflict (slug) do update set
  series = excluded.series, category = excluded.category,
  name_zh = excluded.name_zh, name_en = excluded.name_en,
  meta_zh = excluded.meta_zh, meta_en = excluded.meta_en,
  description_zh = excluded.description_zh, description_en = excluded.description_en,
  spec_zh = excluded.spec_zh, spec_en = excluded.spec_en,
  color_zh = excluded.color_zh, color_en = excluded.color_en,
  occasion_zh = excluded.occasion_zh, occasion_en = excluded.occasion_en,
  technique_zh = excluded.technique_zh, technique_en = excluded.technique_en,
  size_zh = excluded.size_zh, size_en = excluded.size_en,
  material_zh = excluded.material_zh, material_en = excluded.material_en,
  care_zh = excluded.care_zh, care_en = excluded.care_en,
  price_twd = excluded.price_twd, price_myr = excluded.price_myr,
  stock_status = excluded.stock_status, is_active = true;

-- 4. 商品主圖（先清掉舊的再插入，可重複執行）
delete from product_images where product_id in (
  select id from products where slug in
  ('phosphor-waves','frost-on-grass','milan','forest','gourd-guardian','forest-path')
);
insert into product_images (product_id, url, sort_order)
select id, '/images/product-phosphor-waves.jpg', 0 from products where slug = 'phosphor-waves'
union all select id, '/images/product-frost-on-grass.jpg', 0 from products where slug = 'frost-on-grass'
union all select id, '/images/product-milan.jpg', 0 from products where slug = 'milan'
union all select id, '/images/product-forest.jpg', 0 from products where slug = 'forest'
union all select id, '/images/product-gourd-guardian.jpg', 0 from products where slug = 'gourd-guardian'
union all select id, '/images/product-forest-path.jpg', 0 from products where slug = 'forest-path';

commit;
