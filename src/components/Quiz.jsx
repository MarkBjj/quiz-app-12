import { useState } from "react";
import QUESTIONS from "../questions.js";

export default function Quiz() {
  //Questions
  // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  // user Answers will also store which question was answered and what answer was selected
  const [userAnswers, setUserAnswers] = useState([]);
  // user active question index will be derived from the index of the answer that user has selected.
  const activeQuestionIndex = userAnswers.length;

  //update the answers array when user selects an answer
  function handleSelectAnswer(selectedAnswer) {
    // store the answer in the userAnswers array
    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
  }
  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex]?.text}</h2>
        {/* list of answers for the active question */}
        <ul id="answers">
          {QUESTIONS[activeQuestionIndex]?.answers.map((answer, index) => (
            <li key={index} className="answer">
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
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
