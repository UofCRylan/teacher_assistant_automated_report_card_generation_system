import React, { useState, useEffect } from "react";
import styles from "@/src/styles/teacher/reports/index.module.css";
import Layout from "@/src/components/layout/Layout";
import reportHandler from "@/src/utils/Handlers/ReportHandler";
import { useRouter } from "next/router";
import feedbackHandler from "@/src/utils/Handlers/FeedbackHandler";

type StudentRecord = {
  student: {
    data: {
      id: number;
      full_name: string;
    };
  };
  grade: string | null;
  feedback: string | null;
};

type Student = {
  id: number;
  name: string;
  grade: string | null;
  feedback: string | null;
};

const transformData = (data: any): Student[] => {
  return data.student_records.map((record: StudentRecord) => ({
    id: record.student.data.id,
    name: record.student.data.full_name,
    grade: record.grade,
    feedback: record.feedback,
  }));
};

const TeacherReportsDetailPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [newFeedback, setNewFeedback] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { classID, section } = router.query;

    const fetchData = async () => {
      const result = await reportHandler.checkTeacherReportCardStatus(
        classID,
        section
      );

      if (result.status === 200) {
        const formattedStudents = transformData(result.data);
        setStudents(formattedStudents);
      }
    };

    fetchData();
  }, [router.isReady]);

  // const handleEditClick = (student: Student) => {
  //   setSelectedStudent(student);
  //   setNewFeedback(student.feedback || "");
  //   setShowModal(true);
  // };

  // const handleSaveFeedback = async () => {
  //   if (selectedStudent) {
  //     const { classID, section } = router.query;

  //     const updated = students.map((s) =>
  //       s.id === selectedStudent.id ? { ...s, feedback: newFeedback } : s
  //     );
  //     setStudents(updated);

  //     const payload = {
  //       student_id: selectedStudent.id,
  //       feedback: newFeedback,
  //     };

  //     const result = await feedbackHandler.updateFeedback(
  //       classID,
  //       section,
  //       selectedStudent.id,
  //       payload
  //     );

  //     setShowModal(false);
  //   }
  // };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Report Card Status</h1>
      <small>
        In order for a student to download a report card they must have a grade
        and feedback for all of their classes
      </small>
      <div className={styles.actions}>
        {/* <button className={styles.button}>Generate Feedback</button> */}
        {/* <button className={styles.button}>Generate Report Card</button> */}
      </div>

      <div className={styles.studentList}>
        {students.length > 0 &&
          students.map((student) => (
            <div key={student.id} className={styles.studentCard}>
              <div className={styles.studentInfo}>
                <h3 className={styles.studentName}>{student.name}</h3>
                <p className={styles.grade}>
                  Grade:{" "}
                  {student.grade ? (
                    <span className={styles.gradeValue}>{student.grade}</span>
                  ) : (
                    <span className={styles.missing}>Not yet assigned</span>
                  )}
                </p>
                <p className={styles.feedback}>
                  Feedback:{" "}
                  {student.feedback ? (
                    student.feedback
                  ) : (
                    <span className={styles.missing}>No feedback yet</span>
                  )}
                </p>
              </div>
              {/* <button
                className={styles.editIcon}
                onClick={() => handleEditClick(student)}
                title="Edit Feedback"
              >
                <RiPencilLine size={20} />
              </button> */}
            </div>
          ))}
      </div>
      {/* <Modal
        show={showModal}
        width="400px"
        height="300px"
        borderRadius="12px"
        handleClose={() => setShowModal(false)}
      >
        <h2>Edit Feedback</h2>
        <textarea
          className={styles.textarea}
          value={newFeedback}
          onChange={(e) => setNewFeedback(e.target.value)}
          placeholder="Enter feedback here..."
        />
        <button className={styles.saveButton} onClick={handleSaveFeedback}>
          Save
        </button>
      </Modal> */}
    </div>
  );
};

TeacherReportsDetailPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TeacherReportsDetailPage;
