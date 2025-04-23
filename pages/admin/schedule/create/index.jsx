import React, { useState, useEffect } from "react";
import Select from "react-select";
import Modal from "@/src/components/ui/Modal/Modal.js";
import Button from "@/src/components/ui/Button/Button.tsx";
import ScheduleView from "@/src/components/pages/general/ScheduleView.tsx";
import classHandler from "@/src/utils/Handlers/ClassHandler.ts";
import scheduleHandler from "@/src/utils/Handlers/ScheduleHandler.ts";
import Layout from "@/src/components/layout/Layout";

const AdminScheduleCreatePage = () => {
  const [scheduleId, setScheduleId] = useState(null);
  const [grade, setGrade] = useState(undefined);
  const [classes, setClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);

  const gradeOptions = [
    { value: 1, label: "Grade 1" },
    { value: 2, label: "Grade 2" },
    { value: 3, label: "Grade 3" },
    { value: 4, label: "Grade 4" },
    { value: 5, label: "Grade 5" },
    { value: 6, label: "Grade 6" },
  ];

  useEffect(() => {
    const fetchClasses = async () => {
      const result = await classHandler.getAllClasses();
      console.log("All classes: ", result);
      setClasses(result.data);
    };

    fetchClasses();
  }, []);

  const scheduleOptions = Array.from({ length: 100 }, (_, i) => ({
    value: i + 1,
    label: `Schedule ${i + 1}`,
  }));

  const classOptions = classes
    .filter(
      (cls) => !selectedClasses.find((s) => s.class_id === cls.class_number)
    )
    .map((cls) => ({
      value: cls.class_number,
      label: `${cls.class_name} (${cls.time_start} - ${cls.time_end})`,
    }));

  const handleAddClass = () => {
    const cls = classes.find((c) => c.class_number === selectedClassId);
    if (cls && selectedClasses.length < 8) {
      const newClass = {
        class_id: cls.class_number,
        section: cls.section,
        time_start: cls.time_start,
        time_end: cls.time_end,
        class: cls, // For ScheduleView display
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
      grade_level: grade,
      classes: payload,
    };

    const result = await scheduleHandler.updateSchedule(scheduleId, data);

    console.log("Creation: ", result);

    console.log("Payload to send to API:", payload);
    // axios.post('/api/createSchedule', { schedule_id: scheduleId, schedule: payload });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Create New Schedule</h2>

      <div style={{ marginBottom: "1rem", maxWidth: "300px" }}>
        <label style={{ marginBottom: "0.5rem", display: "block" }}>
          Select New Schedule ID
        </label>
        <Select
          options={scheduleOptions}
          onChange={(opt) => setScheduleId(opt.value)}
        />
      </div>
      <div style={{ marginBottom: "1rem", maxWidth: "300px" }}>
        <label style={{ marginBottom: "0.5rem", display: "block" }}>
          Select a grade level
        </label>
        <Select
          options={gradeOptions}
          onChange={(opt) => setGrade(opt.value)}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <Button
          label="Add Class"
          onClick={() => setShowModal(true)}
          disabled={selectedClasses.length >= 8}
        />
      </div>

      <div>
        <h3>Current Schedule</h3>
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
          label="Save Schedule"
          onClick={handleSave}
          disabled={!scheduleId || selectedClasses.length === 0}
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
          options={classOptions}
          onChange={(opt) => setSelectedClassId(opt.value)}
          placeholder="Choose a class..."
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

AdminScheduleCreatePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AdminScheduleCreatePage;
