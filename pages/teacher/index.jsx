import React from "react";
import Layout from "../../src/components/layout/Layout";

const TeacherHome = () => {
  return <div>TeacherHome</div>;
};

TeacherHome.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TeacherHome;
