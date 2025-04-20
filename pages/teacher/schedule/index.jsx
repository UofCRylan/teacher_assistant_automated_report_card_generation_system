import React from "react";
import Layout from "../../../src/components/layout/Layout";
import ScheduleView from "@/src/components/pages/general/ScheduleView.tsx";
// import styles from "./edit.module.css";

const TeacherSchedulePage = () => {
  return (
    <main>
      <h1>My Schedule</h1>
      <ScheduleView />
    </main>
  );
};

TeacherSchedulePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TeacherSchedulePage;
