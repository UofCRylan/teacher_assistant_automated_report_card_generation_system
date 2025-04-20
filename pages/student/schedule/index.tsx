import React from "react";
import ScheduleView from "@/src/components/pages/general/ScheduleView.tsx";
import Layout from "@/src/components/layout/Layout.js";

const StudentSchedulePage = () => {
  return (
    <main>
      <h1>My Schedule</h1>
      <ScheduleView />
    </main>
  );
};

StudentSchedulePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default StudentSchedulePage;
