import React from "react";
import Link from "next/link";
import Layout from "../../../src/components/layout/Layout";
import "@/src/styles/admin/class.css";

const AdminClassPage = () => {
  return (
    <div className="manage-class-container">
      <h2>Manage Class</h2>
      <div className="content">
        <Link href={"class/create"}>
          <button className="manage-button">
            <img src={"/assets/images/manage/add.png"} width={80} />
            <span>Create Class</span>
          </button>
        </Link>
        <Link href={"class/edit"}>
          <button className="manage-button">
            <img src={"/assets/images/manage/edit.png"} width={80} />
            <span>Edit Class</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

AdminClassPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AdminClassPage;
