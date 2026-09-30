import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import quizCompleteImage from "../assets/quiz-complete.png";

export default function Quiz() {
  //Questions
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

  // the default file has the 1st answer as correct, so we need to shuffle the answers so that the correct answer is not always the first one. We can do this by shuffling the answers array for each question. CREATE NEW array to preserve default order of answers file. We can use the spread operator to create a new array and then use the sort method to shuffle the answers. The sort method takes a compare function that returns a random number between -0.5 and 0.5, which will randomly sort the answers.
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);
  //determine when the quiz is complete

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeOut={10000}
          onTimeOut={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex]?.text}</h2>
        {/* list of answers for the active question */}
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClasses = "";
            if (answerState === "answered" && isSelected) {
              cssClasses = "selected";
            }
            if (
              (answerState === "correct" || answerState === "wrong") &&
              isSelected
            ) {
              cssClasses = answerState;
            }
            return (
              <li key={answer} className="answer">
                {/*
                We wrap handleSelectAnswer in an arrow function so it is NOT called while React renders.
                Writing onClick={handleSelectAnswer(answer)}
                would execute the function immediately on every render (and update state, causing an infinite loop).
                The arrow function is a new
                function that React stores and only runs when the button is clicked.
                It also lets us pass the `answer` from this map iteration as an argument,
                which we couldn't do with onClick={handleSelectAnswer}
                because React would pass the click event instead.
              */}
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClasses}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
