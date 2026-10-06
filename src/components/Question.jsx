import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";

export default function Question({
  questionText,
  answers,
  onSelectAnswer,
  selectedAnswer,
  answerState,
  onSkipAnswer,
}) {
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
