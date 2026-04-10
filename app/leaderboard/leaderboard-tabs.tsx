"use client";

import { useState } from "react";

interface Row {
  email: string;
  steps: number;
}

interface Props {
  allTime: Row[];
  daily: Row[];
  today: string;
}

export function LeaderboardTabs({ allTime, daily, today }: Props) {
  const [tab, setTab] = useState<"alltime" | "daily">("alltime");
  const rows = tab === "alltime" ? allTime : daily;
  const label = tab === "alltime" ? "ALL TIME" : `TODAY · ${today}`;

  return (
    <>
      <div className="flex gap-0 mb-6">
        <button
          onClick={() => setTab("alltime")}
          className={`flex-1 py-2 text-xs tracking-widest uppercase border transition-colors ${
            tab === "alltime"
              ? "border-terminal-green terminal-glow"
              : "border-terminal-green-dark text-terminal-green-dim hover:text-terminal-green"
          }`}
        >
          All Time
        </button>
        <button
          onClick={() => setTab("daily")}
          className={`flex-1 py-2 text-xs tracking-widest uppercase border-t border-b border-r transition-colors ${
            tab === "daily"
              ? "border-terminal-green terminal-glow"
              : "border-terminal-green-dark text-terminal-green-dim hover:text-terminal-green"
          }`}
        >
          Today
        </button>
      </div>

      <p className="text-xs text-terminal-green-dim tracking-widest mb-4">{label}</p>

      {rows.length === 0 ? (
        <p className="text-terminal-green-dim text-xs tracking-widest text-center py-8">
          NO SCORES YET. BE THE FIRST TO RACE.
        </p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-terminal-green-dim text-xs tracking-widest border-b border-terminal-green-dark">
              <th className="text-left py-2">#</th>
              <th className="text-left py-2">USER</th>
              <th className="text-right py-2">STEPS</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={`border-b border-terminal-green-dark ${i === 0 ? "terminal-glow" : "text-terminal-green-dim"}`}
              >
                <td className="py-2 pr-4">{String(i + 1).padStart(2, "0")}</td>
                <td className="py-2">{row.email.split("@")[0]}</td>
                <td className="py-2 text-right">{row.steps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
