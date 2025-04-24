import React, { useEffect, useState } from "react";
import accountManager from "@/src/utils/Managers/AccountManager";
import ippHandler from "@/src/utils/Handlers/IppHandler";
import styles from "./StudentIppDetailPage.module.css";
import Layout from "@/src/components/layout/Layout";
import { useRouter } from "next/router";
import Modal from "@/src/components/ui/Modal/Modal";
import Text from "@/src/components/ui/Input/Text.tsx";
import Button from "@/src/components/ui/Button/Button";

const TeacherIppDetailPage = () => {
  const router = useRouter();
  const [ipp, setIpp] = useState(undefined);
  const [showModal, setShowModal] = useState(false);

  // Edit fields
  const [goals, setGoals] = useState("");
  const [e_a, setEA] = useState("");
  const [s_d, setSD] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    const { studentID } = router.query;

    const fetchData = async () => {
      const user = await accountManager.getUserInfo();
      if (user !== undefined) {
        const result = await ippHandler.getSpecificStudentIpp(
          studentID,
          user.data.id
        );

        if (result.status === 200) {
          setIpp(result.data);
          setGoals(result.data.goals);
          setEA(result.data.e_a);
          setSD(result.data.s_d);
        }
      }
    };

    fetchData();
  }, [router.isReady]);

  const handleEdit = async () => {
    if (!ipp) return;

    const { studentID } = router.query;

    const updatedData = {
      goals,
      e_a,
      s_d,
    };

    const result = await ippHandler.updateIpp(studentID, updatedData); // Assuming .id is IPP ID
    if (result.status === 200) {
      setShowModal(false);
      setIpp({ ...ipp, ...updatedData }); // Optimistically update UI
    }
  };

  return (
    <div className={styles.page}>
      {ipp !== undefined ? (
        <>
          <div className={styles.card}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h1 className={styles.title}>Individual Program Plan</h1>
              <Button onClick={() => setShowModal(true)} label="Edit IPP" />
            </div>

            <div className={styles.section}>
              <h2>Student Info</h2>
              <div className={styles.grid}>
                <Info label="Name" value={ipp.student.data.full_name} />
                <Info label="Email" value={ipp.student.data.email} />
                <Info label="Phone" value={ipp.student.data.phone_number} />
                <Info
                  label="Date of Birth"
                  value={ipp.student.data.date_of_birth}
                />
              </div>
            </div>

            <div className={styles.section}>
              <h2>Teacher Info</h2>
              <div className={styles.grid}>
                <Info label="Name" value={ipp.teacher.data.full_name} />
                <Info label="Email" value={ipp.teacher.data.email} />
                <Info label="Phone" value={ipp.teacher.data.phone_number} />
                <Info
                  label="Date of Birth"
                  value={ipp.teacher.data.date_of_birth}
                />
              </div>
            </div>

            <div className={styles.section}>
              <h2>IPP Details</h2>
              <div className={styles.grid}>
                <Info label="Goal" value={ipp.goals} />
                <Info label="Specified Disability" value={ipp.s_d} />
                <Info label="Educational Aids" value={ipp.e_a} />
              </div>
            </div>
          </div>

          <Modal
            show={showModal}
            handleClose={() => setShowModal(false)}
            width="500px"
            borderRadius="12px"
          >
            <h2 style={{ marginBottom: "20px" }}>Edit IPP</h2>

            <Text
              type="text"
              label="Goals"
              placeholder="Update goals"
              value={goals}
              handleChange={setGoals}
            />
            <div style={{ marginTop: "16px" }}>
              <Text
                type="text"
                label="Educational Aids"
                placeholder="Update educational aids"
                value={e_a}
                handleChange={setEA}
              />
            </div>
            <div style={{ marginTop: "16px", marginBottom: "20px" }}>
              <Text
                type="text"
                label="Specified Disability"
                placeholder="Update specified disability"
                value={s_d}
                handleChange={setSD}
              />
            </div>
            <Button onClick={() => handleEdit()} label="Save" />
          </Modal>
        </>
      ) : (
        <span>Loading</span>
      )}
    </div>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <div className={styles.infoItem}>
    <span className={styles.label}>{label}:</span>
    <span className={styles.value}>{value}</span>
  </div>
);

TeacherIppDetailPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TeacherIppDetailPage;
