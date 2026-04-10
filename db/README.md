# Database Migrations

Each file in `migrations/` is a numbered SQL script representing one change to the Supabase schema. Run them in order via the Supabase dashboard SQL Editor.

| # | File | Description | Date |
|---|------|-------------|------|
| 001 | `001_leaderboard.sql` | Create leaderboard table with RLS policies | 2026-04-09 |
| 002 | `002_leaderboard_add_steps.sql` | Add steps column to leaderboard | 2026-04-09 |
| 003 | `003_leaderboard_unique_user.sql` | One row per user, drop time_seconds | 2026-04-09 |
