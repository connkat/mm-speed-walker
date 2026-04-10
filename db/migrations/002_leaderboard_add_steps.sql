-- Migration 002: add steps column to leaderboard
-- Applied: 2026-04-09

alter table leaderboard add column steps integer not null default 0;
