import Confetti from "react-confetti";

const StyledConfettiAnimation = ({ confettiIsRunning, setConfettiIsRunning }) => {
  return (
    <Confetti
      recycle={false}
      gravity={0.2}
      numberOfPieces={confettiIsRunning ? 300 : 0}
      onConfettiComplete={(c) => {
        setConfettiIsRunning(false);
        if (c) c.reset();
      }}
    />
  );
};

export default StyledConfettiAnimation;
