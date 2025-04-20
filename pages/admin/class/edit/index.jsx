import React from "react";
import ClassView from "@/src/components/pages/general/ClassView.tsx";

const AdminEditClassPage = () => {
  return (
    <div>
      <h1>Select a class</h1>
      <ClassView />
    </div>
  );
};

// AdminEditClassPage.getLayout = function getLayout(page) {
//   return <Layout>{page}</Layout>;
// };

export default AdminEditClassPage;
