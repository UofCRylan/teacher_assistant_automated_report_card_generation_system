import React, { useState } from "react";
import styles from "@/src/styles/teacher/reports/index.module.css";
import Modal from "@/src/components/ui/Modal/Modal";
import { RiPencilLine } from "@remixicon/react";

type Student = {
  id: number;
  name: string;
  grade: string | null;
  feedback: string | null;
};

const initialStudents: Student[] = [
  {
    id: 1,
    name: "Alice",
    grade: "A+",
    feedback: "Alice did an amazing job this term. Great participation!",
  },
  {
    id: 2,
    name: "Ben",
    grade: null,
    feedback: null,
  },
  {
    id: 3,
    name: "Charlie",
    grade: "B",
    feedback: null,
  },
];

const TeacherReportsDetailPage = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [newFeedback, setNewFeedback] = useState("");

  const handleEditClick = (student: Student) => {
    setSelectedStudent(student);
    setNewFeedback(student.feedback || "");
    setShowModal(true);
  };

  const handleSaveFeedback = () => {
    if (selectedStudent) {
      const updated = students.map((s) =>
        s.id === selectedStudent.id ? { ...s, feedback: newFeedback } : s
      );
      setStudents(updated);
    }
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Create Report Cards</h1>

      <div className={styles.actions}>
        <button className={styles.button}>Generate Feedback</button>
        <button className={styles.button}>Generate Report Card</button>
      </div>

      <div className={styles.studentList}>
        {students.map((student) => (
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
            <button
              className={styles.editIcon}
              onClick={() => handleEditClick(student)}
              title="Edit Feedback"
            >
              <RiPencilLine size={20} />
            </button>
          </div>
        ))}
      </div>
      <Modal
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
      </Modal>
    </div>
  );
};

export default TeacherReportsDetailPage;
