import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import { GameCanvas } from "./game-canvas";

export default async function GamePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-full flex flex-col p-4 md:p-8">
      <header className="terminal-box p-3 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="terminal-glow text-sm font-bold tracking-widest">MM SPEED WALKER</span>
          <span className="text-xs text-terminal-green-dim">|</span>
          <span className="text-xs text-terminal-green-dim">USER: {user.email}</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="/leaderboard"
            className="text-xs text-terminal-green-dim hover:text-terminal-green uppercase tracking-widest transition-colors"
          >
            [ LEADERBOARD ]
          </a>
          <form action={logout}>
            <button
              type="submit"
              className="text-xs text-terminal-green-dim hover:text-terminal-green uppercase tracking-widest transition-colors"
            >
              [ LOGOUT ]
            </button>
          </form>
        </div>
      </header>

      <GameCanvas userId={user.id} email={user.email!} />
    </div>
  );
}
