import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../../../src/components/layout/Layout";
import "@/src/styles/admin/class.css";
import Text from "../../../../../src/components/ui/Input/Text";
import Select from "react-select";
import Button from "../../../../../src/components/ui/Button/Button";
import { generateTimeOptions } from "@/src/utils/Handlers/TimeHandler.ts";
import { addMinutes } from "date-fns";
import classHandler from "@/src/utils/Handlers/ClassHandler.ts";
import VSpace from "../../../../../src/components/ui/Space/VSpace";

const AdminEditClassDetailedPage = () => {
  const router = useRouter();

  const [classID, setClassID] = useState(undefined);
  const [sectionID, setSectionID] = useState(undefined);
  const [className, setClassName] = useState(undefined);
  const [subject, setSubject] = useState(undefined);
  const [beginTime, setBeginTime] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);
  const [teacher, setTeacher] = useState(undefined);
  const [classroom, setClassroom] = useState(undefined);
  const [beginTimeOptions, setBeginTimeOptions] = useState(undefined);
  const [endTimeOptions, setEndTimeOptions] = useState(undefined);

  useEffect(() => {
    if (!router.isReady) return;

    const getClassInformation = async (classID, section) => {
      if (classID && section) {
        const result = await classHandler.getClass(classID, section);

        if (result?.status === 200) {
          console.log(result);

          setClassName(result.data.class_name);
          setBeginTime(result.data.time_start);
          setEndTime(result.data.time_end);
          setSubject(result.data.subject);
          setTeacher(result.data.teacher.id);
          setClassroom(result.data.room.roomid);

          setBeginTime({
            label: format(
              parse(result.data.time_start, "HH:mm", new Date()),
              "h:mm a"
            ),
            value: result.data.time_start,
          });
          setBeginTimeOptions(generateTimeOptions("08:00"));
        }
      }
    };

    getClassInformation(router.query.classID, router.query.section);
  }, [router.isReady]);

  const handleEdit = async () => {
    const result = await classHandler.createClass({
      class_id: classID,
      section_id: sectionID,
      class_name: className,
      subject: subject.value,
      time_start: beginTime.value,
      time_end: endTime.value,
      teacher_id: teacher.value,
      room_id: classroom.value,
    });

    if (result?.status === 200) {
      // TODO:
      router.push("/admin/class");
    }

    console.log("Create: ", result);
  };

  const subjectOptions = [
    { value: "Homeroom", label: "Homeroom" },
    { value: "Math", label: "Math" },
    { value: "Science", label: "Science" },
    { value: "social studies", label: "Social Studies" },
    { value: "Gym", label: "Gym" },
    { value: "Music", label: "Music" },
  ];

  const teacherOptions = [
    { value: 25, label: "John" },
    { value: 26, label: "Math" },
    { value: 27, label: "Science" },
    { value: 28, label: "Social Studies" },
    { value: 29, label: "Gym" },
    { value: 306, label: "Gym" },
  ];

  const classroomOptions = [
    { value: 1, label: "Homeroom" },
    { value: 2, label: "Math" },
    { value: 3, label: "Science" },
    { value: 4, label: "Social Studies" },
    { value: 5, label: "Gym" },
    { value: 6, label: "Music" },
  ];

  useMemo(() => {
    if (!beginTime) return [];
    const nextStart = addMinutes(new Date(`1970-01-01T${beginTime.value}`), 15);
    const formattedNextStart = nextStart.toTimeString().substring(0, 5); // "HH:mm"
    setEndTimeOptions(generateTimeOptions(formattedNextStart));
  }, [beginTime]);

  return (
    <div className="create-container">
      {beginTimeOptions !== undefined && endTimeOptions !== undefined ? (
        <main>
          <h2>Edit Class</h2>
          <div className="info">
            <div className="container">
              <div>
                <Text
                  value={className}
                  handleChange={(value) => setClassName(value)}
                  label="Name"
                />
              </div>
              <div className="end">
                <label>Subject</label>
                <VSpace />
                <Select
                  name="subject"
                  options={subjectOptions}
                  value={subjectOptions.find(
                    (option) => option.value === subject
                  )}
                  onChange={(selectedOption) => {
                    setSubject(selectedOption);
                  }}
                />
              </div>
            </div>
            <VSpace space={23} />
            <div className="container">
              <div>
                <label>Start Time</label>
                <VSpace />
                <Select
                  name="beginTime"
                  options={beginTimeOptions}
                  value={beginTimeOptions.find(
                    (option) => option.value === beginTime
                  )}
                  onChange={(selectedOption) =>
                    setBeginTime(selectedOption.value)
                  }
                />
              </div>
              <div className="end">
                <label>End Time</label>
                <VSpace />
                <Select
                  name="endTime"
                  options={endTimeOptions}
                  value={endTimeOptions.find(
                    (option) => option.value === endTime
                  )}
                  onChange={(selectedOption) =>
                    setEndTime(selectedOption.value)
                  }
                  isDisabled={!beginTime}
                />
              </div>
            </div>
            <VSpace space={23} />
            <div>
              <label>Assign teacher</label>
              <VSpace />
              <Select
                name="teacher"
                options={teacherOptions}
                value={teacherOptions.find(
                  (option) => option.value === teacher
                )}
                onChange={(selectedOption) => setTeacher(selectedOption)}
                isDisabled={!beginTime || !endTime}
              />
            </div>
            <VSpace space={23} />
            <div>
              <label>Assign classroom</label>
              <VSpace />
              <Select
                name="classroom"
                options={classroomOptions}
                value={classroomOptions.find(
                  (option) => option.value === classroom
                )}
                onChange={(selectedOption) => setClassroom(selectedOption)}
                isDisabled={!beginTime || !endTime}
              />
            </div>
          </div>
          <VSpace space={40} />
          <div>
            <Button label="Update class" onClick={() => handleEdit()} />
          </div>
        </main>
      ) : (
        <span>Loading..</span>
      )}
    </div>
  );
};

AdminEditClassDetailedPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AdminEditClassDetailedPage;
