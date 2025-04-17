import React from "react";

const AttendanceTable = () => {
  const courses = [
    {
      course: "Math 101",
      daily: ["P", "A", "L", "P", "A"],
    },
    {
      course: "English 201",
      daily: ["L", "P", "P", "A", "P"],
    },
    {
      course: "History 301",
      daily: ["A", "P", "P", "L", "P"],
    },
  ];

  const dayLabels = ["M", "T", "W", "Th", "F"];

  // Helper to count total absences and lates
  const countType = (arr, type) => arr.filter((val) => val === type).length;

  return (
    <table
      border={1}
      cellPadding={8}
      style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}
    >
      <thead>
        <tr>
          {dayLabels.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
          <th>Course</th>
          <th>Absences</th>
          <th>Lates</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course, index) => {
          const absences = countType(course.daily, "A");
          const lates = countType(course.daily, "L");
          return (
            <tr key={index} style={{ height: 80 }}>
              {course.daily.map((status, i) => (
                <td key={i}>{status}</td>
              ))}
              <td>{course.course}</td>
              <td>{absences}</td>
              <td>{lates}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AttendanceTable;
