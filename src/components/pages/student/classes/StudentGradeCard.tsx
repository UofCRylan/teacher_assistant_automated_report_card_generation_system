import React from "react";
import styles from "@/src/styles/student/class/grade.module.css";

type GradeData = {
  grade: string | null;
  feedback: string | null;
};

type StudentGradeCardProps = {
  studentName: string;
  data: GradeData;
};

const StudentGradeCard: React.FC<StudentGradeCardProps> = ({
  studentName,
  data,
}) => {
  const { grade, feedback } = data;

  const getGradeClass = (grade: string | null) => {
    if (!grade) return `${styles.gradeBox} ${styles.gradeGray}`;
    if (grade.startsWith("A")) return `${styles.gradeBox} ${styles.gradeGreen}`;
    if (grade.startsWith("B")) return `${styles.gradeBox} ${styles.gradeBlue}`;
    if (grade.startsWith("C"))
      return `${styles.gradeBox} ${styles.gradeYellow}`;
    return `${styles.gradeBox} ${styles.gradeRed}`;
  };

  return (
    <div className={styles.cardContainer}>
      <h2 className={styles.cardTitle}>{studentName}</h2>

      <div className={getGradeClass(grade)}>
        {grade
          ? `Your Grade: ${grade}`
          : "📌 Your grade isn't available yet. Check back soon!"}
      </div>

      <div className={styles.feedbackBox}>
        <h3 className={styles.feedbackTitle}>Teachers Feedback:</h3>
        {feedback ? (
          <p className={styles.feedbackText}>{feedback}</p>
        ) : (
          <p className={styles.feedbackPlaceholder}>
            No feedback yet! Your teacher might be working on it. Check back
            later!
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentGradeCard;
