import React, { useState } from "react";
import SideBar from "@/src/components/ui/Bars/SideBar";
import SubjectManager from "@/src/utils/SubjectManager";
import DataTable from "react-data-table-component";
import Layout from "../../../../src/components/layout/Layout";
import { useRouter } from "next/router";

import "@/src/styles/student/classes.css";

const StudentClassPage = () => {
  const router = useRouter();
  const [view, setView] = useState("About");

  //   {router.query.classID}

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      name: "John Smith",
      email: "js@ucalgary.ca",
      role: "Student",
    },
    {
      id: 2,
      name: "John Smith",
      email: "js@ucalgary.ca",
      role: "Student",
    },
    {
      id: 3,
      name: "John Smith",
      email: "js@ucalgary.ca",
      role: "Student",
    },
    {
      id: 4,
      name: "John Smith",
      email: "js@ucalgary.ca",
      role: "Student",
    },
  ];

  return (
    <div>
      <div className="class-header">
        <div>
          <img src={SubjectManager["Math"]} width={40} alt="subject-icon" />
          <span>Mathematics - 3A</span>
        </div>
        {/* <div style={{ marginLeft: "auto" }}>
          <span>Current grade: A+</span>
        </div> */}
      </div>
      <div className="container">
        <SideBar
          options={["About", "Class List", "Grades & Feedback", "Statistics"]}
          selected={view}
          handleChange={(value) => setView(value)}
        />
        <div className="content">
          {view === "About" && (
            <>
              <h2>About</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                hendrerit augue sapien, in luctus risus faucibus et. Aliquam
                metus lectus, faucibus id libero a, euismod vehicula mauris.
                Proin dictum nisl vel varius suscipit. Ut molestie orci at
                facilisis accumsan. Donec cursus varius orci. Suspendisse ipsum
                lorem, suscipit quis ante in, finibus pretium odio. Nam in
                commodo eros. Curabitur a tellus eu purus interdum mattis id in
                nisl. Donec ullamcorper et est in elementum. Mauris enim felis,
                sollicitudin eget nunc ut, ultricies pulvinar tellus. Aliquam
                semper aliquet magna, ut egestas nisl tempus vitae. Nunc
                faucibus sagittis mattis. Sed a mollis nisl, quis malesuada
                urna. Etiam varius lacus a erat lobortis, in imperdiet erat
                vulputate. Cras sit amet dui quis mauris condimentum commodo.
                Proin quis dui suscipit, cursus ligula in, dignissim elit.
                Mauris hendrerit elit eu nisi venenatis, id finibus ex ultrices.
                Proin ac laoreet ante. Morbi eu condimentum magna. Nullam tempus
                nibh odio.
              </p>
            </>
          )}
          {view === "Class List" && (
            <>
              <h2>Class list</h2>
              <DataTable
                columns={columns}
                data={data}
                selectableRows
                pagination
              />
            </>
          )}
          {view === "Grades & Feedback" && (
            <>
              <h2>Grades & Feedback</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                hendrerit augue sapien, in luctus risus faucibus et. Aliquam
                metus lectus, faucibus id libero a, euismod vehicula mauris.
                Proin dictum nisl vel varius suscipit. Ut molestie orci at
                facilisis accumsan. Donec cursus varius orci. Suspendisse ipsum
                lorem, suscipit quis ante in, finibus pretium odio. Nam in
                commodo eros. Curabitur a tellus eu purus interdum mattis id in
                nisl. Donec ullamcorper et est in elementum. Mauris enim felis,
                sollicitudin eget nunc ut, ultricies pulvinar tellus. Aliquam
                semper aliquet magna, ut egestas nisl tempus vitae. Nunc
                faucibus sagittis mattis. Sed a mollis nisl, quis malesuada
                urna. Etiam varius lacus a erat lobortis, in imperdiet erat
                vulputate. Cras sit amet dui quis mauris condimentum commodo.
                Proin quis dui suscipit, cursus ligula in, dignissim elit.
                Mauris hendrerit elit eu nisi venenatis, id finibus ex ultrices.
                Proin ac laoreet ante. Morbi eu condimentum magna. Nullam tempus
                nibh odio.
              </p>
            </>
          )}
          {view === "Statistics" && (
            <>
              <h2>Statistics</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                hendrerit augue sapien, in luctus risus faucibus et. Aliquam
                metus lectus, faucibus id libero a, euismod vehicula mauris.
                Proin dictum nisl vel varius suscipit. Ut molestie orci at
                facilisis accumsan. Donec cursus varius orci. Suspendisse ipsum
                lorem, suscipit quis ante in, finibus pretium odio. Nam in
                commodo eros. Curabitur a tellus eu purus interdum mattis id in
                nisl. Donec ullamcorper et est in elementum. Mauris enim felis,
                sollicitudin eget nunc ut, ultricies pulvinar tellus. Aliquam
                semper aliquet magna, ut egestas nisl tempus vitae. Nunc
                faucibus sagittis mattis. Sed a mollis nisl, quis malesuada
                urna. Etiam varius lacus a erat lobortis, in imperdiet erat
                vulputate. Cras sit amet dui quis mauris condimentum commodo.
                Proin quis dui suscipit, cursus ligula in, dignissim elit.
                Mauris hendrerit elit eu nisi venenatis, id finibus ex ultrices.
                Proin ac laoreet ante. Morbi eu condimentum magna. Nullam tempus
                nibh odio.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

StudentClassPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default StudentClassPage;
