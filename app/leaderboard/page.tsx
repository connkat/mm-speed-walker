import { createClient } from "@/lib/supabase/server";
import { LeaderboardTabs } from "./leaderboard-tabs";

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];

  const [{ data: allTime }, { data: daily }] = await Promise.all([
    supabase.from("leaderboard").select("email, steps").order("steps", { ascending: false }).limit(20),
    supabase.from("daily_steps").select("email, steps").eq("date", today).order("steps", { ascending: false }).limit(20),
  ]);

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-xl">
        <div className="terminal-box p-6">
          <div className="border-b border-terminal-green pb-3 mb-6">
            <p className="text-xs text-terminal-green-dim">METALAB SPEED WALKING CHAMPIONSHIP</p>
            <p className="text-lg terminal-glow cursor-blink">LEADERBOARD</p>
          </div>

          <LeaderboardTabs
            allTime={allTime ?? []}
            daily={daily ?? []}
            today={today}
          />

          <div className="mt-6 pt-4 border-t border-terminal-green-dark text-center">
            <a
              href="/game"
              className="text-xs text-terminal-green-dim hover:text-terminal-green uppercase tracking-widest transition-colors"
            >
              ← BACK TO RACE
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
