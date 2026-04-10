"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

const STEP_INTERVAL_MS = 500;
type Foot = "L" | "R";
type Phase = "idle" | "playing";

function isMilestone(steps: number): boolean {
  if (steps === 10 || steps === 50) return true;
  if (steps >= 100 && steps % 100 === 0) return true;
  return false;
}

function nextMilestone(steps: number): number {
  if (steps < 10) return 10;
  if (steps < 50) return 50;
  return Math.ceil((steps + 1) / 100) * 100;
}

const BODY = `



                        ,////,
                       (======)
                        /// 6|
                        //  _|
                       _/_,-'
                  _.-/'/   \\   ,/;,
               ,-' /'  \\_   \\ / _/
               \`\\ /     _/\\  \` /
                 |     /,  \`\\_/
                 |=====\\'`;

// Left foot back, right foot forward
const LEGS_A = `
   /\\_          /\`      \\
 /' /_\`\`--.__/\\  \`,.    \\
|_/\`  \`-._     \`\\/  \`\\   \`.
           \`-.__/'    \`\\---|
                         \`\\  \\
                           \`\\ \\
                             \\_\\__
                              \\___)`;

// Right foot back, left foot forward
const LEGS_B = `
               /\`      /\\
               /\  \,.     \\
              /    \/ \`\\    \`.
              /---|    \`\\---|
             /  /        /  /
            /  /        /  /
           /__/_       /__/
           (____)      (___)`;



const BODY_COWBOY = `
                         .-.-.
                      _ /     \\ _
                    / \`\\=====/\` \\
                    '.__\`-----\`__.'
                         \`\`\`\`\`
                        /// 6|
                        //  _|
                       _/_,-'
                  _.-/'/   \\   ,/;,
               ,-' /'  \\_   \\ / _/
               \`\\ /     _/\\  \` /
                 |     /,  \`\\_/
                 |=====\\'`;

const RUNNER_A = BODY + LEGS_A;
const RUNNER_B = BODY + LEGS_B;
const RUNNER_A_COWBOY = BODY_COWBOY + LEGS_A;
const RUNNER_B_COWBOY = BODY_COWBOY + LEGS_B;

interface Props {
  userId: string;
  email: string;
}

