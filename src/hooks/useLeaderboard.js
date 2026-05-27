import { useState, useCallback } from "react";
import { getLeaderboard, saveScore, clearLeaderboard } from "../utils/scores";

export function useLeaderboard() {
  // Load once when the hook is first used (app start or results screen mount)
  const [leaderboard, setLeaderboard] = useState(() => getLeaderboard());

  const save = useCallback((entry) => {
    const updated = saveScore(entry);
    setLeaderboard(updated);
    return updated;
  }, []);

  const reset = useCallback(() => {
    clearLeaderboard();
    setLeaderboard([]);
  }, []);

  return { leaderboard, save, reset };
}
