import React, { useState, useMemo } from "react";
import Layout from "../../../../../src/components/layout/Layout";
import "@/src/styles/admin/class.css";
import Text from "../../../../../src/components/ui/Input/Text";
import Select from "react-select";
import Button from "../../../../../src/components/ui/Button/Button";
import { generateTimeOptions } from "@/src/utils/Handlers/TimeHandler.ts";
import { addMinutes } from "date-fns";
import VSpace from "../../../../../src/components/ui/Space/VSpace";

const AdminEditClassDetailedPage = () => {
  const [name, setName] = useState("");
  const [beginTime, setBeginTime] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);
  const [teacher, setTeacher] = useState(undefined);
  const [classroom, setClassroom] = useState(undefined);

  const subjectOptions = [
    { value: "Homeroom", label: "Homeroom" },
    { value: "Math", label: "Math" },
    { value: "Science", label: "Science" },
    { value: "social studies", label: "Social Studies" },
    { value: "Gym", label: "Gym" },
    { value: "Music", label: "Music" },
  ];

  const teacherOptions = [
    { value: "Homeroom", label: "Homeroom" },
    { value: "Math", label: "Math" },
    { value: "Science", label: "Science" },
    { value: "social studies", label: "Social Studies" },
    { value: "Gym", label: "Gym" },
    { value: "Music", label: "Music" },
  ];

  const classroomOptions = [
    { value: "Homeroom", label: "Homeroom" },
    { value: "Math", label: "Math" },
    { value: "Science", label: "Science" },
    { value: "social studies", label: "Social Studies" },
    { value: "Gym", label: "Gym" },
    { value: "Music", label: "Music" },
  ];

  const beginTimeOptions = generateTimeOptions("08:00");

  const endTimeOptions = useMemo(() => {
    if (!beginTime) return [];
    const nextStart = addMinutes(new Date(`1970-01-01T${beginTime.value}`), 15);
    const formattedNextStart = nextStart.toTimeString().substring(0, 5); // "HH:mm"
    return generateTimeOptions(formattedNextStart);
  }, [beginTime]);

  return (
    <div className="create-container">
      <main>
        <h2>Edit Class</h2>
        <div className="info">
          <div className="container">
            <div>
              <Text
                value={name}
                handleChange={(value) => setName(value)}
                label="Name"
              />
            </div>
            <div className="end">
              <label>Subject</label>
              <VSpace />
              <Select name="subject" options={subjectOptions} />
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
              onChange={(selectedOption) => setClassroom(selectedOption)}
              isDisabled={!beginTime || !endTime}
            />
          </div>
        </div>
        <VSpace space={40} />
        <div>
          <Button label="Update class" disabled />
        </div>
      </main>
    </div>
  );
};

AdminEditClassDetailedPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AdminEditClassDetailedPage;
