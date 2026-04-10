import { login } from "@/app/actions/auth";

export default function LoginPage() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* ASCII Logo */}
        <pre className="terminal-glow text-center text-xs leading-tight mb-8 select-none">
{`
 ███╗   ███╗███╗   ███╗
 ████╗ ████║████╗ ████║
 ██╔████╔██║██╔████╔██║
 ██║╚██╔╝██║██║╚██╔╝██║
 ██║ ╚═╝ ██║██║ ╚═╝ ██║
 ╚═╝     ╚═╝╚═╝     ╚═╝
  S P E E D  W A L K E R`}
        </pre>

        {/* Terminal box */}
        <div className="terminal-box p-6">
          {/* Header */}
          <div className="border-b border-[#00ff41] pb-3 mb-6">
            <p className="text-xs text-[#00cc33]">SYSTEM LOGIN v1.0.0</p>
            <p className="text-lg terminal-glow cursor-blink">AUTHENTICATION REQUIRED</p>
          </div>

          <form action={login} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs text-[#00cc33] mb-1 uppercase tracking-widest">
                USER ID (EMAIL)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[#00cc33]">&gt;</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="user@terminal.net"
                  className="terminal-input flex-1 py-1 text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs text-[#00cc33] mb-1 uppercase tracking-widest">
                ACCESS CODE
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[#00cc33]">&gt;</span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="terminal-input flex-1 py-1 text-sm"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full terminal-box py-2 text-sm uppercase tracking-widest hover:bg-[#00ff4110] transition-colors terminal-glow"
              >
                [ AUTHENTICATE ]
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-[#003b0f] text-center">
            <p className="text-xs text-[#00cc33]">
              NO ACCOUNT?{" "}
              <a href="/signup" className="text-[#00ff41] hover:terminal-glow underline underline-offset-4">
                REGISTER NEW USER
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-[#003b0f] mt-4">
          UNAUTHORIZED ACCESS IS PROHIBITED
        </p>
      </div>
    </div>
  );
}
