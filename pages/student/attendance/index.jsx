import React from "react";
import WeekNavigator from "@/src/components/pages/student/attendance/WeekNavigator.tsx";
import AttendanceTable from "@/src/components/pages/student/attendance/AttendanceTable.tsx";
import Layout from "../../../src/components/layout/Layout";

const StudentAttendancePage = () => {
  return (
    <div>
      <h2>My Attendance</h2>
      <div>
        <WeekNavigator />
      </div>
      <AttendanceTable />
    </div>
  );
};

StudentAttendancePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default StudentAttendancePage;
