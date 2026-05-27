const STORAGE_KEY = "quiz_leaderboard";

export function getLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveScore(entry) {
  const current = getLeaderboard();
  const updated = [...current, entry].sort((a, b) => b.score - a.score);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function clearLeaderboard() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getPlayerRank(leaderboard, name, score) {
  return leaderboard.findIndex((e) => e.name === name && e.score === score) + 1;
}

export function getRankBadge(rank) {
  if (rank === 1) return { label: "🥇", color: "text-amber-500" };
  if (rank === 2) return { label: "🥈", color: "text-slate-400" };
  if (rank === 3) return { label: "🥉", color: "text-orange-400" };
  return { label: `#${rank}`, color: "text-slate-500" };
}

export function getScoreMeta(percentage) {
  if (percentage >= 90)
    return { color: "text-emerald-600", label: "Outstanding! 🚀" };
  if (percentage >= 75)
    return { color: "text-emerald-500", label: "Great job! 🎉" };
  if (percentage >= 50)
    return { color: "text-amber-500", label: "Not bad! Keep going 💪" };
  return { color: "text-red-500", label: "Better luck next time 😅" };
}

export function buildEntry(playerName, result) {
  const correctAnswers = result.numberOfCorrectAnswers;
  const totalQuestions = result.numberOfQuestions;
  const percentage =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  return {
    name: playerName,
    score: result.totalPoints,
    correct: correctAnswers,
    total: totalQuestions,
    percentage,
    date: new Date().toISOString(),
  };
}
