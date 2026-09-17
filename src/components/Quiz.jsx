import { useState } from "react";
export default function Quiz() {
  //Questions
  // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  // user Answers will also store which question was answered and what answer was selected
  const [userAnswers, setUserAnswers] = useState([]);
  // user active question index will be derived from the index of the answer that user has selected.
  const activeQuestionIndex = userAnswers.length;
  return (
    <div>
      <h2>Quiz Questions</h2>

      <p>Currently active question: {activeQuestionIndex + 1}</p>
    </div>
  );
}
