import React from "react";
import SubjectItem from "@/src/components/pages/student/classes/SubjectItem";
import SubjectManager from "@/src/utils/SubjectManager";
import Layout from "../../../src/components/layout/Layout";
import Link from "next/link";
import "@/src/components/pages/student/classes/Subject-Container.css";

const StudentClasses = () => {
  const subjects = [
    "Math",
    "Science",
    "English",
    "Social Studies",
    "Gym",
    "Music",
    "Homeroom",
  ];

  return (
    <div style={{ padding: 50, boxSizing: "border-box" }}>
      <h2>My Classes</h2>
      <div className="subject-container">
        {subjects &&
          subjects.map((subject, index) => {
            return (
              <Link href={"/student/class/1?section=1"}>
                <SubjectItem
                  name={subject}
                  icon={SubjectManager[subject]}
                  key={index}
                />
              </Link>
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
