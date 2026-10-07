import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import { useState } from "react";

export default function Question({
  questionText,
  answers,
  onSelectAnswer,
  selectedAnswer,
  answerState,
  onSkipAnswer,
}) {
  //usestate to store an OBJ
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });
  return (
    <div id="question">
      <QuestionTimer timeOut={10000} onTimeOut={onSkipAnswer} />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        answerState={answerState}
        selectedAnswer={selectedAnswer}
        onSelect={onSelectAnswer}
      />
    </div>
  );
}
