import React, { useEffect, useState } from "react";
import Layout from "@/src/components/layout/Layout.js";
import styles from "@/src/styles/student/report/index.module.css";
import reportHandler from "@/src/utils/Handlers/ReportHandler";

type ClassStatus = {
  id: number;
  grade_status: boolean;
  feedback_status: boolean;
};

const StudentReportPage = () => {
  const [classes, setClasses] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const result = await reportHandler.checkStudentReportCardStatus();
      if (result.status === 200) {
        setClasses(result.data);
      }

      console.log("Report: ", result);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📘 Your Report Card Status</h1>

      <div className={styles.classList}>
        {classes !== undefined &&
          classes.class_records.map((cls, index) => {
            const isReady = cls.grade_status && cls.feedback_status;
            return (
              <div key={index} className={styles.classCard}>
                <h3 className={styles.classTitle}>{cls.class_name}</h3>
                <p>
                  Grade Submitted:{" "}
                  <span
                    className={
                      cls.grade_status ? styles.success : styles.pending
                    }
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
        {classes !== undefined && classes.status ? (
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
