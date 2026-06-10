-- CiCi · Supabase schema
-- 在 Supabase Dashboard → SQL Editor 貼這個跑

-- ====== PRODUCTS ======
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category text not null check (category in ('bracelet', 'earring', 'other')),
  name_zh text not null,
  name_en text not null,
  description_zh text,
  description_en text,
  meta_zh text,
  meta_en text,
  price_twd integer not null,
  price_myr integer not null,
  stock_status text not null default 'in-stock'
    check (stock_status in ('in-stock', 'made-to-order', 'sold-out')),
  is_new boolean default false,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  url text not null,
  alt_text text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  variant_type text not null,
  variant_value_zh text not null,
  variant_value_en text not null,
  price_diff_twd integer default 0,
  price_diff_myr integer default 0,
  is_active boolean default true,
  sort_order integer default 0
);

-- ====== ORDERS ======
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  shipping_address text not null,
  shipping_country text not null check (shipping_country in ('TW', 'MY', 'OTHER')),
  shipping_zip text,
  payment_method text not null check (payment_method in ('tng', 'bank_transfer')),
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'reported', 'confirmed', 'refunded', 'cancelled')),
  payment_last5 text,
  payment_screenshot_url text,
  payment_reported_at timestamptz,
  payment_confirmed_at timestamptz,
  shipping_status text not null default 'pending'
    check (shipping_status in ('pending', 'preparing', 'shipped', 'delivered')),
  shipping_tracking_no text,
  shipping_carrier text,
  shipping_at timestamptz,
  subtotal integer not null,
  shipping_fee integer not null,
  total integer not null,
  currency text not null check (currency in ('TWD', 'MYR')),
  language text default 'en',
  customer_notes text,
  internal_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_name_snapshot text not null,
  unit_price integer not null,
  quantity integer not null default 1,
  variants jsonb default '{}',
  created_at timestamptz default now()
);

-- ====== INDEXES ======
create index if not exists idx_products_category on products(category) where is_active = true;
create index if not exists idx_products_sort on products(sort_order) where is_active = true;
create index if not exists idx_orders_status on orders(payment_status, shipping_status);
create index if not exists idx_orders_created on orders(created_at desc);
create index if not exists idx_orders_email on orders(customer_email);

-- ====== UPDATED_AT TRIGGER ======
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_updated_at on products;
create trigger products_updated_at before update on products
  for each row execute function set_updated_at();

drop trigger if exists orders_updated_at on orders;
create trigger orders_updated_at before update on orders
  for each row execute function set_updated_at();

-- ====== ROW LEVEL SECURITY ======
alter table products enable row level security;
alter table product_images enable row level security;
alter table product_variants enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- 任何人可以讀 active 商品（前端用 publishable key）
drop policy if exists "Anyone can read active products" on products;
create policy "Anyone can read active products"
  on products for select using (is_active = true);

drop policy if exists "Anyone can read product images" on product_images;
create policy "Anyone can read product images"
  on product_images for select using (true);

drop policy if exists "Anyone can read product variants" on product_variants;
create policy "Anyone can read product variants"
  on product_variants for select using (is_active = true);

-- 訂單與訂單明細只能 service_role 操作（從 server actions / API route）
-- 前端絕對不能直接讀寫
drop policy if exists "No public access to orders" on orders;
create policy "No public access to orders"
  on orders for select using (false);

drop policy if exists "No public access to order items" on order_items;
create policy "No public access to order items"
  on order_items for select using (false);

-- ====== SEED DATA ======
insert into products (slug, category, name_zh, name_en, meta_zh, meta_en, price_twd, price_myr, stock_status, is_new, sort_order) values
  ('sage', 'bracelet', '灰綠', 'Sage', '手工編織．包體水晶', 'Handwoven · Lodolite Quartz', 1680, 230, 'made-to-order', false, 1),
  ('coral', 'bracelet', '珊瑚', 'Coral', '手工編織．髮晶', 'Handwoven · Rutilated Quartz', 1580, 216, 'made-to-order', false, 2),
  ('mist', 'bracelet', '灰藍', 'Mist', '手工編織．太陽石', 'Handwoven · Sunstone', 1480, 202, 'in-stock', false, 3),
  ('rosa', 'earring', '玫粉', 'Rosa', '編織圓圈．14k 包金耳鉤', 'Woven Hoop · 14k Gold-filled Hook', 880, 120, 'in-stock', true, 10),
  ('azure', 'earring', '藍綠', 'Azure', '編織圓圈．金屬細線', 'Woven Hoop · Metallic Thread', 920, 126, 'in-stock', false, 11),
  ('plume', 'earring', '流蘇', 'Plume', '箭羽流蘇．黃銅耳鉤', 'Chevron Tassel · Brass Hook', 1180, 162, 'in-stock', false, 12)
on conflict (slug) do nothing;

insert into product_images (product_id, url, alt_text)
select id, '/images/bracelet-sage.jpg', 'Sage 灰綠' from products where slug = 'sage'
union all select id, '/images/bracelet-coral.jpg', 'Coral 珊瑚' from products where slug = 'coral'
union all select id, '/images/bracelet-gray.jpg', 'Mist 灰藍' from products where slug = 'mist'
union all select id, '/images/earring-hoop-pink.jpg', 'Rosa 玫粉' from products where slug = 'rosa'
union all select id, '/images/earring-hoop-blue.jpg', 'Azure 藍綠' from products where slug = 'azure'
union all select id, '/images/earring-chevron.jpg', 'Plume 流蘇' from products where slug = 'plume';
