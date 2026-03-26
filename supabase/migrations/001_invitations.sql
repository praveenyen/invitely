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
  created_at     timestamptz default now()
);

-- Enable Row Level Security
alter table public.invitations enable row level security;

-- Allow anyone to read invitations (public sharing)
create policy "Public read"
  on public.invitations for select
  using (true);

-- Allow anyone to create invitations
create policy "Public insert"
  on public.invitations for insert
  with check (true);
