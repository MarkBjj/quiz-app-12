import { useState, useEffect } from "react";
export default function QuestionTimer({ timeOut, onTimeOut }) {
  // update progress bar every second
  const [remainingTime, setRemainingTime] = useState(timeOut);

  // start the timeout only when timeOut or onTimeOut change, not on every re-render
  useEffect(() => {
    console.log("SETTING TIMEOUT ");
    const timeout = setTimeout(onTimeOut, timeOut);
    return () => clearTimeout(timeout);
  }, [timeOut, onTimeOut]);
  //
  // const [timeLeft, setTimeLeft] = useState(timeLimit);
  //update interval -  the interval is set up only once, when the component first appears. Without it, a new interval would start on every re-render
  useEffect(() => {
    console.log("SETTING INTERVAL");
    const interval = setInterval(() => {
      setRemainingTime((previousRemainingTime) => previousRemainingTime - 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <progress id="question_time" value={remainingTime} max={timeOut}></progress>
  );
}
