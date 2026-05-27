import React, { useEffect, useRef } from "react";
import { LeaderboardList } from "./LeaderboardList";
import {
  buildEntry,
  getPlayerRank,
  getRankBadge,
  getScoreMeta,
} from "../utils/scores";

export function ResultsScreen({
  result,
  playerName,
  leaderboard,
  onSave,
  onPlayAgain,
}) {
  const savedRef = useRef(false);

  // Save exactly once when this screen mounts (quiz just finished)
  useEffect(() => {
    if (!savedRef.current) {
      savedRef.current = true;
      const entry = buildEntry(playerName, result);
      onSave(entry);
    }
  }, []);

  const entry = buildEntry(playerName, result);
  const { percentage, score, correct, total } = entry;
  const { color, label } = getScoreMeta(percentage);
  const rank = getPlayerRank(leaderboard, playerName, score);
  const rankBadge = getRankBadge(rank);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-start py-16 px-4">
      <div className="w-full max-w-md space-y-5">
        {/* Score card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
            Your score
          </p>
          <p className={`text-7xl font-black tracking-tight mb-2 ${color}`}>
            {percentage}%
          </p>
          <p className="text-slate-600 font-medium">{label}</p>

          {rank > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-slate-100 rounded-full px-4 py-1.5 text-sm font-medium text-slate-700">
              <span className="text-lg">{rankBadge.label}</span>
              <span>
                Ranked{" "}
                {rank === 1
                  ? "1st"
                  : rank === 2
                    ? "2nd"
                    : rank === 3
                      ? "3rd"
                      : `${rank}th`}{" "}
                overall
              </span>
            </div>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Correct", value: correct, color: "text-emerald-600" },
            { label: "Wrong", value: total - correct, color: "text-red-500" },
            { label: "Points", value: score, color: "text-indigo-600" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-slate-200 p-4 text-center"
            >
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Leaderboard — already updated, passed as prop */}
        <LeaderboardList
          leaderboard={leaderboard}
          highlightName={playerName}
          highlightScore={score}
        />

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors"
          >
            Play again
          </button>
        </div>
      </div>
    </div>
  );
}
