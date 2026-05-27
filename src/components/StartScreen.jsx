import React from "react";
import { LeaderboardList } from "./LeaderboardList";

export function StartScreen({
  playerName,
  setPlayerName,
  onStart,
  leaderboard,
}) {
  const canStart = playerName.trim().length > 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-start py-16 px-4">
      <div className="w-full max-w-md space-y-5">
        {/* Header */}
        <div className="text-center mb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white text-3xl mb-4">
            🧠
          </div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Quiz Challenge
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Test your knowledge and climb the leaderboard
          </p>
        </div>

        {/* Input card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Your nickname
          </label>
          <input
            type="text"
            placeholder="e.g. QuizMaster99"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && canStart && onStart()}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button
            disabled={!canStart}
            onClick={onStart}
            className="mt-4 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
          >
            Start Quiz →
          </button>
        </div>

        {/* Leaderboard — passed in as prop, no fetch here */}
        <LeaderboardList leaderboard={leaderboard} />
      </div>
    </div>
  );
}
