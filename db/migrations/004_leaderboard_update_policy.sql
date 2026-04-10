-- Migration 004: allow users to update their own leaderboard row
-- Applied: 2026-04-09

create policy "Users can update their own score"
  on leaderboard for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
