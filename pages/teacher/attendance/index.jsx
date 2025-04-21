import React, { useEffect, useState } from "react";
import scheduleHandler from "@/src/utils/Handlers/ScheduleHandler.ts";
import TeacherClassView from "@/src/components/pages/general/TeacherClassView.tsx";
import Layout from "@/src/components/layout/Layout";

const TeacherAttendancePage = () => {
  const [classes, setClasses] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const result = await scheduleHandler.getSchedule();

      if (result.status === 200) {
        console.log("Classes got:", result.data);
        setClasses(result.data);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {classes !== undefined ? (
        <main style={{ width: 900 }}>
          <TeacherClassView classes={classes} link={"attendance"} />
        </main>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

TeacherAttendancePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TeacherAttendancePage;
