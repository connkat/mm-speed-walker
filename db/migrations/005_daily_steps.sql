-- Migration 005: daily step tracking
-- Applied: 2026-04-09

create table daily_steps (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  email text not null,
  date date not null default current_date,
  steps integer not null default 0,
  created_at timestamptz default now() not null,
  unique(user_id, date)
);

alter table daily_steps enable row level security;

create policy "Anyone can read daily steps"
  on daily_steps for select using (true);

create policy "Users can insert their own daily steps"
  on daily_steps for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own daily steps"
  on daily_steps for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
