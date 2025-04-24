import React, { useState, useEffect } from "react";
import scheduleHandler from "@/src/utils/Handlers/ScheduleHandler.ts";
import TeacherClassView from "@/src/components/pages/general/TeacherClassView.tsx";
import Layout from "@/src/components/layout/Layout";

const TeacherGradesPage = () => {
  const [classes, setClasses] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const result = await scheduleHandler.getUserSchedule();

      if (result.status === 200) {
        setClasses(result.data);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {classes !== undefined ? (
        <main style={{ width: 900 }}>
          <TeacherClassView classes={classes} link={"grades"} />
        </main>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

TeacherGradesPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TeacherGradesPage;
