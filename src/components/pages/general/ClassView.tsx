import React from "react";
import Link from "next/link";
import styles from "./ClassView.module.css";
import { RiArrowRightSLine } from "@remixicon/react";

const ClassView = () => {
  const classes = [
    {
      id: "1-1",
      name: "Algebra I",
      subject: "Mathematics",
      teacher: "Mrs. Johnson",
      startTime: "08:00 AM",
      endTime: "09:30 AM",
    },
    {
      id: "2-1",
      name: "English Literature",
      subject: "English",
      teacher: "Mr. Smith",
      startTime: "09:45 AM",
      endTime: "11:15 AM",
    },
  ];

  return (
    <div className={styles.container}>
      {/* <h1 className={styles.title}>Select a class</h1> */}
      <div className={styles.classList}>
        {classes.map((classItem) => (
          <Link
            key={classItem.id}
            href={`/admin/class/edit/${classItem.id}`}
            className={styles.classCard}
          >
            <div className={styles.classDetails}>
              <h2>{classItem.name}</h2>
              <p>
                Subject: {classItem.subject} | Teacher: {classItem.teacher}
              </p>
              <p>
                Time: {classItem.startTime} - {classItem.endTime}
              </p>
              <p>Class ID: {classItem.id}</p>
            </div>
            <RiArrowRightSLine className={`${styles.arrowIcon}`} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ClassView;
