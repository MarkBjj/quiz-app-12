import { useRef } from "react";
export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef(null);
  // the default file has the 1st answer as correct, so we need to shuffle the answers so that the correct answer is not always the first one. We can do this by shuffling the answers array for each question. CREATE NEW array to preserve default order of answers file. We can use the spread operator to create a new array and then use the sort method to shuffle the answers.
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }
  // list of answers for the active question
  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
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
              onClick={() => onSelect(answer)}
              className={cssClasses}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
