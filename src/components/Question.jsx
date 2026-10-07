import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import QUESTIONS from "../questions.js";
import { useState } from "react";

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  //usestate to store an OBJ
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  //timer function to handle when user selects an answer
  let timer = 10000; // 10 seconds in milliseconds
  //change timer if user selects an answer
  if (answer.selectedAnswer) {
    timer = 1000; // 1 second in milliseconds
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  //function to handle when user selects an answer
  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });
      //_
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  //helper var to determine if the user has selected an answer
  let answerState = "";
  //_
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }
  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeOut={10000}
        onTimeOut={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        answerState={answerState}
        selectedAnswer={answer.selectedAnswer}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
