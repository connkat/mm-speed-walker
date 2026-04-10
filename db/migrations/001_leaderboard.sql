-- Migration 001: leaderboard table
-- Applied: 2026-04-09

create table leaderboard (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  email text not null,
  time_seconds numeric not null,
  created_at timestamptz default now() not null
);

alter table leaderboard enable row level security;

create policy "Anyone can read leaderboard"
  on leaderboard for select using (true);

create policy "Users can insert their own scores"
  on leaderboard for insert
  with check (auth.uid() = user_id);
