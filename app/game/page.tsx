import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { GameCanvas } from "./game-canvas";
import { GameHeader } from "./game-header";

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
      <GameHeader email={user.email!} />

      <GameCanvas userId={user.id} email={user.email!} />
    </div>
  );
}
