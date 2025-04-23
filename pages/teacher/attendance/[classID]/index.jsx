import React, { useState, useEffect } from "react";
import Layout from "../../../../src/components/layout/Layout";
import Select from "react-select";
import classHandler from "@/src/utils/Handlers/ClassHandler";
import attendanceHandler from "@/src/utils/Handlers/AttendanceHandler";
import styles from "./edit.module.css";
import { useRouter } from "next/router";
import { parseISO, format } from "date-fns";

const TeacherEditAttendancePage = () => {
  // Attendance status options
  const attendanceOptions = [
    { value: "Present", label: "Present" },
    { value: "Absent", label: "Absent" },
    { value: "Late", label: "Late" },
  ];
  const router = useRouter();

  // State for students in class and attendance records
  const [classStudents, setClassStudents] = useState([]);
  const [classInfo, setClassInfo] = useState(undefined);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // Class information from the sample data
  // const classInfo = {
  //   class_number: 1,
  //   section: 1,
  //   subject: "Homeroom",
  //   time_start: "08:00",
  //   time_end: "08:15",
  //   class_name: "Grade 1A Homeroom",
  //   room_number: "101",
  //   building: "A",
  //   teacher_name: "Ethan Anderson",
  // };

  // Current date for attendance in YYYY-MM-DD format
  const currentDate = format(new Date(), "yyyy-MM-dd"); // YYYY-MM-DD format
  console.log("Current date: ", currentDate);

  const formatDateForDisplay = (dateString) => {
    const date = parseISO(dateString); // Parses correctly into local time
    return format(date, "MM-dd-yyyy");
  };

  // Initialize students and attendance records from the provided data
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { classID, section } = router.query;

    const fetchData = async () => {
      const classData = await classHandler.getClass(classID, section);
      console.log("room: ", classData.data);
      setClassInfo(classData.data);

      const studentsInClass = await classHandler.getStudents(classID, section);
      console.log("Students: ", studentsInClass);

      // Set the students in class
      setClassStudents(studentsInClass.data);

      // Get existing attendance records
      const existingAttendanceRecords = await attendanceHandler.getAttendance(
        classID,
        section
      );
      console.log("Records: ", existingAttendanceRecords);

      // Create initial attendance records for all students
      const initialAttendanceRecords = studentsInClass.data.map((student) => {
        // Check if student already has an attendance record for the current day
        const existingRecord = existingAttendanceRecords.data.find(
          (record) =>
            record.student.data.id === student.data.id &&
            record.date === currentDate
        );

        if (existingRecord) {
          // If student has an existing record for today, use that record
          return existingRecord;
        } else {
          // If no existing record for today, create a new one with null status
          return {
            class: {
              class_number: classData.class_number,
              section: classData.section,
              subject: classData.subject,
              time_start: classData.time_start,
              time_end: classData.time_end,
              class_name: classData.class_name,
              teacher: {
                data: {
                  id: classData.data.teacher.data.id,
                  full_name: classData.data.teacher.data.full_name,
                  first_name: classData.data.teacher.data.first_name,
                  last_name: classData.data.teacher.data.last_name,
                },
              },
              room: {
                room_number: classData.data.room.room_number,
                capacity: classData.data.room.capacity,
                building: classData.data.room.building,
                roomid: classData.data.room.roomid,
              },
            },
            student: student,
            date: currentDate, // Use YYYY-MM-DD format consistently
            status: null, // Default to null/blank for students without records
          };
        }
      });

      setAttendanceRecords(initialAttendanceRecords);
    };

    fetchData();
  }, [router.isReady]);

  const handleAttendanceChange = (studentId, selectedOption) => {
    // Update the attendance records
    const updatedRecords = attendanceRecords.map((record) =>
      record.student.data.id === studentId
        ? { ...record, status: selectedOption?.value || null }
        : record
    );

    setAttendanceRecords(updatedRecords);
  };

  const handleSave = async () => {
    const { classID, section } = router.query;

    console.log(attendanceRecords);

    // Format the data for the API - keep date as YYYY-MM-DD for API consistency
    const formattedData = attendanceRecords.map((record) => ({
      class_id: record.class.class_number,
      section: record.class.section,
      student_id: record.student.data.id,
      teacher_id: record.class.teacher.data.id,
      date: record.date, // Keep as YYYY-MM-DD format for API
      status: record.status, // "present", "absent", "late", or null
    }));

    console.log("Saving attendance records:", formattedData);

    const result = await attendanceHandler.updateAttendance(
      classID,
      section,
      formattedData
    );
    console.log("Saved result: ", result);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Edit Attendance</h2>
          <small>
            Note: As a teacher you can only update attendance for current day
          </small>
          {classInfo !== undefined ? (
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
                  {classInfo.time_start} - {classInfo.time_end}
                </span>
              </div>
              <div className={styles.classRow}>
                <span className={styles.classLabel}>Room:</span>
                <span className={styles.classValue}>
                  {classInfo.room_number} (Building {classInfo.room.building})
                </span>
              </div>
              <div className={styles.classRow}>
                <span className={styles.classLabel}>Date:</span>
                <span className={styles.classValue}>
                  {formatDateForDisplay(currentDate)}
                </span>
              </div>
            </div>
          ) : (
            <span>Loading class data...</span>
          )}
        </div>
        <button className={styles.saveButton} onClick={handleSave}>
          Save
        </button>
      </div>
      <div className={styles.table}>
        {attendanceRecords.length > 0 &&
          attendanceRecords.map((record) => {
            const student = record.student.data;
            const fullName = `${student.first_name} ${student.last_name}`;
            const selectedOption = attendanceOptions.find(
              (opt) => opt.value === record.status
            );

            return (
              <div key={student.id} className={styles.row}>
                <div className={styles.name}>{fullName}</div>
                <div className={styles.selectWrapper}>
                  <Select
                    options={attendanceOptions}
                    value={selectedOption || null}
                    onChange={(option) =>
                      handleAttendanceChange(student.id, option)
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
