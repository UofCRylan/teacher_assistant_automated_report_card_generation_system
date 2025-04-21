// components/TeacherEditGradePage.jsx
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useRouter } from "next/router";
import { RiSave3Fill } from "@remixicon/react";
import Layout from "../../../../src/components/layout/Layout";
import styles from "./edit.module.css";

import classHandler from "@/src/utils/Handlers/ClassHandler.ts";
import gradeHandler from "@/src/utils/Handlers/GradeHandler.ts";

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

const TeacherEditGradePage = () => {
  const router = useRouter();
  const { classID, section } = router.query;

  const [grades, setGrades] = useState([]);
  const [classInfo, setClassInfo] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady || !classID || !section) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const classData = await classHandler.getClass(classID, section);
        setClassInfo(classData.data);

        const studentsFromClass = await classHandler.getStudents(
          classID,
          section
        );
        const gradesFromClass = await gradeHandler.getAllGrades(
          classID,
          section
        );

        const merged = studentsFromClass.data.map((studentEntry) => {
          const matchingGrade = gradesFromClass.data.find(
            (g) => g.student.data.id === studentEntry.data.id
          );

          return {
            student_id: studentEntry.data.id,
            first_name: studentEntry.data.first_name,
            last_name: studentEntry.data.last_name,
            grade: matchingGrade?.grade?.letter || null,
          };
        });

        setGrades(merged);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router.isReady, classID, section]);

  const handleGradeChange = (selectedOption, studentId) => {
    const updated = grades.map((student) =>
      student.student_id === studentId
        ? { ...student, grade: selectedOption ? selectedOption.value : null }
        : student
    );
    setGrades(updated);
  };

  const handleSave = async () => {
    const payload = grades.map((student) => ({
      class_id: Number(classID),
      section: Number(section),
      student_id: student.student_id,
      letter: student.grade,
    }));

    try {
      await gradeHandler.updateGrades(classID, section, payload);
      alert("Grades saved!");
    } catch (err) {
      console.error("Error saving grades:", err);
      alert("Failed to save grades.");
    }
  };

  const formatTime = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    return `${hour}:${minute}`;
  };

  const currentDate = new Date().toISOString().split("T")[0];
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Edit Grades</h2>
          <small>Note: You are editing the letter grades for this class.</small>

          {classInfo ? (
            <div className={styles.classCard}>
              <div className={styles.classRow}>
                <span className={styles.classLabel}>Class:</span>
                <span className={styles.classValue}>
                  {classInfo.class_name}
                </span>
              </div>
              <div className={styles.classRow}>
                <span className={styles.classLabel}>Subject:</span>
                <span className={styles.classValue}>{classInfo.subject}</span>
              </div>
              <div className={styles.classRow}>
                <span className={styles.classLabel}>Time:</span>
                <span className={styles.classValue}>
                  {formatTime(classInfo.time_start)} -{" "}
                  {formatTime(classInfo.time_end)}
                </span>
              </div>
              <div className={styles.classRow}>
                <span className={styles.classLabel}>Room:</span>
                <span className={styles.classValue}>
                  {classInfo.room_number} (Building {classInfo.room?.building})
                </span>
              </div>
              <div className={styles.classRow}>
                <span className={styles.classLabel}>Date:</span>
                <span className={styles.classValue}>
                  {formatDate(currentDate)}
                </span>
              </div>
            </div>
          ) : (
            <span>Loading class data...</span>
          )}
        </div>

        <button className={styles.saveButton} onClick={handleSave}>
          <RiSave3Fill size={20} />
          Save
        </button>
      </div>

      <div className={styles.table}>
        {grades.map((student) => (
          <div key={student.student_id} className={styles.row}>
            <div className={styles.name}>
              {student.first_name} {student.last_name}
            </div>
            <div className={styles.selectWrapper}>
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
                className={styles.select}
                classNamePrefix="react-select"
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
