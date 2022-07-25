import { useState, useEffect } from "react";

const getMessage = () => {
  let val = Math.random();
  if (val < 0.2) {
    return "Fel!";
  } else if (val < 0.4) {
    return "Försök igen";
  } else if (val < 0.6) {
    return "Inte riktigt";
  } else if (val < 0.8) {
    return ":(";
  } else {
    return "Nope";
  }
};

export default function ThumbsDownAnimation({ thumbsDownIsRunning, setThumbsDownIsRunning }) {
  const [thumbOpacity, setThumbOpacity] = useState(0);
  const [thumbScale, setThumbScale] = useState(0);
  const [thumbLeft, setThumbLeft] = useState(window.innerWidth / 2 - 20);
  const [thumbTop, setThumbTop] = useState("40vh");
  const [msg, setMsg] = useState(getMessage());

  useEffect(() => {
    if (thumbsDownIsRunning === true) {
      playAnimation();
      setMsg(getMessage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thumbsDownIsRunning]);

  function playAnimation() {
    setThumbOpacity(1);
    setThumbScale(1);
    setThumbLeft(Math.random() * (window.innerWidth * 0.7) - 140);
    setThumbLeft(Math.random() * (window.innerWidth * 0.7) - 140);
    setThumbTop(20 + Math.random() * 40 + "vh");

    setTimeout(function () {
      setThumbScale(0.2);
      setThumbOpacity(0);
      setThumbsDownIsRunning(false);
    }, 800);
  }

  return (
    <div
      id="animatedThumb"
      style={{
        transform: "scale(" + thumbScale + ") ",
        position: "absolute",
        left: thumbLeft,
        top: thumbTop,
        opacity: thumbOpacity,
        transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(.16,.98,.36,1.6)",
        zIndex: 100,
      }}
    >
      <p style={{ color: "red", fontSize: 100 }}>{msg}</p>
    </div>
  );
}
