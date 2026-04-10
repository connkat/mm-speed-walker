import { createClient } from "@/lib/supabase/server";

export default async function LeaderboardPage() {
  const supabase = await createClient();

  const { data: scores } = await supabase
    .from("leaderboard")
    .select("email, steps")
    .order("steps", { ascending: false })
    .limit(20);

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-xl">
        <div className="terminal-box p-6">
          <div className="border-b border-terminal-green pb-3 mb-6">
            <p className="text-xs text-terminal-green-dim">METALAB SPEED WALKING CHAMPIONSHIP</p>
            <p className="text-lg terminal-glow cursor-blink">LEADERBOARD</p>
          </div>

          {!scores || scores.length === 0 ? (
            <p className="text-terminal-green-dim text-xs tracking-widest text-center py-8">
              NO SCORES YET. BE THE FIRST TO RACE.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-terminal-green-dim text-xs tracking-widest border-b border-terminal-green-dark">
                  <th className="text-left py-2">#</th>
                  <th className="text-left py-2">USER</th>
                  <th className="text-right py-2">STEPS</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-terminal-green-dark ${i === 0 ? "terminal-glow" : "text-terminal-green-dim"}`}
                  >
                    <td className="py-2 pr-4">{String(i + 1).padStart(2, "0")}</td>
                    <td className="py-2">{row.email.split("@")[0]}</td>
                    <td className="py-2 text-right">{row.steps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

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
