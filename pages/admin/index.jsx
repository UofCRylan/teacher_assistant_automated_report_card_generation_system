import React from "react";
import Layout from "../../src/components/layout/Layout";

const AdminHome = () => {
  return <div>AdminHome</div>;
};

AdminHome.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AdminHome;
