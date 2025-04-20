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
import classHandler from "@/src/utils/Handlers/ClassHandler";
import accountManager from "@/src/utils/Managers/AccountManager.js";
import gradeHandler from "@/src/utils/Handlers/GradeHandler.ts";
import feedbackHandler from "@/src/utils/Handlers/feedbackHandler.ts";

import "@/src/styles/student/classes.css";

const StudentClassPage = () => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const [view, setView] = useState("About");
  const [classInformation, setClassInformation] = useState(undefined);
  const [grade, setGrade] = useState(undefined);
  const [feedback, setFeedback] = useState(undefined);
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { classID, section } = router.query;
    console.log("section_id: ", section);

    if (section) {
      const fetchData = async () => {
        try {
          const result = await classHandler.getClass(classID, section);
          console.log("Result: ", result);

          if (result.error) {
            console.error("Error fetching class info:", result.error);
            return;
          }

          console.log("Setting class information as: ", result);

          setClassInformation(result);
        } catch (error) {
          console.error("Error fetching class info:", error);
        }
      };

      // const fetchClassListData = async () => {
      //   try {
      //     const result = await getClassList(classID, section);

      //     if (result.error) {
      //       console.error("Error fetching class list info:", result.error);
      //       return;
      //     }

      //     result.data.forEach((element) => {
      //       element["name"] =
      //         element["first_name"] + " " + element["last_name"];
      //       element["role"] = "Student";
      //     });

      //     console.log("List result: ", result);

      //     setClassList(result.data);
      //   } catch (error) {
      //     console.error("Error fetching class info:", error);
      //   }
      // };

      const fetchGrade = async () => {
        const user = await accountManager.getUserInfo();
        console.log("User: ", user);

        const result = await gradeHandler.getGrade(
          classID,
          section,
          user.data.id
        );

        if (result.status === 200) {
          setGrade(result.data);
          console.log("Grade: ", grade);
        }
      };

      const fetchFeedback = async () => {
        const user = await accountManager.getUserInfo();
        console.log("User: ", user);

        const result = await feedbackHandler.getFeedback(
          classID,
          section,
          user.data.id
        );

        if (result.status === 200) {
          setFeedback(result.data);
        }
      };

      fetchData();
      // fetchClassListData();
      fetchGrade();
      fetchFeedback();
    }
  }, [router.isReady]);

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
      {classInformation ? (
        <>
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
                {(grade !== undefined) & (feedback !== undefined) ? (
                  <StudentGradeCard
                    studentName={grade.student.data.full_name}
                    data={{
                      grade: grade.grade.letter,
                      feedback: feedback.comment,
                    }}
                  />
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

StudentClassPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default StudentClassPage;
