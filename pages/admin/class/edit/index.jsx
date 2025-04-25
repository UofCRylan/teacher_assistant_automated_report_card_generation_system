import React, { useEffect, useState } from "react";
import classHandler from "@/src/utils/Handlers/ClassHandler.ts";
import AdminClassView from "@/src/components/pages/general/AdminClassView.tsx";
import Layout from "@/src/components/layout/Layout";
import { toast } from "react-toastify";

const AdminEditClassPage = () => {
  const [classes, setClasses] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const result = await classHandler.getAllClasses();

      if (result.error) {
        toast.error(result.error.response.data);
      }

      setClasses(result.data);
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {classes !== undefined ? (
        <main style={{ width: 900 }}>
          <AdminClassView classes={classes} link={"class/edit"} />
        </main>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

AdminEditClassPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AdminEditClassPage;
