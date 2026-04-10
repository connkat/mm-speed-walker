import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions/auth";
import { redirect } from "next/navigation";

const RUNNER = `
                        ,////,
                       (======)
                        /// o|
                        //  _|
                       _/_,-'
                  _.-/'/   \\   ,/;,
               ,-' /'  \\_   \\ / _/
               \`\\ /     _/\\  \` /
                 |     /,  \`\\_/
                 |=====\\'
   /\\_          /\`      /\\
 /' /_\`\`--.__/\\  \`,. /  \\
|_/\`  \`-._     \`\\/  \`\\   \`.
           \`-.__/'     \`\\---|
                         \`\\  \\
                           \`\\ \\
                             \\_\\__
                              \\___)
`;

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
      {/* Top bar */}
      <header className="terminal-box p-3 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="terminal-glow text-sm font-bold tracking-widest">MM SPEED WALKER</span>
          <span className="text-xs text-terminal-green-dim">|</span>
          <span className="text-xs text-terminal-green-dim">USER: {user.email}</span>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="text-xs text-terminal-green-dim hover:text-terminal-green uppercase tracking-widest transition-colors"
          >
            [ LOGOUT ]
          </button>
        </form>
      </header>

      {/* Runner landing */}
      <div className="flex-1 flex flex-col items-center justify-center gap-10">
        <pre className="terminal-glow text-terminal-green leading-snug select-none text-sm">{RUNNER}</pre>

        <div className="text-center space-y-2">
          <p className="text-lg terminal-glow tracking-widest cursor-blink">
            READY TO RACE
          </p>
          <p className="text-xs text-terminal-green-dim tracking-widest">
            METALAB SPEED WALKING CHAMPIONSHIP
          </p>
        </div>

        <div className="flex gap-6">
          <button className="terminal-box px-8 py-3 text-sm uppercase tracking-widest hover:bg-terminal-green-dark transition-colors terminal-glow">
            [ START GAME ]
          </button>
          <button className="px-8 py-3 text-sm uppercase tracking-widest text-terminal-green-dim hover:text-terminal-green transition-colors border border-terminal-green-dark hover:border-terminal-green">
            [ LEADERBOARD ]
          </button>
        </div>
      </div>
    </div>
  );
}
