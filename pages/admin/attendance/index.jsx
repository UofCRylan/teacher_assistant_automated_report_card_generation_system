import React, { useState, useEffect } from "react";
import classHandler from "@/src/utils/Handlers/ClassHandler.ts";
import AdminClassView from "@/src/components/pages/general/AdminClassView.tsx";
import Layout from "@/src/components/layout/Layout";

const AdminAttendancePage = () => {
  const [classes, setClasses] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const result = await classHandler.getAllClasses();

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
          <AdminClassView classes={classes} link={"attendance"} />
        </main>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

AdminAttendancePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AdminAttendancePage;
