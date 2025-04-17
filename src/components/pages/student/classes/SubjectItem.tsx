import React from "react";
import "./Subject-Container.css";

const SubjectItem = ({ name, icon }) => {
  console.log("Icon: ", icon);
  return (
    <button className="subject-item">
      <img src={icon} alt="subject-icon" width={100} />
      <b>
        <span>{name}</span>
      </b>
    </button>
  );
};

export default SubjectItem;
