import React, { useState } from "react";
import { StartScreen } from "./components/StartScreen";
import { QuizScreen } from "./components/QuizScreen";
import { ResultsScreen } from "./components/ResultsScreen";
import { useLeaderboard } from "./hooks/useLeaderboard";

// Screens: "start" | "quiz" | "results"

export default function App() {
  const [screen, setScreen] = useState("start");
  const [playerName, setPlayerName] = useState("");
  const [quizResult, setQuizResult] = useState(null);

  // Single source of truth for leaderboard — loaded once at app start
  const { leaderboard, save, loading } = useLeaderboard();

  const handleQuizComplete = (result) => {
    setQuizResult(result);
    setScreen("results");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handlePlayAgain = () => {
    setPlayerName("");
    setQuizResult(null);
    setScreen("start");
  };

  if (screen === "start") {
    return (
      <StartScreen
        playerName={playerName}
        setPlayerName={setPlayerName}
        onStart={() => setScreen("quiz")}
        leaderboard={leaderboard}
      />
    );
  }

  if (screen === "quiz") {
    return <QuizScreen onComplete={handleQuizComplete} />;
  }

  if (screen === "results") {
    return (
      <ResultsScreen
        result={quizResult}
        playerName={playerName}
        leaderboard={leaderboard}
        onSave={save}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  return null;
}
