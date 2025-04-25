import React, { useEffect } from "react";
import Layout from "../../src/components/layout/Layout";
import accountManager from "@/src/utils/Managers/AccountManager.js";

const StudentHomePage = () => {
  return (
    <div>
      <h1>StudentHome</h1>
    </div>
  );
};

StudentHomePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default StudentHomePage;
