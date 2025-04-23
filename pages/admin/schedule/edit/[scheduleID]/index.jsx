import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import Modal from "@/src/components/ui/Modal/Modal.js";
import Button from "@/src/components/ui/Button/Button.tsx";
import ScheduleView from "@/src/components/pages/general/ScheduleView.tsx";
import classHandler from "@/src/utils/Handlers/ClassHandler.ts";
import scheduleHandler from "@/src/utils/Handlers/ScheduleHandler.ts";
import Layout from "@/src/components/layout/Layout";

const AdminEditDetailSchedulePage = () => {
  const router = useRouter();
  const { scheduleID } = router.query;

  const [scheduleId, setScheduleId] = useState(null);
  const [allClasses, setAllClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [grade, setGrade] = useState(undefined);

  const gradeOptions = [
    { value: 1, label: "Grade 1" },
    { value: 2, label: "Grade 2" },
    { value: 3, label: "Grade 3" },
    { value: 4, label: "Grade 4" },
    { value: 5, label: "Grade 5" },
    { value: 6, label: "Grade 6" },
  ];

  useEffect(() => {
    if (!router.isReady || !scheduleID) return;

    // 1. Set schedule ID
    setScheduleId(Number(scheduleID));

    // 2. Fetch all classes + classes already in this schedule
    const fetchData = async () => {
      const classData = await classHandler.getAllClasses();
      const scheduleData = await scheduleHandler.getSchedule(scheduleID);

      setAllClasses(classData.data);

      const existingSchedule = scheduleData.data.classes;

      const gradeValue = scheduleData.data.grade_level;
      const matchedGrade = gradeOptions.find((opt) => opt.value === gradeValue);
      setGrade(matchedGrade);

      const formattedSchedule = existingSchedule.map((item) => ({
        class_id: item.class.class_number,
        section: item.class.section,
        time_start: item.class.time_start,
        time_end: item.class.time_end,
        class: item.class,
      }));

      setSelectedClasses(formattedSchedule);
    };

    fetchData();
  }, [router.isReady, scheduleID]);

  const availableClassOptions = allClasses
    .filter(
      (cls) => !selectedClasses.find((s) => s.class_id === cls.class_number)
    )
    .map((cls) => ({
      value: cls.class_number,
      label: `${cls.class_name} (${cls.time_start} - ${cls.time_end})`,
    }));

  const handleAddClass = () => {
    const cls = allClasses.find((c) => c.class_number === selectedClassId);
    if (cls && selectedClasses.length < 8) {
      const newClass = {
        class_id: cls.class_number,
        section: cls.section,
        time_start: cls.time_start,
        time_end: cls.time_end,
        class: cls,
      };
      setSelectedClasses([...selectedClasses, newClass]);
    }
    setShowModal(false);
    setSelectedClassId(null);
  };

  const handleRemoveClass = (classId) => {
    setSelectedClasses(
      selectedClasses.filter((cls) => cls.class_id !== classId)
    );
  };

  const handleSave = async () => {
    const payload = selectedClasses.map(
      ({ class_id, section, time_start, time_end }) => ({
        class_id,
        section,
        time_start,
        time_end,
      })
    );

    const data = {
      grade_level: grade.value,
      classes: payload,
    };

    const result = await scheduleHandler.updateSchedule(scheduleId, data);

    console.log("Creation: ", result);

    console.log("Payload to send to API:", payload);
    // axios.put(`/api/schedules/${scheduleId}`, { schedule: payload });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Edit Schedule #{scheduleId}</h2>

      <div style={{ marginBottom: "1rem", maxWidth: "300px" }}>
        <label style={{ marginBottom: "0.5rem", display: "block" }}>
          Schedule ID
        </label>
        <input
          type="text"
          value={scheduleId || ""}
          disabled
          style={{
            padding: "0.5rem",
            width: "100%",
            backgroundColor: "#f1f1f1",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>
      <div style={{ marginBottom: "1rem", maxWidth: "300px" }}>
        <label style={{ marginBottom: "0.5rem", display: "block" }}>
          Select a grade level
        </label>
        {grade !== undefined && (
          <Select
            options={gradeOptions}
            value={grade}
            onChange={(opt) => setGrade(opt)}
            instanceId="select-grade-level"
          />
        )}
      </div>

      <Button
        label="Add Class"
        onClick={() => setShowModal(true)}
        disabled={selectedClasses.length >= 8}
      />

      <div style={{ marginTop: "2rem" }}>
        <h3>Schedule Preview</h3>
        <ScheduleView schedule={selectedClasses} />

        {selectedClasses.length > 0 && (
          <ul style={{ marginTop: "1rem" }}>
            {selectedClasses.map((cls) => (
              <li key={cls.class_id} style={{ marginBottom: "0.5rem" }}>
                {cls.class.class_name} - {cls.time_start} to {cls.time_end}
                <Button
                  label="Remove"
                  onClick={() => handleRemoveClass(cls.class_id)}
                  style={{ marginLeft: "1rem", fontSize: "0.8rem" }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: "2rem" }}>
        <Button
          label="Save Changes"
          onClick={handleSave}
          disabled={selectedClasses.length === 0}
        />
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        handleClose={() => setShowModal(false)}
        width="400px"
      >
        <h3>Select Class</h3>
        <Select
          options={availableClassOptions}
          onChange={(opt) => setSelectedClassId(opt.value)}
          placeholder="Choose a class..."
          instanceId="select-class-modal"
        />
        <div style={{ marginTop: "1rem" }}>
          <Button
            label="Add to Schedule"
            onClick={handleAddClass}
            disabled={selectedClassId == null}
          />
        </div>
      </Modal>
    </div>
  );
};

AdminEditDetailSchedulePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AdminEditDetailSchedulePage;
