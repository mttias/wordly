import React from "react";

const ProgressBar = (props) => {
  const { bgcolor, completed, experience, nextlevel } = props;

  const containerStyles = {
    height: 30,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${3 + completed}%`,
    transition: "width ease 0.6s",
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    padding: 5,
    width: 200,
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${experience}⭐️`}</span>
      </div>
      <span style={{ display: "flow", float: "right" }}>{`${nextlevel}⭐️`}</span>
    </div>
  );
};

export default ProgressBar;
