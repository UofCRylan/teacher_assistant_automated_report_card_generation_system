// components/TeacherEditGradePage.jsx
import React, { useState } from "react";
import Select from "react-select";
import { RiSave3Fill } from "@remixicon/react";
import Layout from "../../../../src/components/layout/Layout";
import styles from "@/src/styles/teacher/grade/edit.module.css";

const gradeOptions = [
  { value: "A+", label: "A+" },
  { value: "A", label: "A" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B", label: "B" },
  { value: "B-", label: "B-" },
  { value: "C+", label: "C+" },
  { value: "C", label: "C" },
  { value: "C-", label: "C-" },
  { value: "D+", label: "D+" },
  { value: "D", label: "D" },
  { value: "F", label: "F" },
];

const initialGrades = [
  {
    student_id: 1,
    student_first_name: "Markus",
    student_last_name: "Jonm",
    grade: "A+",
  },
  {
    student_id: 2,
    student_first_name: "Lara",
    student_last_name: "Smith",
    grade: null,
  },
];

const TeacherEditGradePage = () => {
  const [grades, setGrades] = useState(initialGrades);

  const handleGradeChange = (selectedOption, studentId) => {
    const updated = grades.map((student) =>
      student.student_id === studentId
        ? { ...student, grade: selectedOption ? selectedOption.value : null }
        : student
    );
    setGrades(updated);
  };

  const handleSave = () => {
    // Replace with actual save logic
    console.log("Saving grades:", grades);
    alert("Grades saved!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Grade Editor</h2>
        <button className={styles.saveBtn} onClick={handleSave}>
          <RiSave3Fill size={20} />
          Save
        </button>
      </div>

      <div className={styles.studentsList}>
        {grades.map((student) => (
          <div key={student.student_id} className={styles.studentCard}>
            <div>
              <span className={styles.name}>
                {student.student_first_name} {student.student_last_name}
              </span>
            </div>
            <div className={styles.gradeSelect}>
              <Select
                options={gradeOptions}
                value={
                  student.grade
                    ? gradeOptions.find((g) => g.value === student.grade)
                    : null
                }
                onChange={(selected) =>
                  handleGradeChange(selected, student.student_id)
                }
                isClearable
                placeholder="Select grade"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

TeacherEditGradePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TeacherEditGradePage;
