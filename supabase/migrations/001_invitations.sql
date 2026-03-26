-- Run this in your Supabase SQL editor

create table public.invitations (
  id             uuid        default gen_random_uuid() primary key,
  slug           text        unique not null,
  occasion       text        not null,
  title          text,
  bride_name     text,
  groom_name     text,
  card_image_url text,
  date           text,
  time           text,
  venue          text,
  message        text,
  religion       text,
  contacts       jsonb       default '[]'::jsonb,
  pin            text,
  view_count     integer     default 0,
  created_at     timestamptz default now()
);

-- Enable Row Level Security
alter table public.invitations enable row level security;

create policy "Public read"
  on public.invitations for select
  using (true);

create policy "Public insert"
  on public.invitations for insert
  with check (true);

create policy "Public update"
  on public.invitations for update
  using (true);

-- Atomic view count increment
create or replace function increment_view_count(slug_param text)
returns void language sql as $$
  update public.invitations
  set view_count = view_count + 1
  where slug = slug_param;
$$;
