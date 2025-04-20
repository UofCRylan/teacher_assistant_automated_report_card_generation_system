// "use client";

import React, { useEffect, useState } from "react";
import SideBar from "@/src/components/ui/Bars/SideBar";
import SubjectManager from "@/src/utils/SubjectManager";
import DataTable from "react-data-table-component";
import StudentGradeCard from "@/src/components/pages/student/classes/StudentGradeCard.tsx";
import Layout from "../../../../src/components/layout/Layout";
import { parse, format } from "date-fns";
// import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { getClass, getClassList } from "@/src/utils/Handlers/ClassHandler";

import "@/src/styles/student/classes.css";

const StudentClassPage = () => {
  const router = useRouter();
  // const searchParams = useSearchParams();

  const [view, setView] = useState("About");
  const [classInformation, setClassInformation] = useState(undefined);
  const [classList, setClassList] = useState([]);

  // useEffect(() => {
  //   if (!router.isReady) {
  //     return;
  //   }

  //   const section_id = router.query.section;
  //   console.log("section_id: ", section_id);

  //   if (section_id) {
  //     const fetchData = async () => {
  //       try {
  //         const result = await getClass(router.query.classID, section_id);
  //         console.log("Result: ", result);

  //         if (result.error) {
  //           console.error("Error fetching class info:", result.error);
  //           return;
  //         }

  //         setClassInformation(result);
  //       } catch (error) {
  //         console.error("Error fetching class info:", error);
  //       }
  //     };

  //     const fetchClassListData = async () => {
  //       try {
  //         const result = await getClassList(router.query.classID, section_id);

  //         if (result.error) {
  //           console.error("Error fetching class list info:", result.error);
  //           return;
  //         }

  //         result.data.forEach((element) => {
  //           element["name"] =
  //             element["first_name"] + " " + element["last_name"];
  //           element["role"] = "Student";
  //         });

  //         console.log("List result: ", result);

  //         setClassList(result.data);
  //       } catch (error) {
  //         console.error("Error fetching class info:", error);
  //       }
  //     };

  //     fetchData();
  //     fetchClassListData();
  //   }
  // }, [router.isReady]);

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

  return (
    <div>
      <div className="class-header">
        <div>
          <img
            src={SubjectManager[classInformation.data.subject]}
            width={40}
            alt="subject-icon"
          />
          <span>{classInformation.data.class_name}</span>
        </div>
      </div>
      <div className="container">
        <SideBar
          options={["About", "Grades & Feedback"]}
          selected={view}
          handleChange={(value) => setView(value)}
        />
        <div className="content">
          <div>
            <h2>Grades & Feedback</h2>
            <StudentGradeCard
              studentName="John"
              data={{
                grade: "A+",
                feedback:
                  "John received a A- in Homeroom 1. John did excellent work on daily routines. Keep working hard!",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

StudentClassPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default StudentClassPage;
