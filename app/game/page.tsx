import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions/auth";
import { redirect } from "next/navigation";

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
      <header className="terminal-box p-3 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="terminal-glow text-sm font-bold tracking-widest">MM SPEED WALKER</span>
          <span className="text-xs text-[#00cc33]">|</span>
          <span className="text-xs text-[#00cc33]">USER: {user.email}</span>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="text-xs text-[#00cc33] hover:text-[#00ff41] uppercase tracking-widest transition-colors"
          >
            [ LOGOUT ]
          </button>
        </form>
      </header>

      {/* Main game area */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Game viewport */}
        <div className="md:col-span-2 terminal-box p-4 flex flex-col">
          <p className="text-xs text-[#00cc33] mb-3 uppercase tracking-widest">GAME WORLD</p>
          <div className="flex-1 flex items-center justify-center">
            <pre className="terminal-glow text-xs leading-none select-none">
{`
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ~                              ~
    ~    ___                       ~
    ~   /   \\   @                  ~
    ~  | o o |  /|\\                ~
    ~   \\___/   / \\                ~
    ~           WALKER             ~
    ~                              ~
    ~  ============================~
    ~  [############################~
    ~  [############################~
    ~  ============================~
    ~           ROAD               ~
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`}
            </pre>
          </div>
          <div className="border-t border-[#003b0f] pt-3 mt-3 text-xs text-[#00cc33]">
            <span>USE [WASD] OR [ARROW KEYS] TO MOVE</span>
          </div>
        </div>

        {/* Side panel */}
        <div className="flex flex-col gap-4">
          {/* Stats */}
          <div className="terminal-box p-4">
            <p className="text-xs text-[#00cc33] mb-3 uppercase tracking-widest border-b border-[#003b0f] pb-2">STATS</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#00cc33]">SPEED</span>
                <span>[####------] 40%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#00cc33]">STAMINA</span>
                <span>[#######---] 70%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#00cc33]">SCORE</span>
                <span>000000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#00cc33]">LEVEL</span>
                <span>001</span>
              </div>
            </div>
          </div>

          {/* Log */}
          <div className="terminal-box p-4 flex-1">
            <p className="text-xs text-[#00cc33] mb-3 uppercase tracking-widest border-b border-[#003b0f] pb-2">SYSTEM LOG</p>
            <div className="space-y-1 text-xs text-[#00cc33] font-mono">
              <p>&gt; SYSTEM BOOT OK</p>
              <p>&gt; AUTH SESSION ACTIVE</p>
              <p>&gt; WORLD LOADED</p>
              <p>&gt; AWAITING INPUT<span className="cursor-blink" /></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
