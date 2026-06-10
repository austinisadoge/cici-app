-- Migration 001 · 品牌架構：5 大系列 × 13 分類
-- 已經跑過 schema.sql 的資料庫，執行這個檔案升級。
-- （全新安裝直接跑最新版 schema.sql 即可，不用跑這個）

-- 1. 加 series 欄位
alter table products add column if not exists series text;

-- 2. 放寬 category 限制成 13 分類
alter table products drop constraint if exists products_category_check;
alter table products add constraint products_category_check
  check (category in (
    'earrings', 'braided-bracelets', 'chain-bracelets', 'beaded-bracelets',
    'necklaces', 'anklets', 'hanging-charms', 'decor', 'little-things',
    'paintings', 'diamond-paintings', 'cross-stitch', 'embroidery'
  ));

-- 3. series 限制成 5 大系列
alter table products drop constraint if exists products_series_check;
alter table products add constraint products_series_check
  check (series in (
    'living-scenery', 'stone-stories', 'daily-glimmers',
    'little-blessings', 'living-force'
  ));

-- 4. 既有 seed 資料搬家：舊分類 → 新分類 + 歸系列
update products set category = 'braided-bracelets', series = 'stone-stories'
  where category = 'bracelet' or slug in ('sage', 'coral', 'mist');
update products set category = 'earrings'
  where category = 'earring' or slug in ('rosa', 'azure', 'plume');
update products set series = 'daily-glimmers' where slug = 'rosa';
update products set series = 'living-scenery' where slug in ('azure', 'plume');

-- 5. series 之後必填
alter table products alter column series set not null;

-- 6. 索引
create index if not exists idx_products_series on products(series) where is_active = true;
