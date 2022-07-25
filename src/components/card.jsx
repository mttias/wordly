import { useEffect, useState } from "react";
import Notification from "./Notification";

// Flashcard game component

const PromptCard = (props) => {
  const [card, setCard] = useState(props.card[0]);
  const [userAnswer, updateUserAnswer] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const flipped = 0;
  const [cardId, setCardId] = useState(0);
  const [notification, setNotification] = useState(false);
  const children = [];

  useEffect(() => {
    setCard(props.card[cardId]);
  }, [props.card, cardId]);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserAnswer(userAnswer);
    if (userAnswer === "") return;

    if (e.target.value === card.answer) {
      setIsCorrect(true);
    } else {
      setIsWrong(true);
    }
  };

  const handleReset = () => {
    setIsFlipped(false);
    setIsCorrect(false);
    setIsWrong(false);
    setIsDisabled(false);
  };

  const nextQuestion = () => {
    if (cardId < props.card.length - 1) {
      setCardId(cardId + 1);
      setNotification(false);
    } else {
      setCardId(0);
      setNotification(true);
      children.push(
        <Notification message="You have completed all the cards available." />
      );
    }
  };

  return (
    <div>
      <div className="card p-6 rounded-lg shadow-lg bg-white max-w-sm text-gray-900 text-2xl py-3 font-semibold">
        {notification ? (
          <Notification message="You have completed all the cards available." />
        ) : (
          ""
        )}
        {children}
        <div className="card-inner">
          <div className="card-content pb-8">
            <div className="card-front">
              <div className="card-front-inner">
                <div className="card-front-inner-text">
                  {isFlipped ? "" : card.flag}
                  {isFlipped ? "" : card.question}
                </div>
              </div>
            </div>
            <div className="card-back">
              <div className="card-back-inner">
                <div className="card-back-inner-text">
                  {!isFlipped ? "" : card.answer}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer px-5">
          <div className="card-buttons">
            <button
              className="card-button bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={handleClick}
            >
              {isFlipped ? "Show Country" : "Show Capital"}
            </button>
            {/* USER INPUT */}
            {/*           <form>
            <input
              type="text"
              name="answer"
              placeholder="Ditt svar"
              value={userAnswer}
              onChange={(event) => updateUserAnswer(event.target.value)}
            />
            <button
              className="card-button bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              disabled={isDisabled}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form> */}
            <button
              className="card-button bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              disabled={isDisabled}
              onClick={nextQuestion}
            >
              Next question
            </button>
          </div>
        </div>
        {isCorrect && <div className="card-correct">Correct!</div>}
        {/* IS RIGHT OR WRONG? */}
        {/* {isWrong && (
        <div className="card-wrong">
          Wrong! You answered {userAnswer}. The the correct answer is{" "}
          {card.answer}.
        </div>
      )} */}
      </div>
      <p className="text-xs align-bottom text-black">
        <a
          href={
            "https://www.cia.gov/the-world-factbook/countries/" +
            card.lowerCase +
            "/"
          }
        >
          Read more about {card.question}
        </a>
      </p>
    </div>
  );
};

/*
const AnswerCard = (props) => {
  const { prompt, answer } = props;
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">{prompt}</div>
        <div className="card-text">{answer}</div>
        <div className="card-footer">
          <button
            className="btn btn-primary"
            onClick={() => {
              setIsAnswered(true);
              setIsCorrect(true);
            }}
          >
            Correct
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              setIsAnswered(true);
              setIsCorrect(false);
            }}
          >
            Incorrect
          </button>
        </div>
      </div>
    </div>
  );
}; */

export default PromptCard;
