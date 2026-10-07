import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImage from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

export default function Quiz() {
  //usestate function
  // user Answers will also store which question was answered and what answer was selected
  const [userAnswers, setUserAnswers] = useState([]);
  // user active question index will be derived from the index of the answer that user has selected.
  const activeQuestionIndex = userAnswers.length;
  //checking if quiz complete
  const isQuizComplete = activeQuestionIndex === QUESTIONS.length;
  //.
  //update the answers array when user selects an answer
  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {
      // store the answer in the userAnswers array
      setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
    },
    [],
  );

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  //stop fetching questions if quiz is complete
  if (isQuizComplete) {
    return (
      <div id="summary">
        <div id="question">
          <img src={quizCompleteImage} alt="Trophy - Quiz Complete" />
          <p>Quiz Complete!</p>
        </div>
      </div>
    );
  }

  //determine when the quiz is complete

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
