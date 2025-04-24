import React, { useState, useEffect } from "react";
import accountManager from "@/src/utils/Managers/AccountManager";
import ippHandler from "@/src/utils/Handlers/IppHandler";
import classHandler from "@/src/utils/Handlers/ClassHandler.ts";
import styles from "./StudentIppPage.module.css";
import Layout from "@/src/components/layout/Layout";
import Link from "next/link";
import Select from "react-select";
import Modal from "@/src/components/ui/Modal/Modal";
import Text from "@/src/components/ui/Input/Text";
import Button from "@/src/components/ui/Button/Button";
import IconButton from "@/src/components/ui/Button/IconButton.jsx";
import { RiAddLine } from "@remixicon/react";

const TeacherIppPage = () => {
  const [ipps, setIpps] = useState(undefined);
  const [students, setStudents] = useState([]);
  const [studentOptions, setStudentOptions] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [goals, setGoals] = useState("");
  const [e_a, setEA] = useState("");
  const [s_d, setSD] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const user = await accountManager.getUserInfo();
      const studentData = await classHandler.getAllStudents();
      const studentOptionsFormatted = studentData.data.map((student) => ({
        value: student.id,
        label: student.full_name,
      }));

      setStudents(studentData.data);
      setStudentOptions(studentOptionsFormatted);

      if (user !== undefined) {
        const result = await ippHandler.getTeachersIpp(user.data.id);
        if (result.status === 200) {
          setIpps(result.data);
        }
      }
    };

    fetchData();
  }, []);

  const handleCreate = async () => {
    if (!selectedStudent || !goals || !e_a || !s_d) return;

    const student_id = selectedStudent.value;

    const data = {
      goals,
      e_a,
      s_d,
    };

    const result = await ippHandler.updateIpp(student_id, data);
    if (result.status === 201) {
      setShowModal(false);
      setGoals("");
      setEA("");
      setSD("");
      setSelectedStudent(null);

      const user = await accountManager.getUserInfo();
      const updatedIpps = await ippHandler.getTeachersIpp(user.data.id);
      if (updatedIpps.status === 200) {
        setIpps(updatedIpps.data);
        setShowModal(false);
      }
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 className={styles.title}>Your Individual Program Plans</h1>
          <IconButton
            onClick={() => setShowModal(true)}
            icon={<RiAddLine />}
            text={"Create IPP"}
          />
        </div>

        <div className={styles.grid}>
          {ipps !== undefined &&
            ipps.map((ipp, index) => (
              <Link
                key={index}
                href={`/teacher/ipp/${ipp.student.data.id}`}
                className={styles.card}
              >
                <div className={styles.cardHeader}>
                  <h2>{ipp.e_a}</h2>
                  <span className={styles.sub}>
                    with {ipp.student.data.full_name}
                  </span>
                </div>
                <p className={styles.goal}>
                  {ipp.goals.length > 70
                    ? ipp.goals.slice(0, 70) + "..."
                    : ipp.goals}
                </p>
                <div className={styles.meta}>
                  <span>Specified Disability: {ipp.s_d}</span>
                  <span className={styles.linkHint}>View IPP →</span>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {showModal && (
        <Modal
          show={showModal}
          handleClose={() => setShowModal(false)}
          width="500px"
          borderRadius="12px"
        >
          <h2 style={{ marginBottom: "20px" }}>Create New IPP</h2>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>
              Select Student:
            </label>
            <Select
              options={studentOptions}
              value={selectedStudent}
              onChange={setSelectedStudent}
              placeholder="Choose a student..."
            />
          </div>

          <Text
            type="text"
            label="Goals"
            placeholder="Enter goals"
            value={goals}
            handleChange={setGoals}
          />
          <div style={{ marginTop: "16px" }}>
            <Text
              type="text"
              label="Educational Aids"
              placeholder="Enter educational aids"
              value={e_a}
              handleChange={setEA}
            />
          </div>
          <div style={{ marginTop: "16px", marginBottom: "20px" }}>
            <Text
              type="text"
              label="Specified Disability"
              placeholder="Enter specified disability details"
              value={s_d}
              handleChange={setSD}
            />
          </div>

          <Button
            label="Save"
            onClick={handleCreate}
            style={{
              padding: "10px 20px",
              backgroundColor: "#1565c0",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          />
        </Modal>
      )}
    </div>
  );
};

TeacherIppPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TeacherIppPage;
