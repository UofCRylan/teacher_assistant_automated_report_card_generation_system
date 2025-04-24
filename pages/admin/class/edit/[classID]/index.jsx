import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Layout from "../../../../../src/components/layout/Layout";
import "@/src/styles/admin/class.css";
import Text from "../../../../../src/components/ui/Input/Text";
import Select from "react-select";
import Button from "../../../../../src/components/ui/Button/Button";
import { generateTimeOptions } from "@/src/utils/Handlers/TimeHandler.ts";
import { addMinutes, parse, format } from "date-fns";
import classHandler from "@/src/utils/Handlers/ClassHandler.ts";
import teacherHandler from "@/src/utils/Handlers/TeacherHandler.ts";
import VSpace from "../../../../../src/components/ui/Space/VSpace";
import { toast } from "react-toastify";

const AdminEditClassDetailedPage = () => {
  const router = useRouter();

  const [classID, setClassID] = useState(undefined);
  const [sectionID, setSectionID] = useState(undefined);
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState(undefined);
  const [beginTime, setBeginTime] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);
  const [teacher, setTeacher] = useState(undefined);
  const [classroom, setClassroom] = useState(undefined);

  const [teacherOptions, setTeacherOptions] = useState([]);
  const [teacherLoading, setTeacherLoading] = useState(false);

  const [classroomOptions, setClassroomOptions] = useState([]);
  const [classroomLoading, setClassroomLoading] = useState(false);

  const subjectOptions = [
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
    const formattedNextStart = nextStart.toTimeString().substring(0, 5);
    return generateTimeOptions(formattedNextStart);
  }, [beginTime]);

  useEffect(() => {
    if (!router.isReady) return;

    const fetchData = async () => {
      const { classID, section } = router.query;

      if (classID && section) {
        const result = await classHandler.getClass(classID, section);

        if (result?.status === 200) {
          const data = result.data;
          setClassID(data.class_number);
          setSectionID(data.section);
          setClassName(data.class_name);

          const start = data.time_start;
          const end = data.time_end;

          setBeginTime({
            label: format(parse(start, "HH:mm", new Date()), "h:mm a"),
            value: start,
          });
          setEndTime({
            label: format(parse(end, "HH:mm", new Date()), "h:mm a"),
            value: end,
          });

          setSubject(subjectOptions.find((s) => s.value === data.subject));
          setTeacher({
            value: data.teacher.data.id,
            label: data.teacher.data.full_name,
          });
          setClassroom({
            value: data.room.room_id,
            label: `${data.room.building}-${data.room.room_number} | Capacity: ${data.room.capacity}`,
          });
        }
      }
    };

    fetchData();
  }, [router.isReady]);

  useEffect(() => {
    const fetchTeachers = async () => {
      setTeacherLoading(true);
      const result = await teacherHandler.getAllTeachers();

      setTeacherOptions(result.data);

      setTeacherLoading(false);
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    const fetchClassrooms = async () => {
      if (beginTime?.value && endTime?.value) {
        setClassroomLoading(true);
        const result = await classHandler.getClassrooms();

        setClassroomOptions(result.data);

        setClassroomLoading(false);
      }
    };

    fetchClassrooms();
  }, [beginTime, endTime]);

  const handleEdit = async () => {
    const payload = {
      class_id: classID,
      section_id: sectionID,
      class_name: className,
      subject: subject?.value,
      time_start: beginTime?.value,
      time_end: endTime?.value,
      teacher_id: teacher?.value,
      room_id: classroom?.value,
    };

    try {
      const result = await classHandler.createClass(payload);
      toast.success(result.data.message);
      router.push("/admin/class");
    } catch (error) {
      toast.error(error); // TODO
    }
  };

  return (
    <div className="create-container">
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
              isLoading={teacherLoading}
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
              onChange={setClassroom}
              isLoading={classroomLoading}
              isDisabled={!beginTime || !endTime}
            />
          </div>
        </div>
        <VSpace space={40} />
        <div>
          <Button label="Update class" onClick={handleEdit} />
        </div>
      </main>
    </div>
  );
};

AdminEditClassDetailedPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AdminEditClassDetailedPage;
