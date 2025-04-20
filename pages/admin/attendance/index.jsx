import React from "react";
import ClassView from "@/src/components/pages/general/ClassView.tsx";
import Layout from "../../../src/components/layout/Layout";

const AdminAttendancePage = () => {
  return (
    <div>
      <h1>Select a class</h1>
      <ClassView />
    </div>
  );
};

AdminAttendancePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AdminAttendancePage;
