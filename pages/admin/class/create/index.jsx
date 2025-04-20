import React, { useState, useMemo } from "react";
import Layout from "../../../../src/components/layout/Layout";
import "@/src/styles/admin/class.css";
import Text from "../../../../src/components/ui/Input/Text";
import Select from "react-select";
import Button from "../../../../src/components/ui/Button/Button";
import { generateTimeOptions } from "@/src/utils/Handlers/TimeHandler.ts";
import { addMinutes } from "date-fns";
import VSpace from "../../../../src/components/ui/Space/VSpace";
import classHandler from "@/src/utils/Handlers/ClassHandler.ts";
import { useRouter } from "next/router";

const AdminCreateClassPage = () => {
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState(undefined);
  const [beginTime, setBeginTime] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);
  const [teacher, setTeacher] = useState(undefined);
  const [classroom, setClassroom] = useState(undefined);

  const router = useRouter();

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
  ];

  const classroomOptions = [
    { value: 1, label: "Homeroom" },
    { value: 2, label: "Math" },
    { value: 3, label: "Science" },
    { value: 4, label: "Social Studies" },
    { value: 5, label: "Gym" },
    { value: 6, label: "Music" },
  ]; // TODO: Make route

  const beginTimeOptions = generateTimeOptions("08:00");

  const endTimeOptions = useMemo(() => {
    if (!beginTime) return [];
    const nextStart = addMinutes(new Date(`1970-01-01T${beginTime.value}`), 15);
    const formattedNextStart = nextStart.toTimeString().substring(0, 5); // "HH:mm"
    return generateTimeOptions(formattedNextStart);
  }, [beginTime]);

  const handleCreate = async () => {
    const result = await classHandler.createClass({
      class_id: 60,
      section_id: 60,
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

  return (
    <div className="create-container">
      <main>
        <h2>Create Class</h2>
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
                value={subject}
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
                value={beginTime}
                onChange={(selectedOption) => {
                  setBeginTime(selectedOption);
                }}
              />
            </div>
            <div className="end">
              <label>End Time</label>
              <VSpace />
              <Select
                name="endTime"
                options={endTimeOptions}
                onChange={(selectedOption) => setEndTime(selectedOption)}
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
              value={teacher}
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
              value={classroom}
              onChange={(selectedOption) => setClassroom(selectedOption)}
              isDisabled={!beginTime || !endTime}
            />
          </div>
        </div>
        <VSpace space={40} />
        <div>
          <Button label="Create class" onClick={() => handleCreate()} />
        </div>
      </main>
    </div>
  );
};

AdminCreateClassPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AdminCreateClassPage;
