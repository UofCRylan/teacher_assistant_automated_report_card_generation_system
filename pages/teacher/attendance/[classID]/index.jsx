import React, { useState, useEffect } from "react";
import Layout from "../../../../src/components/layout/Layout";
import Select from "react-select";
import classHandler from "@/src/utils/Handlers/ClassHandler";
import attendanceHandler from "@/src/utils/Handlers/AttendanceHandler";
import styles from "./edit.module.css";
import { useRouter } from "next/router";
import { parseISO, format } from "date-fns";
import { toast } from "react-toastify";
import Button from "../../../../src/components/ui/Button/Button";

const TeacherEditAttendancePage = () => {
  const attendanceOptions = [
    { value: "Present", label: "Present" },
    { value: "Absent", label: "Absent" },
    { value: "Late", label: "Late" },
  ];
  const router = useRouter();

  const [classStudents, setClassStudents] = useState([]);
  const [classInfo, setClassInfo] = useState(undefined);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const currentDate = format(new Date(), "yyyy-MM-dd");

  const formatDateForDisplay = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "MM-dd-yyyy");
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { classID, section } = router.query;

    const fetchData = async () => {
      const classData = await classHandler.getClass(classID, section);
      setClassInfo(classData.data);

      const studentsInClass = await classHandler.getStudents(classID, section);

      setClassStudents(studentsInClass.data);

      const existingAttendanceRecords = await attendanceHandler.getAttendance(
        classID,
        section
      );

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
            date: currentDate,
            status: null,
          };
        }
      });

      setAttendanceRecords(initialAttendanceRecords);
    };

    fetchData();
  }, [router.isReady]);

  const handleAttendanceChange = (studentId, selectedOption) => {
    const updatedRecords = attendanceRecords.map((record) =>
      record.student.data.id === studentId
        ? { ...record, status: selectedOption?.value || null }
        : record
    );

    setAttendanceRecords(updatedRecords);
  };

  const handleSave = async () => {
    const { classID, section } = router.query;

    const formattedData = attendanceRecords.map((record) => ({
      class_id: record.class.class_number,
      section: record.class.section,
      student_id: record.student.data.id,
      teacher_id: record.class.teacher.data.id,
      date: record.date,
      status: record.status,
    }));

    const result = await attendanceHandler.updateAttendance(
      classID,
      section,
      formattedData
    );

    if (result.status === 200) {
      toast.success(result.data);
    } else {
      toast.error(result.error.response.data);
    }
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
        <Button
          label="Save"
          className={styles.saveButton}
          onClick={() => handleSave()}
        />
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
