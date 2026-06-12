-- Migration 002 · 電子報訂閱名單
-- 在 Supabase SQL Editor 跑這個

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  language text default 'zh',
  created_at timestamptz default now()
);

alter table newsletter_subscribers enable row level security;

-- 只有 service key 能讀寫，前台完全碰不到
drop policy if exists "No public access to subscribers" on newsletter_subscribers;
create policy "No public access to subscribers"
  on newsletter_subscribers for select using (false);
