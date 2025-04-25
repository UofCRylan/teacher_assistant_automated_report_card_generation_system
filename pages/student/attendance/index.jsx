import React, { useState, useEffect } from "react";
import WeekNavigator from "@/src/components/pages/student/attendance/WeekNavigator.tsx";
import AttendanceTable from "@/src/components/pages/student/attendance/AttendanceTable.tsx";
import scheduleHandler from "@/src/utils/Handlers/ScheduleHandler.ts";
import attendanceHandler from "@/src/utils/Handlers/AttendanceHandler.ts";
import Layout from "../../../src/components/layout/Layout";
import VSpace from "../../../src/components/ui/Space/VSpace";
import { toast } from "react-toastify";

const StudentAttendancePage = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [classes, setClasses] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const classesResponse = await scheduleHandler.getUserSchedule();
        const attendanceResponse =
          await attendanceHandler.getAttendanceRecords();

        setClasses(classesResponse.data.classes);
        setAttendanceRecords(attendanceResponse.data);
      } catch (error) {
        toast.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, []);

  return (
    <div style={{ padding: 40, boxSizing: "border-box" }}>
      <h2>My Attendance</h2>
      {(classes.length > 0) & (attendanceRecords.length > 0) ? (
        <>
          <div>
            <WeekNavigator
              weekOffset={weekOffset}
              setWeekOffset={setWeekOffset}
            />
          </div>
          <VSpace space={20} />
          <AttendanceTable
            classes={classes}
            attendanceRecords={attendanceRecords}
            weekOffset={weekOffset}
          />
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

StudentAttendancePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default StudentAttendancePage;
