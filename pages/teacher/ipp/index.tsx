import React from "react";
import Layout from "../../../src/components/layout/Layout";

const TeacherIppPage = () => {
  return <div>TeacherIppPage</div>;
};

TeacherIppPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TeacherIppPage;
