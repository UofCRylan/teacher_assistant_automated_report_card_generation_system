import React from "react";
import styles from "../../../styles/general/ui/button.module.css";

const IconButton = ({ icon, text, onClick, width }) => {
  return (
    <button
      className={styles["icon-button"]}
      style={{ textAlign: "left", width: width || "100%" }}
      onClick={() => onClick()}
    >
      {React.cloneElement(icon, { className: "icon" })}
      <span>{text}</span>
    </button>
  );
};

export default IconButton;
