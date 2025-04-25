import React from "react";
import Link from "next/link";
import styles from "./ClassView.module.css";
import { RiArrowRightSLine } from "@remixicon/react";

const AdminScheduledClassView = ({ classes, link }) => {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>All Classes</h1>
        <div className={styles.classList}>
          {classes.map((classItem) => (
            <Link
              key={`${classItem.class.class_number} - ${classItem.class.section}`}
              href={`/admin/${link}/${classItem.class.class_number}?section=${classItem.class.section}`}
              className={styles.classCard}
            >
              <div className={styles.classInfo}>
                <h2 className={styles.className}>
                  {classItem.class.class_name}
                </h2>
                <div className={styles.detailsGrid}>
                  <Info label="Subject" value={classItem.class.subject} />
                  <Info
                    label="Time"
                    value={`${classItem.class.time_start} - ${classItem.class.time_end}`}
                  />
                  <Info
                    label="Room"
                    value={`${classItem.class.room.building}-${classItem.class.room.room_number}`}
                  />
                  <Info
                    label="Teacher"
                    value={classItem.class.teacher.data.full_name}
                  />
                  <Info
                    label="Class ID"
                    value={`${classItem.class.class_number}`}
                  />
                  <Info label="Section" value={`${classItem.class.section}`} />
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

export default AdminScheduledClassView;
