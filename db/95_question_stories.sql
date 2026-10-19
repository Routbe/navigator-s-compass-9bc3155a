-- 95 — Answered anonymous questions as profile stories: per answer 24 h or permanent (null).
alter table public.profile_questions add column if not exists story_until timestamptz;
create index if not exists profile_questions_story_idx
  on public.profile_questions (owner_id, story_until) where published;
