import React, { useState } from "react";
import Layout from "../../../../src/components/layout/Layout";
import Select from "react-select";
import styles from "./edit.module.css";

const TeacherEditAttendancePage = () => {
  const attendanceOptions = [
    { value: 10, label: "Present" },
    { value: 11, label: "Absent" },
    { value: 12, label: "Late" },
  ];

  const classInfo = {
    name: "Math 101",
    subject: "Mathematics",
    start_time: "09:00 AM",
    end_time: "10:30 AM",
    room_number: "Room 204",
  };

  const [studentAttendance, setStudentAttendance] = useState([
    {
      student_id: 1,
      student_first_name: "Markus",
      student_last_name: "Jonm",
      attendance: 12,
    },
    {
      student_id: 2,
      student_first_name: "Sarah",
      student_last_name: "Mighty",
      attendance: null,
    },
  ]);

  const handleAttendanceChange = (studentId, selectedOption) => {
    const updated = studentAttendance.map((student) =>
      student.student_id === studentId
        ? { ...student, attendance: selectedOption?.value ?? null }
        : student
    );
    setStudentAttendance(updated);
  };

  const handleSave = () => {
    console.log("Saving attendance:", studentAttendance);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Edit Attendance</h2>
          <div className={styles.classCard}>
            <div className={styles.classRow}>
              <span className={styles.classLabel}>Class:</span>
              <span className={styles.classValue}>{classInfo.name}</span>
            </div>
            <div className={styles.classRow}>
              <span className={styles.classLabel}>Subject:</span>
              <span className={styles.classValue}>{classInfo.subject}</span>
            </div>
            <div className={styles.classRow}>
              <span className={styles.classLabel}>Time:</span>
              <span className={styles.classValue}>
                {classInfo.start_time} - {classInfo.end_time}
              </span>
            </div>
            <div className={styles.classRow}>
              <span className={styles.classLabel}>Room:</span>
              <span className={styles.classValue}>{classInfo.room_number}</span>
            </div>
          </div>
        </div>
        <button className={styles.saveButton} onClick={handleSave}>
          Save
        </button>
      </div>

      <div className={styles.table}>
        {studentAttendance.map((student) => {
          const fullName = `${student.student_first_name} ${student.student_last_name}`;
          const selectedOption = attendanceOptions.find(
            (opt) => opt.value === student.attendance
          );

          return (
            <div key={student.student_id} className={styles.row}>
              <div className={styles.name}>{fullName}</div>
              <div className={styles.selectWrapper}>
                <Select
                  options={attendanceOptions}
                  value={selectedOption || null}
                  onChange={(option) =>
                    handleAttendanceChange(student.student_id, option)
                  }
                  isClearable
                  placeholder="No status"
                  className={styles.select}
                  classNamePrefix="react-select"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

TeacherEditAttendancePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TeacherEditAttendancePage;
