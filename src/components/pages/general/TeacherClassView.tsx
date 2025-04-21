import React from "react";
import Link from "next/link";
import styles from "./ClassView.module.css";
import { RiArrowRightSLine } from "@remixicon/react";

const TeacherClassView = ({ classes }) => {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Your Classes</h1>
        <div className={styles.classList}>
          {classes.map((classItem) => (
            <Link
              key={classItem.class_number}
              href={`/teacher/attendance/${classItem.class_number}?section=${classItem.section}`}
              className={styles.classCard}
            >
              <div className={styles.classInfo}>
                <h2 className={styles.className}>{classItem.class_name}</h2>
                <div className={styles.detailsGrid}>
                  <Info label="Subject" value={classItem.subject} />
                  <Info
                    label="Time"
                    value={`${classItem.time_start} - ${classItem.time_end}`}
                  />
                  <Info
                    label="Room"
                    value={`${classItem.room.building}-${classItem.room.room_number}`}
                  />
                  <Info
                    label="Teacher"
                    value={classItem.teacher.data.full_name}
                  />
                  <Info label="Class ID" value={`${classItem.class_number}`} />
                  <Info label="Section" value={`${classItem.section}`} />
                </div>
              </div>
              <RiArrowRightSLine className={styles.arrowIcon} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className={styles.infoItem}>
    <span className={styles.label}>{label}:</span>
    <span className={styles.value}>{value}</span>
  </div>
);

export default TeacherClassView;
