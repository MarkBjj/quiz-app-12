import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImage from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

export default function Quiz() {
  // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  // user Answers will also store which question was answered and what answer was selected
  const [userAnswers, setUserAnswers] = useState([]);
  // answer state ('', 'answered', 'correct', 'wrong') used to color the selected answer button
  const [answerState, setAnswerState] = useState("");
  // current answer state
  const [currentAnswer, setCurrentAnswer] = useState("");
  // user active question index will be derived from the index of the answer that user has selected.
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  //checking if quiz complete
  const isQuizComplete = activeQuestionIndex === QUESTIONS.length;
  //.
  //update the answers array when user selects an answer
  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {
      //change answer button color to indicate selection
      setAnswerState("answered");
      // store the answer in the userAnswers array
      setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
      // set timeout to reset the answerState and currentAnswer - did user select the correct answer?
      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
          setCurrentAnswer("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex],
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
        questionText={QUESTIONS[activeQuestionIndex]?.text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
