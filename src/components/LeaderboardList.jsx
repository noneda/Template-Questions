import React from "react";
import { getRankBadge } from "../utils/scores";

export function LeaderboardList({
  leaderboard,
  highlightName,
  highlightScore,
  limit = 10,
}) {
  if (!leaderboard.length) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-xs font-semibold text-slate-500 mb-4 uppercase tracking-widest">
        Leaderboard
      </h2>
      <ul className="space-y-1">
        {leaderboard.slice(0, limit).map((entry, i) => {
          const badge = getRankBadge(i + 1);
          const isMe =
            highlightName &&
            entry.name === highlightName &&
            entry.score === highlightScore;

          return (
            <li
              key={i}
              className={`flex items-center justify-between py-2 px-3 rounded-lg transition ${
                isMe
                  ? "bg-indigo-50 border border-indigo-100"
                  : "border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-base w-6 text-center ${badge.color}`}>
                  {badge.label}
                </span>
                <span
                  className={`text-sm font-medium ${
                    isMe ? "text-indigo-700" : "text-slate-700"
                  }`}
                >
                  {entry.name}
                  {isMe && (
                    <span className="ml-2 text-xs font-normal text-indigo-400">
                      you
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-bold ${
                    isMe ? "text-indigo-600" : "text-slate-600"
                  }`}
                >
                  {entry.score} pts
                </span>
                <span className="text-xs text-slate-400">
                  {entry.percentage}%
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
