ALTER TABLE public.invitations
  ADD COLUMN IF NOT EXISTS template_id text NOT NULL DEFAULT 'classic',
  ADD COLUMN IF NOT EXISTS theme_id    text NOT NULL DEFAULT 'golden-dawn';
