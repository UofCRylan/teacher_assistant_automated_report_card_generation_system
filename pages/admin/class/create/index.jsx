import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../../../src/components/layout/Layout";
import "@/src/styles/admin/class.css";
import Text from "../../../../src/components/ui/Input/Text";
import Select from "react-select";
import Button from "../../../../src/components/ui/Button/Button";
import { generateTimeOptions } from "@/src/utils/Handlers/TimeHandler.ts";
import { addMinutes } from "date-fns";
import VSpace from "../../../../src/components/ui/Space/VSpace";
import classHandler from "@/src/utils/Handlers/ClassHandler.ts";
import teacherHandler from "@/src/utils/Handlers/TeacherHandler.ts";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const AdminCreateClassPage = () => {
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState(undefined);
  const [beginTime, setBeginTime] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);
  const [teacher, setTeacher] = useState(undefined);
  const [classroom, setClassroom] = useState(undefined);
  const [classId, setClassId] = useState(undefined);
  const [sectionId, setSectionId] = useState(undefined);

  const [teacherOptions, setTeacherOptions] = useState([]);
  const [teacherLoading, setTeacherLoading] = useState(false);

  const [classroomOptions, setClassroomOptions] = useState([]);
  const [classroomLoading, setClassroomLoading] = useState(false);

  const router = useRouter();

  const subjectOptions = [
    { value: "Homeroom", label: "Homeroom" },
    { value: "Math", label: "Math" },
    { value: "Science", label: "Science" },
    { value: "social studies", label: "Social Studies" },
    { value: "Gym", label: "Gym" },
    { value: "Music", label: "Music" },
  ];

  const classIdOptions = (function getClassOptions() {
    let result = [];

    for (let i = 0; i < 50; i++) {
      result.push({
        value: i + 1,
        label: `Class ${i + 1}`,
      });
    }

    return result;
  })();

  const sectionIdOptions = (function getSectionOptions() {
    let result = [];

    for (let i = 0; i < 5; i++) {
      result.push({
        value: i + 1,
        label: `Section ${i + 1}`,
      });
    }

    return result;
  })();

  const beginTimeOptions = generateTimeOptions("08:00");

  const endTimeOptions = useMemo(() => {
    if (!beginTime) return [];
    const nextStart = addMinutes(new Date(`1970-01-01T${beginTime.value}`), 15);
    const formattedNextStart = nextStart.toTimeString().substring(0, 5);
    return generateTimeOptions(formattedNextStart);
  }, [beginTime]);

  const fetchTeachers = async () => {
    setTeacherLoading(true);
    try {
      const result = await teacherHandler.getAllTeachers();

      if (result.error) {
        toast.error(result.error.response.data);
        return;
      }

      const formatted = result.data.map((teacher) => ({
        value: teacher.id,
        label: teacher.full_name,
      }));
      setTeacherOptions(formatted);
    } catch (error) {
      toast.error(error);
      return;
    } finally {
      setTeacherLoading(false);
    }
  };

  const fetchAvailableClassrooms = async (start, end) => {
    setClassroomLoading(true);
    try {
      const result = await classHandler.getClassrooms();

      const formatted = result.data.map((room) => ({
        value: room.room_id,
        label: `${room.building}-${room.room_number} | Capacity: ${room.capacity}`,
      }));

      setClassroomOptions(formatted);
    } catch (err) {
      console.error("Failed to fetch classrooms", err);
      setClassroomOptions([]);
    } finally {
      setClassroomLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (beginTime?.value && endTime?.value) {
      fetchAvailableClassrooms(beginTime.value, endTime.value);
    } else {
      setClassroomOptions([]);
    }
  }, [beginTime, endTime]);

  const handleCreate = async () => {
    const payload = {
      class_id: classId?.value,
      section_id: sectionId?.value,
      class_name: className,
      subject: subject?.value,
      time_start: beginTime?.value,
      time_end: endTime?.value,
      teacher_id: teacher?.value,
      room_id: classroom?.value,
    };

    const result = await classHandler.createClass(payload);

    if (result?.status === 200) {
      toast.success(result.data.message);
      router.push("/admin/class");
    } else {
      toast.error(result.error.response.data);
    }
  };

  return (
    <div className="create-container">
      <main>
        <h2>Create Class</h2>
        <div className="info">
          <div className="container">
            <div>
              <label>Class ID</label>
              <VSpace />
              <Select
                name="classId"
                options={classIdOptions}
                value={classId}
                onChange={setClassId}
              />
            </div>
            <div className="end">
              <label>Section Number</label>
              <VSpace />
              <Select
                name="sectionId"
                options={sectionIdOptions}
                value={sectionId}
                onChange={setSectionId}
              />
            </div>
          </div>
          <VSpace space={23} />
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
                onChange={setSubject}
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
                onChange={setBeginTime}
              />
            </div>
            <div className="end">
              <label>End Time</label>
              <VSpace />
              <Select
                name="endTime"
                options={endTimeOptions}
                value={endTime}
                onChange={setEndTime}
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
              onChange={setTeacher}
              isDisabled={!beginTime || !endTime || teacherLoading}
              isLoading={teacherLoading}
              placeholder={
                teacherLoading ? "Loading teachers..." : "Select teacher"
              }
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
              onChange={setClassroom}
              isDisabled={!beginTime || !endTime || classroomLoading}
              isLoading={classroomLoading}
              placeholder={
                classroomLoading ? "Loading classrooms..." : "Select classroom"
              }
            />
          </div>
        </div>
        <VSpace space={40} />
        <div>
          <Button label="Create class" onClick={handleCreate} />
        </div>
      </main>
    </div>
  );
};

AdminCreateClassPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AdminCreateClassPage;
