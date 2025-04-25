import React, { useEffect, useState } from "react";
import SideBar from "@/src/components/ui/Bars/SideBar";
import SubjectManager from "@/src/utils/SubjectManager";
import DataTable from "react-data-table-component";
import StudentGradeCard from "@/src/components/pages/student/classes/StudentGradeCard.tsx";
import Layout from "../../../../src/components/layout/Layout";
import { parse, format } from "date-fns";
import { useRouter } from "next/router";
import classHandler from "@/src/utils/Handlers/ClassHandler";
import accountManager from "@/src/utils/Managers/AccountManager.js";
import gradeHandler from "@/src/utils/Handlers/GradeHandler.ts";
import feedbackHandler from "@/src/utils/Handlers/feedbackHandler.ts";
import { toast } from "react-toastify";
import "@/src/styles/student/classes.css";

const StudentClassPage = () => {
  const router = useRouter();

  const [view, setView] = useState("About");
  const [classInformation, setClassInformation] = useState(undefined);
  const [classList, setClassList] = useState([]);
  const [grade, setGrade] = useState(undefined);
  const [feedback, setFeedback] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { classID, section } = router.query;

    if (section) {
      const fetchData = async () => {
        try {
          const result = await classHandler.getClass(classID, section);

          setClassInformation(result.data);
        } catch (error) {
          toast.error(result.error.response.data);
        }
      };

      const fetchClassListData = async () => {
        try {
          const result = await classHandler.getStudents(classID, section);

          result.data.forEach((element) => {
            element.data["name"] =
              element.data["first_name"] + " " + element.data["last_name"];
            element.data["role"] = "Student";
          });

          setClassList(result.data);
        } catch (error) {
          toast.error(result.error.response.data);
        }
      };

      fetchData();
      fetchClassListData();

      const fetchGrade = async () => {
        try {
          const user = await accountManager.getUserInfo();
          setUser(user.data);

          const result = await gradeHandler.getGrade(
            classID,
            section,
            user.data.id
          );

          if (result.status === 200) {
            console.log("Grade: ", result);
            setGrade(result.data);
          }
        } catch (error) {
          toast.error(error.response.data);
        }
      };

      const fetchFeedback = async () => {
        try {
          const user = await accountManager.getUserInfo();

          const result = await feedbackHandler.getFeedback(
            classID,
            section,
            user.data.id
          );

          if (result.status === 200) {
            setFeedback(result.data);
          }
        } catch (error) {
          toast.error(result.error.response.data);
        }
      };

      fetchData();
      fetchGrade();
      fetchFeedback();
      setLoading(false);
    }
  }, [router.isReady]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.data.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.data.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.data.role,
      sortable: true,
    },
  ];

  return (
    <div>
      {classInformation !== undefined ? (
        <>
          <div className="class-header">
            <div>
              <img
                src={SubjectManager[classInformation.subject]}
                width={40}
                alt="subject-icon"
              />
              <span>{classInformation.class_name}</span>
            </div>
          </div>
          <div className="container">
            <SideBar
              options={["About", "Grades & Feedback"]}
              selected={view}
              handleChange={(value) => setView(value)}
            />
            <div className="content">
              {view === "About" && (
                <>
                  <div className="class-info">
                    <div className="item">
                      <b>
                        <span>Time</span>
                      </b>
                      <span>
                        {format(
                          parse(
                            classInformation.time_start,
                            "HH:mm",
                            new Date()
                          ),
                          "hh:mm a"
                        )}{" "}
                        -{" "}
                        {format(
                          parse(classInformation.time_end, "HH:mm", new Date()),
                          "hh:mm a"
                        )}
                      </span>
                    </div>
                    <div className="item">
                      <b>
                        <span>Teacher</span>
                      </b>
                      <span>
                        <b>Name: </b>
                        {classInformation.teacher.data.last_name},{" "}
                        {classInformation.teacher.data.first_name}
                      </span>
                      <span>
                        <b>Email: </b>
                        {classInformation.teacher.data.email}
                      </span>
                    </div>
                  </div>
                  <h2>Class list</h2>
                  <DataTable columns={columns} data={classList} pagination />
                </>
              )}
              {view === "Grades & Feedback" && (
                <>
                  <h2>Grades & Feedback</h2>
                  {grade !== undefined &&
                  feedback !== undefined &&
                  user !== undefined ? (
                    <StudentGradeCard
                      studentName={user.full_name}
                      data={{
                        grade: grade,
                        feedback: feedback.comment,
                      }}
                    />
                  ) : (
                    <p>Loading...</p>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <span>Loading....</span>
      )}
    </div>
  );
};

StudentClassPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default StudentClassPage;
