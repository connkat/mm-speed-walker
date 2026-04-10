import { LoginForm } from "./login-form";

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
          <div className="border-b border-terminal-green pb-3 mb-6">
            <p className="text-xs text-terminal-green-dim">SYSTEM LOGIN v1.0.0</p>
            <p className="text-lg terminal-glow cursor-blink">AUTHENTICATION REQUIRED</p>
          </div>

          <LoginForm />

          <div className="mt-6 pt-4 border-t border-terminal-green-dark text-center">
            <p className="text-xs text-terminal-green-dim">
              NEW USER? JUST ENTER YOUR EMAIL + ACCESS CODE
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-terminal-green-dark mt-4">
          UNAUTHORIZED ACCESS IS PROHIBITED
        </p>
      </div>
    </div>
  );
}
