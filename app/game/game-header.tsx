"use client";

import { useState } from "react";
import { logout } from "@/app/actions/auth";

interface Props {
  email: string;
}

export function GameHeader({ email }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="terminal-box p-3 mb-8 flex items-center justify-between relative">
      <div className="flex items-center gap-4">
        <span className="terminal-glow text-sm font-bold tracking-widest">MM SPEED WALKER</span>
        <span className="hidden sm:inline text-xs text-terminal-green-dim">|</span>
        <span className="hidden sm:inline text-xs text-terminal-green-dim">USER: {email}</span>
      </div>

      {/* Desktop nav */}
      <div className="hidden sm:flex items-center gap-6">
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

      {/* Mobile hamburger */}
      <button
        className="sm:hidden text-terminal-green-dim hover:text-terminal-green transition-colors p-1"
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu"
      >
        <div className="space-y-1">
          <span className={`block w-5 h-px bg-current transition-all ${open ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block w-5 h-px bg-current transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-current transition-all ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </div>
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden absolute top-full right-0 mt-1 z-50 terminal-box min-w-40">
          <a
            href="/leaderboard"
            className="block px-4 py-3 text-xs text-terminal-green-dim hover:text-terminal-green uppercase tracking-widest transition-colors border-b border-terminal-green-dark"
          >
            [ LEADERBOARD ]
          </a>
          <form action={logout}>
            <button
              type="submit"
              className="w-full text-left px-4 py-3 text-xs text-terminal-green-dim hover:text-terminal-green uppercase tracking-widest transition-colors"
            >
              [ LOGOUT ]
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
