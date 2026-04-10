"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, null);

  return (
    <form action={action} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-xs text-terminal-green-dim mb-1 uppercase tracking-widest">
          User ID (Email)
        </label>
        <div className="flex items-center gap-2">
          <span className="text-terminal-green-dim">&gt;</span>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="user@metalab.com"
            className="terminal-input flex-1 py-1 text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="code" className="block text-xs text-terminal-green-dim mb-1 uppercase tracking-widest">
          Access Code
        </label>
        <div className="flex items-center gap-2">
          <span className="text-terminal-green-dim">&gt;</span>
          <input
            id="code"
            name="code"
            type="password"
            required
            placeholder="••••••••"
            className="terminal-input flex-1 py-1 text-sm"
          />
        </div>
      </div>

      {state?.error && (
        <p className="text-xs border border-terminal-green p-2 bg-terminal-green-dark">
          ! ERROR: {state.error}
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={pending}
          className="w-full terminal-box py-2 text-sm uppercase tracking-widest hover:bg-terminal-green-dark transition-colors terminal-glow disabled:opacity-50"
        >
          {pending ? "[ AUTHENTICATING... ]" : "[ AUTHENTICATE ]"}
        </button>
      </div>
    </form>
  );
}
