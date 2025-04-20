import React from "react";
import styles from "@/src/styles/admin/schedule/edit.module.css";
import Layout from "../../../../src/components/layout/Layout";
import Link from "next/link";
import { RiArrowRightSLine } from "@remixicon/react";

const AdminEditSchedulePage = () => {
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
    {
      id: "3-1",
      name: "Biology",
      subject: "Science",
      teacher: "Dr. Adams",
      startTime: "11:30 AM",
      endTime: "1:00 PM",
    },
  ];

  const schedules = [
    {
      schedule_id: 101,
      classes: [classes[0], classes[1]],
    },
    {
      schedule_id: 102,
      classes: [classes[2]],
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Schedules</h1>
      <div className={styles.scheduleWrapper}>
        {schedules.map((schedule) => (
          <Link
            key={schedule.schedule_id}
            href={`/admin/schedules/${schedule.schedule_id}`}
            className={styles.scheduleCard}
          >
            <div className={styles.scheduleContent}>
              <div>
                <h2 className={styles.scheduleTitle}>
                  Schedule ID: {schedule.schedule_id}
                </h2>
                <div className={styles.classList}>
                  {schedule.classes.map((classItem) => (
                    <div key={classItem.id} className={styles.classItem}>
                      <h3>{classItem.name}</h3>
                      <p>
                        Subject: {classItem.subject} | Teacher:{" "}
                        {classItem.teacher}
                      </p>
                      <p>
                        Time: {classItem.startTime} - {classItem.endTime}
                      </p>
                      <p>Class ID: {classItem.id}</p>
                    </div>
                  ))}
                </div>
              </div>
              <RiArrowRightSLine className={styles.arrowIcon} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

AdminEditSchedulePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AdminEditSchedulePage;
