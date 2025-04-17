import React from "react";
import SubjectItem from "@/src/components/pages/student/classes/SubjectItem";
import SubjectManager from "@/src/utils/SubjectManager";
import Layout from "../../../src/components/layout/Layout";
import "@/src/components/pages/student/classes/Subject-Container.css";

const StudentClasses = () => {
  const subjects = ["Math", "Science", "English", "SS"];
  return (
    <div>
      <h2>My Classes</h2>
      <div className="subject-container">
        {subjects &&
          subjects.map((subject, index) => {
            return (
              <SubjectItem
                name={subject}
                icon={SubjectManager[subject]}
                key={index}
              />
            );
          })}
      </div>
    </div>
  );
};

StudentClasses.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default StudentClasses;
