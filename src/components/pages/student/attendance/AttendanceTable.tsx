import React from "react";
import { format, startOfWeek, addDays, addWeeks } from "date-fns";
import "@/src/styles/student/attendance.css";

const AttendanceTable = ({ classes, attendanceRecords, weekOffset }) => {
  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 }); // Monday
  const currentWeekStart = addWeeks(startOfCurrentWeek, weekOffset);

  // Generate array of weekdays for the selected week
  const weekdays = Array.from({ length: 5 }, (_, i) => {
    // TODO
    return addDays(new Date(currentWeekStart), i);
  });

  // Helper to get attendance status for a class on a specific date
  const getAttendanceStatus = (classNumber, section, date) => {
    const formattedDate = format(date, "yyyy-MM-dd");

    const record = attendanceRecords.find(
      (record) =>
        record.class.class_number === classNumber &&
        record.class.section === section &&
        record.date === formattedDate
    );

    if (!record) return "/";

    // Convert full status to single letter
    switch (record.status) {
      case "Present":
        return "P";
      case "Absent":
        return "A";
      case "Late":
        return "L";
      default:
        return "/";
    }
  };

  // Helper to count total absences and lates for a class
  const countAttendanceType = (classNumber, section, type) => {
    const fullType = type === "A" ? "Absent" : "Late";

    return attendanceRecords.filter(
      (record) =>
        record.class.class_number === classNumber &&
        record.class.section === section &&
        record.status === fullType
    ).length;
  };

  const dayLabels = weekdays.map((day) => format(day, "E"));

  return (
    <div>
      <table
        border={1}
        cellPadding={8}
        style={{
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "center",
        }}
        className="attendance-table"
      >
        <thead>
          <tr>
            {dayLabels.map((day, index) => (
              <th key={index}>
                {day} {format(weekdays[index], "dd/MM")}
              </th>
            ))}
            <th>Course</th>
            <th>Absences</th>
            <th>Lates</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((course, index) => {
            const absences = countAttendanceType(
              course.class.class_number,
              course.class.section,
              "A"
            );
            const lates = countAttendanceType(
              course.class.class_number,
              course.class.section,
              "L"
            );

            return (
              <tr key={index} style={{ height: 80 }}>
                {weekdays.map((day, i) => (
                  <td key={i}>
                    {getAttendanceStatus(
                      course.class.class_number,
                      course.class.section,
                      day
                    )}
                  </td>
                ))}
                <td>{course.class.class_name}</td>
                <td>{absences}</td>
                <td>{lates}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
