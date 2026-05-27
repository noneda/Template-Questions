import { useState, useEffect, useCallback } from "react";

import { getLeaderboard, saveScore } from "../utils/scores";

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  const [loading, setLoading] = useState(true);

  // =========================
  // LOAD LEADERBOARD
  // =========================

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await getLeaderboard();

        setLeaderboard(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);

        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  // =========================
  // SAVE SCORE
  // =========================

  const save = useCallback(async (entry) => {
    try {
      const updated = await saveScore(entry);

      setLeaderboard(Array.isArray(updated) ? updated : []);

      return updated;
    } catch (error) {
      console.error(error);

      return [];
    }
  }, []);

  return {
    leaderboard,
    loading,
    save,
  };
}
