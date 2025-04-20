import React from "react";
import ClassView from "@/src/components/pages/general/ClassView.tsx";
import Layout from "../../../src/components/layout/Layout";

const TeacherGradesPage = () => {
  return (
    <div>
      <h1>My classes</h1>
      <ClassView />
    </div>
  );
};

TeacherGradesPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TeacherGradesPage;
