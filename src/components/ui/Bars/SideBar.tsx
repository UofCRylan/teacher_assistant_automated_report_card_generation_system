import React from "react";
import "@/src/styles/general/ui/bars.css";

const SideBar = ({ options = [], selected, handleChange }) => {
  return (
    <div className="side-bar">
      {options &&
        options.map((item, index) => {
          return (
            <button
              className={`option ${selected === item ? "selected" : ""}`}
              onClick={() => handleChange(item)}
              key={index}
            >
              {item}
            </button>
          );
        })}
    </div>
  );
};

export default SideBar;
