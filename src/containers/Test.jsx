import { useEffect, useState } from "react";
import Glow from "../components/Glow";
import ProgressBar from "../components/ProgressBar";
import ExperiencePoints from "../components/xpoints";
import Confetti from "../components/Confetti";
import ThumbsDown from "../components/ThumbsDown";

const MAX_ATTEMPTS = 2;

const Test = () => {
  const [correctAmount, setCorrectAmount] = useState(0);
  const [factorOne, setFactorOne] = useState(2);
  const [factorTwo, setFactorTwo] = useState(5);
  const [isBoosted, setIsBoosted] = useState(false);
  const [userAnswer, updateUserAnswer] = useState(0);
  const [isCorrect, updateIsCorrect] = useState(false);
  const [points, updatePoints] = useState(0);
  const [experiencePoints, updateExperiencePoints] = useState(0);
  const [confettiIsRunning, setConfettiIsRunning] = useState(false);
  const [thumbsDownIsRunning, setThumbsDownIsRunning] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [progress, updateProgress] = useState(0);
  const [nextLevel, updateNextLevel] = useState(1000);

  useEffect(() => {
    nextQuestion();
  }, []);

  const checkAnswer = (e) => {
    e.preventDefault();
    updateUserAnswer(userAnswer);
    console.log("progress", progress);
    console.log("nextLevel", nextLevel);
    console.log("experiencePoints", experiencePoints);
    console.log("=========");
    if (userAnswer === "") return;

    if (Number(userAnswer) === result) {
      nextQuestion("correct");

      let pointBoost = isBoosted ? getRandomInt(9) + 1 : 1;
      updatePoints(points + pointBoost);
      updateExperiencePoints(experiencePoints + (20 + Math.floor(getRandomInt(40))));
      setCorrectAmount(correctAmount + 1);

      // EXPERIENCE POINTS AND PROGRESS BAR
      // ADD THIS MANY EXP. POINTS
      const addExperiencePoints = 100 + Math.floor(getRandomInt(120));
      updateExperiencePoints(experiencePoints + addExperiencePoints);
      // UPDATE PROGRESS BAR
      let exp = experiencePoints + addExperiencePoints;
      const newProgress = (exp / 1000) * 100;

      // UPDATE LEVEL WHEN PROGRESS > 100%
      if (newProgress > 100) {
        console.log("progress+inc", newProgress);
        updateNextLevel(nextLevel + 1000);
        setConfettiIsRunning(true);
        updateProgress(0);
      } else {
        updateProgress(newProgress);
      }
    } else {
      setThumbsDownIsRunning(true);
      updateIsCorrect(false);

      let newAttempts = attempts + 1;
      setAttempts(newAttempts);
      updateUserAnswer("");
      if (newAttempts === MAX_ATTEMPTS) {
        nextQuestion("incorrect");
      }
    }
  };

  const nextQuestion = (result) => {
    setFactorOne(getRandomInt(10));
    setFactorTwo(getRandomInt(10));
    setIsBoosted(Math.random() > 0.5);
    setAttempts(0);

    updateUserAnswer("");
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <div
      className="App"
      style={{
        background: "#282c34",
        width: "100vw",
        height: "100vh",
      }}
    >
      <ThumbsDown
        thumbsDownIsRunning={thumbsDownIsRunning}
        setThumbsDownIsRunning={setThumbsDownIsRunning}
      />
      <Confetti confettiIsRunning={confettiIsRunning} setConfettiIsRunning={setConfettiIsRunning} />
      <Header correctAmount={correctAmount} experiencePoints={experiencePoints} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <div style={{ marginBottom: 32, marginTop: "10vh", position: "relative" }}>
          {isBoosted && <Glow style={{ width: "100%", height: 80, marginTop: 24 }} />}
          {isBoosted && <p style={{ margin: 0, opacity: 0.5, marginBottom: -30 }}>Boosted!</p>}
          <h1 style={{ fontSize: 80, zIndex: 100, margin: 0 }}>
            {factorOne} × {factorTwo}
          </h1>
          {attempts === MAX_ATTEMPTS - 1 ? (
            <p style={{ color: "yellow", opacity: 0.7 }}>Sista försöket!</p>
          ) : (
            <div style={{ height: 24 }} />
          )}
        </div>
        <br />
        <form style={{ display: "flex", flexDirection: "column" }}>
          <input
            style={{
              color: "black",
              padding: "16px 24px",
              borderRadius: 200,
              boxSizing: "border-box",
            }}
            type="number"
            name="answer"
            placeholder="Ditt svar"
            value={userAnswer}
            onChange={(event) => updateUserAnswer(event.target.value)}
          />
          <button
            style={{
              color: "black",
              padding: "16px 24px",
              borderRadius: 200,
              marginTop: 6,
              background: "orange",
            }}
            onClick={checkAnswer}
          >
            Svara
          </button>
        </form>
        <div style={{ width: "100%", padding: 40 }}>
          <ProgressBar
            bgcolor="#ef6c00"
            completed={progress}
            experience={experiencePoints}
            nextlevel={nextLevel}
          />
        </div>
      </div>
    </div>
  );
};

const Header = ({ correctAmount, experiencePoints }) => {
  return (
    <div className="flex justify-between">
      <div
        style={{
          color: "white",
          background: "rgba(255,255,255,0.1)",
          padding: 10,
          // display: "flex",
          // justifyContent: "flex-start",
          // alignItems: "center",
          width: "100%",
        }}
        className="flex justify-between"
      >
        <p style={{ margin: 0, lineHeight: 1, textAlign: "left", marginRight: "6em" }}>
          Antal <br />
          rätt:<span style={{ fontSize: 36, fontWeight: "bold" }}>{correctAmount}</span>
        </p>

        <p style={{ margin: 0, lineHeight: 1, textAlign: "left", marginRight: 12 }}>
          Poäng:<span style={{ fontSize: 36, fontWeight: "bold" }}>{experiencePoints}</span>
        </p>
      </div>
    </div>
  );
};

export default Test;
