import { signup } from "@/app/actions/auth";

export default function SignupPage() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* ASCII art */}
        <pre className="terminal-glow text-center text-xs leading-tight mb-8 select-none">
{`
  +-+-+-+-+-+-+-+-+-+
  |R|E|G|I|S|T|E|R|
  +-+-+-+-+-+-+-+-+-+
   NEW USER INIT...`}
        </pre>

        {/* Terminal box */}
        <div className="terminal-box p-6">
          <div className="border-b border-[#00ff41] pb-3 mb-6">
            <p className="text-xs text-[#00cc33]">USER REGISTRATION v1.0.0</p>
            <p className="text-lg terminal-glow cursor-blink">CREATE NEW ACCOUNT</p>
          </div>

          <form action={signup} className="space-y-6">
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
                SET ACCESS CODE
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[#00cc33]">&gt;</span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  placeholder="min 6 characters"
                  className="terminal-input flex-1 py-1 text-sm"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full terminal-box py-2 text-sm uppercase tracking-widest hover:bg-[#00ff4110] transition-colors terminal-glow"
              >
                [ INITIALIZE USER ]
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-[#003b0f] text-center">
            <p className="text-xs text-[#00cc33]">
              ALREADY REGISTERED?{" "}
              <a href="/login" className="text-[#00ff41] hover:terminal-glow underline underline-offset-4">
                ACCESS TERMINAL
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-[#003b0f] mt-4">
          ALL SESSIONS ARE MONITORED AND LOGGED
        </p>
      </div>
    </div>
  );
}
