import React from "react";
import Layout from "@/src/components/layout/Layout.js";
import styles from "@/src/styles/student/report/index.module.css";

type ClassStatus = {
  id: number;
  grade_status: boolean;
  feedback_status: boolean;
};

const classes: ClassStatus[] = [
  { id: 1, grade_status: true, feedback_status: true },
  { id: 2, grade_status: true, feedback_status: true },
  { id: 3, grade_status: true, feedback_status: false },
];

const StudentReportPage = () => {
  const allReady = classes.every(
    (cls) => cls.grade_status && cls.feedback_status
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📘 Your Report Card Status</h1>

      <div className={styles.classList}>
        {classes.map((cls, index) => {
          const isReady = cls.grade_status && cls.feedback_status;
          return (
            <div key={cls.id} className={styles.classCard}>
              <h3 className={styles.classTitle}>Class {index + 1}</h3>
              <p>
                Grade Submitted:{" "}
                <span
                  className={cls.grade_status ? styles.success : styles.pending}
                >
                  {cls.grade_status ? "✓ Yes" : "✗ Not yet"}
                </span>
              </p>
              <p>
                Feedback Submitted:{" "}
                <span
                  className={
                    cls.feedback_status ? styles.success : styles.pending
                  }
                >
                  {cls.feedback_status ? "✓ Yes" : "✗ Not yet"}
                </span>
              </p>
              <p>
                Ready for Report:{" "}
                <span className={isReady ? styles.success : styles.pending}>
                  {isReady ? "✅ Ready" : "⏳ Waiting"}
                </span>
              </p>
            </div>
          );
        })}
      </div>

      <div className={styles.reportSection}>
        {allReady ? (
          <>
            <p className={styles.readyText}>🎉 All your classes are ready!</p>
            <button className={styles.downloadBtn}>Download Report Card</button>
          </>
        ) : (
          <p className={styles.waitingText}>
            📌 Some classes aren’t ready yet. Once all grades and feedback are
            in, you’ll be able to download your report card!
          </p>
        )}
      </div>
    </div>
  );
};

StudentReportPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default StudentReportPage;
