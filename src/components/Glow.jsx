import { useRef, useEffect, useState } from "react";

import "./Glow.css";

const questionblobInfo = [
  { x: "15%", y: "20%", diam: 200 },
  { x: "50%", y: "40%", diam: 300 },
  { x: "75%", y: "40%", diam: 200 },
  { x: "80%", y: "70%", diam: 100 },
];

const Glow = ({ children, style }) => {
  const [blobs] = useState(questionblobInfo);
  return (
    <div
      style={{
        top: 0,
        position: "absolute",
        ...style,
      }}
    >
      {blobs.map((info, i) => {
        return <Blob info={info} i={i} key={i} />;
      })}
      {children}
    </div>
  );
};

const Blob = ({ info, i }) => {
  let yPos = "calc(" + info.y + " - " + info.diam / 2 + "px)";
  let xPos = "calc(" + info.x + " - " + info.diam / 2 + "px)";

  return (
    <div
      style={{
        width: info.diam,
        height: info.diam,
        position: "absolute",
        top: yPos,
        left: xPos,
        background:
          "radial-gradient(circle, rgba(253,255,84,1) 0%, rgba(16,214,239,0) 32%, rgba(0,212,255,0) 100%)",
        borderRadius: "100%",
        zIndex: 0,
        animation: "blobsExpand 8s infinite alternate",
        animationDelay: i * 2 + "s",
        transition: "0.8s cubic-bezier(.52,.08,.58,.93)",
        opacity: 0.5,
      }}
    />
  );
};

export default Glow;
