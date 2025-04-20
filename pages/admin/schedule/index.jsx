import React from "react";
import Link from "next/link";
import Layout from "../../../src/components/layout/Layout";
import "@/src/styles/admin/schedule.css";

const AdminSchedulePage = () => {
  return (
    <div className="manage-schedule-container">
      <h2>Manage Schedule</h2>
      <div className="content">
        <Link href={"schedule/create"}>
          <button className="manage-button">
            <img src={"/assets/images/manage/add.png"} width={80} />
            <span>Create Schedule</span>
          </button>
        </Link>
        <Link href={"schedule/edit"}>
          <button className="manage-button">
            <img src={"/assets/images/manage/edit.png"} width={80} />
            <span>Edit Schedule</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

AdminSchedulePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AdminSchedulePage;
