-- Migration 003: one row per user on leaderboard
-- Applied: 2026-04-09

-- Keep only the row with the highest steps per user, delete the rest
DELETE FROM leaderboard a
USING leaderboard b
WHERE a.user_id = b.user_id
  AND a.steps < b.steps;

-- In case of ties, keep the most recent
DELETE FROM leaderboard a
USING leaderboard b
WHERE a.user_id = b.user_id
  AND a.created_at < b.created_at;

-- Add unique constraint
ALTER TABLE leaderboard ADD CONSTRAINT leaderboard_user_id_key UNIQUE (user_id);

-- Drop time_seconds, only steps matter
ALTER TABLE leaderboard DROP COLUMN time_seconds;
