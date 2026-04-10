import { SignupForm } from "./signup-form";

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
          <div className="border-b border-terminal-green pb-3 mb-6">
            <p className="text-xs text-terminal-green-dim">USER REGISTRATION v1.0.0</p>
            <p className="text-lg terminal-glow cursor-blink">CREATE NEW ACCOUNT</p>
          </div>

          <SignupForm />

          <div className="mt-6 pt-4 border-t border-terminal-green-dark text-center">
            <p className="text-xs text-terminal-green-dim">
              ALREADY REGISTERED?{" "}
              <a href="/login" className="text-terminal-green hover:terminal-glow underline underline-offset-4">
                ACCESS TERMINAL
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-terminal-green-dark mt-4">
          ALL SESSIONS ARE MONITORED AND LOGGED
        </p>
      </div>
    </div>
  );
}
