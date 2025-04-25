import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import Modal from "@/src/components/ui/Modal/Modal.js";
import Button from "@/src/components/ui/Button/Button.tsx";
import ScheduleView from "@/src/components/pages/general/ScheduleView.tsx";
import classHandler from "@/src/utils/Handlers/ClassHandler.ts";
import scheduleHandler from "@/src/utils/Handlers/ScheduleHandler.ts";
import Layout from "@/src/components/layout/Layout";
import { toast } from "react-toastify";
import Text from "@/src/components/ui/Input/Text.tsx";
import IconButton from "../../../../../src/components/ui/Button/IconButton";
import { RiAddLargeLine, RiDeleteBinLine } from "@remixicon/react";
import VSpace from "../../../../../src/components/ui/Space/VSpace";
import styles from "@/src/styles/admin/schedule/edit.module.css";

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
    { value: 7, label: "Grade 7" },
    { value: 8, label: "Grade 8" },
    { value: 9, label: "Grade 9" },
    { value: 10, label: "Grade 10" },
    { value: 11, label: "Grade 11" },
    { value: 12, label: "Grade 12" },
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
      value: { classID: cls.class_number, section: cls.section },
      label: `${cls.class_name} (${cls.time_start} - ${cls.time_end})`,
    }));

  const handleAddClass = () => {
    console.log("all: ", allClasses);
    console.log("selected: ", selectedClassId);
    const cls = allClasses.find(
      (c) =>
        c.class_number === selectedClassId.classID &&
        c.section === selectedClassId.section
    );

    console.log("Cls: ", cls);

    let hasOverlap = false;
    selectedClasses.forEach((element) => {
      if (
        overlap(
          cls.time_start,
          cls.time_end,
          element.time_start,
          element.time_end
        )
      ) {
        toast.error("Class overlaps with another class currently in schedule");
        hasOverlap = true;
      }
    });

    if (hasOverlap) {
      return;
    }

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

  const handleRemoveClass = (classId, section) => {
    let keepClasses = [];

    selectedClasses.forEach((cls) => {
      if (cls.class_id !== classId || cls.section !== section) {
        keepClasses.push(cls);
      }
    });

    setSelectedClasses(keepClasses);
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

    const result = await scheduleHandler.editSchedule(scheduleId, data);

    console.log(result);

    if (result.error) {
      toast.error(result.error.response.data);
      return;
    }

    toast.success(result.data);
    router.push("/admin/schedule");
  };

  const overlap = (time1_start, time1_end, time2_start, time2_end) => {
    return time1_start < time2_end && time1_end > time2_start;
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex" }}>
        <div>
          <h2>Edit Schedule #{scheduleId}</h2>
          <div style={{ marginBottom: "1rem", maxWidth: "300px" }}>
            <label style={{ marginBottom: "0.5rem", display: "block" }}>
              Schedule ID
            </label>
            <Text value={scheduleId || ""} disabled />
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
        </div>
        <div style={{ marginLeft: "auto" }}>
          <div style={{ marginBottom: "1rem" }}>
            <IconButton
              icon={<RiAddLargeLine />}
              text="Add Class"
              handleClick={() => setShowModal(true)}
              disabled={selectedClasses.length >= 8}
              width={200}
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3>Schedule Preview</h3>
        <ScheduleView schedule={selectedClasses} />
        <VSpace space={25} />
        {selectedClasses.length > 0 &&
          selectedClasses.map((cls, index) => (
            <div
              key={index}
              style={{ marginBottom: "0.5rem" }}
              className={styles.classContainer}
            >
              {cls.class.class_name} - {cls.time_start} to {cls.time_end}
              <button
                onClick={() => handleRemoveClass(cls.class_id, cls.section)}
                className={styles.classIcon}
              >
                <RiDeleteBinLine className={styles.lineIcon} />
              </button>
            </div>
          ))}
      </div>

      <div style={{ marginTop: "2rem" }}>
        <Button
          label="Save Changes"
          onClick={handleSave}
          disabled={selectedClasses.length === 0}
        />
      </div>
      <Modal
        show={showModal}
        handleClose={() => setShowModal(false)}
        width={650}
        height={650}
      >
        <h2>Select a class</h2>
        <Select
          options={availableClassOptions}
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

AdminEditDetailSchedulePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AdminEditDetailSchedulePage;
