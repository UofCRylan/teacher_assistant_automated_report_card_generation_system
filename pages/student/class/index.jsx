import React, { useEffect, useState } from "react";
import SubjectItem from "@/src/components/pages/student/classes/SubjectItem";
import SubjectManager from "@/src/utils/SubjectManager";
import Layout from "../../../src/components/layout/Layout";
import Link from "next/link";
import scheduleHandler from "@/src/utils/Handlers/ScheduleHandler.ts";
import "@/src/components/pages/student/classes/Subject-Container.css";

const StudentClasses = () => {
  const [classes, setClasses] = useState(undefined);

  const subjects = [
    "Math",
    "Science",
    "English",
    "Social Studies",
    "Gym",
    "Music",
    "Homeroom",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await scheduleHandler.getSchedule();
      setClasses(data.data);

      console.log(data);
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: 50, boxSizing: "border-box" }}>
      <h2>My Classes</h2>
      <div className="subject-container">
        {classes !== undefined &&
          classes.map((cls, index) => {
            console.log("A class: ", cls.class);
            return (
              <Link
                href={`/student/class/${cls.class.class_number}?section=${cls.class.section}`}
              >
                <SubjectItem
                  name={cls.class.class_name}
                  icon={SubjectManager[cls.class.subject]}
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
