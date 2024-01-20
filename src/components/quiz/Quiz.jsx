import { useRef, useState } from "react";
import { data } from "../../assets/data";
import "./quiz.css";

function Quiz() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [isLock, setIsLock] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const option1 = useRef();
  const option2 = useRef();
  const option3 = useRef();
  const option4 = useRef();

  var optionsArray = [option1, option2, option3, option4];

  const checkAns = (element, answer) => {
    if (isLock == false) {
      if (question.ans == answer) {
        element.target.classList.add("correct");
        setScore(score + 1);
        setIsLock(true);
      } else {
        element.target.classList.add("wrong");
        setIsLock(true);
      }
    }
  };

  const next = () => {
    if (isLock === true) {
      if (index === data.length - 1) {
        setFinished(true);
        return;
      }

      setIndex(index + 1);
      setQuestion(data[index + 1]);
      setIsLock(false);
      optionsArray.forEach((el) => el.current.classList.remove("correct", "wrong"));
    }
  };
  

const reset = () => {
  setIndex(0);
  setQuestion(data[0]);
  setScore(0);
  setIsLock(false);
  setFinished(false);
}


  return (
    <div className="container">
      <h1>QUIZ APP</h1>
      <hr />
      {finished ? (
        <>
        <h2>You scored {score} out of {data.length}</h2>
        <button onClick={reset}>Reset</button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {data.length} Questions{" "}
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
