import React, { useEffect, useState } from "react";
import ScheduleView from "@/src/components/pages/general/ScheduleView.tsx";
import scheduleHandler from "@/src/utils/Handlers/ScheduleHandler";
import Layout from "@/src/components/layout/Layout.js";

const StudentSchedulePage = () => {
  const [schedule, setSchedule] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const result = await scheduleHandler.getSchedule();

      if (result.status === 200) {
        console.log("schedule result: ", result);
        setSchedule(result.data);
      }
    };

    fetchData();
  }, []);
  return (
    <main>
      <h1>My Schedule</h1>
      {schedule !== undefined ? (
        <ScheduleView schedule={schedule} />
      ) : (
        <span>Loading...</span>
      )}
    </main>
  );
};

StudentSchedulePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default StudentSchedulePage;
