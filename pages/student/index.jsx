import React, { useState, useEffect } from "react";
import Layout from "../../src/components/layout/Layout";
import ScheduleView from "@/src/components/pages/general/ScheduleView.tsx";
import scheduleHandler from "@/src/utils/Handlers/ScheduleHandler";

const StudentHomePage = () => {
  const [schedule, setSchedule] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const result = await scheduleHandler.getUserSchedule();

      if (result.status === 200) {
        console.log("Result: ", result);
        setSchedule(result.data.classes);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <h1>Home</h1>
      {schedule !== undefined ? (
        <ScheduleView schedule={schedule} />
      ) : (
        <span>Loading...</span>
      )}
    </main>
  );
};

StudentHomePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default StudentHomePage;