export function GameCanvas({ userId, email }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [persistedSteps, setPersistedSteps] = useState<number>(0);
  const [loaded, setLoaded] = useState(false);
  const lastFootRef = useRef<Foot | null>(null);
  const lastStepTimeRef = useRef<number>(0);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const milestoneTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [stepCount, setStepCount] = useState(0);
  const [lastFoot, setLastFoot] = useState<Foot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [milestone, setMilestone] = useState<string | null>(null);
  const [rank, setRank] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState<number | null>(null);

  const fetchRank = useCallback(async (steps: number) => {
    const supabase = createClient();
    const [{ count: above }, { count: total }] = await Promise.all([
      supabase.from("leaderboard").select("*", { count: "exact", head: true }).gt("steps", steps),
      supabase.from("leaderboard").select("*", { count: "exact", head: true }),
    ]);
    setRank((above ?? 0) + 1);
    setTotalUsers(total ?? 0);
  }, []);

  // Load existing step count on mount
  useEffect(() => {
    const supabase = createClient();
    const load = async () => {
      const { data } = await supabase
        .from("leaderboard")
        .select("steps")
        .eq("user_id", userId)
        .single();
      const saved = data?.steps ?? 0;
      setPersistedSteps(saved);
      setStepCount(saved);
      setLoaded(true);
      const [{ count: above }, { count: total }] = await Promise.all([
        supabase.from("leaderboard").select("*", { count: "exact", head: true }).gt("steps", saved),
        supabase.from("leaderboard").select("*", { count: "exact", head: true }),
      ]);
      setRank((above ?? 0) + 1);
      setTotalUsers(total ?? 0);
    };
    load();
  }, [userId]);

  const showError = useCallback((msg: string) => {
    setError(msg);
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    errorTimerRef.current = setTimeout(() => setError(null), 1500);
  }, []);

  const showMilestone = useCallback((msg: string) => {
    setMilestone(msg);
    if (milestoneTimerRef.current) clearTimeout(milestoneTimerRef.current);
    milestoneTimerRef.current = setTimeout(() => setMilestone(null), 2000);
  }, []);

  const saveScore = useCallback(async (steps: number) => {
    const supabase = createClient();
    await supabase.from("leaderboard").upsert(
      { user_id: userId, email, steps },
      { onConflict: "user_id" }
    );
    fetchRank(steps);
  }, [userId, email, fetchRank]);

  const startGame = useCallback(() => {
    lastFootRef.current = null;
    lastStepTimeRef.current = 0;
    setStepCount(persistedSteps);
    setLastFoot(null);
    setError(null);
    setMilestone(null);
    setPhase("playing");
  }, [persistedSteps]);

  useEffect(() => {
    if (phase !== "playing") return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();

      const foot: Foot = e.key === "ArrowRight" ? "R" : "L";
      const now = Date.now();

      if (now - lastStepTimeRef.current < STEP_INTERVAL_MS) {
        showError("ERROR! Slow down Cowboy");
        return;
      }

      if (lastFootRef.current === foot) {
        showError("ERROR! Watch your step!");
        return;
      }

      lastFootRef.current = foot;
      lastStepTimeRef.current = now;
      setLastFoot(foot);
      setStepCount((c) => {
        const next = c + 1;
        if (isMilestone(next)) {
          saveScore(next);
          showMilestone(`CHECKPOINT: ${next} STEPS`);
        }
        return next;
      });
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [phase, showError, showMilestone, saveScore]);

  return (
    <div className="flex-1 relative flex flex-col items-center justify-center gap-8">
      {phase === "playing" && (
        <div className="absolute top-8 right-60 text-right">
          <p className="text-xs text-terminal-green-dim tracking-widest">NEXT CHECKPOINT</p>
          <p className="text-3xl terminal-glow tracking-widest font-bold">
            {String(nextMilestone(stepCount)).padStart(4, "0")}
          </p>
        </div>
      )}

      {phase === "playing" && (
        <div className="absolute top-8 left-80">
          <p className="text-3xl terminal-glow tracking-widest font-bold">
            {String(stepCount).padStart(4, "0")}
          </p>
          <p className="text-xs text-terminal-green-dim tracking-widest">STEPS</p>
          {rank !== null && (
            <>
              <p className="text-3xl terminal-glow tracking-widest font-bold mt-4">
                #{String(rank).padStart(2, "0")}
              </p>
              <p className="text-xs text-terminal-green-dim tracking-widest">
                RANK OF {totalUsers}
              </p>
            </>
          )}
        </div>
      )}

      <pre className="terminal-glow text-terminal-green leading-snug select-none text-sm">
        {error?.includes("Cowboy")
          ? (lastFoot === "R" ? RUNNER_B_COWBOY : RUNNER_A_COWBOY)
          : (lastFoot === "R" ? RUNNER_B : RUNNER_A)}
      </pre>

      {phase === "idle" && (
        <>
          <div className="text-center space-y-2">
            <p className="text-lg terminal-glow tracking-widest cursor-blink">READY TO RACE</p>
            {loaded && persistedSteps > 0 && (
              <p className="text-xs text-terminal-green-dim tracking-widest">
                CONTINUING FROM STEP {persistedSteps}
              </p>
            )}
            <p className="text-xs text-terminal-green-dim tracking-widest">
              METALAB SPEED WALKING CHAMPIONSHIP
            </p>
          </div>
          <button
            onClick={startGame}
            disabled={!loaded}
            className="terminal-box px-8 py-3 text-sm uppercase tracking-widest hover:bg-terminal-green-dark transition-colors terminal-glow disabled:opacity-40"
          >
            {!loaded ? "[ LOADING... ]" : persistedSteps > 0 ? "[ CONTINUE RACE ]" : "[ START RACE ]"}
          </button>
        </>
      )}

      {phase === "playing" && (
        <>
          <div className="h-8 flex items-center justify-center">
            {error ? (
              <span className="text-xl terminal-glow tracking-widest animate-pulse">{error}</span>
            ) : milestone ? (
              <span className="text-sm terminal-glow tracking-widest animate-pulse">{milestone}</span>
            ) : (
              <div className="flex items-center gap-6 text-sm tracking-widest">
                <span className={lastFoot !== "L" ? "terminal-glow" : "text-terminal-green-dark"}>
                  {"<"} L
                </span>
                <span className={lastFoot !== "R" ? "terminal-glow" : "text-terminal-green-dark"}>
                  R {">"}
                </span>
              </div>
            )}
          </div>
          <p className="text-xs text-terminal-green-dark tracking-widest">
            ← LEFT FOOT &nbsp;&nbsp; RIGHT FOOT →
          </p>
        </>
      )}
    </div>
  );
}
