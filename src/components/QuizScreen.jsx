import React from "react";
import Quiz from "react-quiz-component";
import { quiz } from "../quizData";

export function QuizScreen({ onComplete }) {
  return (
    <div className="w-full flex items-center justify-center py-8 px-4 font-sans">
      <Quiz
        quiz={quiz}
        showInstantFeedback={true}
        onComplete={onComplete}
        // timer={true}
        // timerTime={900}
      />
    </div>
  );
}
