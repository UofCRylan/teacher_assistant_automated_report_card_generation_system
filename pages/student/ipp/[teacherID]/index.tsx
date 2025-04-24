import React, { useEffect, useState } from "react";
import accountManager from "@/src/utils/Managers/AccountManager";
import ippHandler from "@/src/utils/Handlers/IppHandler";
import styles from "./StudentIppDetailPage.module.css";
import Layout from "@/src/components/layout/Layout";
import { useRouter } from "next/router";

const StudentIppDetailPage = () => {
  const router = useRouter();
  const [ipp, setIpp] = useState(undefined);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { teacherID } = router.query;

    const fetchData = async () => {
      const user = await accountManager.getUserInfo();
      if (user !== undefined) {
        const result = await ippHandler.getSpecificStudentIpp(
          user.data.id,
          teacherID
        );

        if (result.status === 200) {
          setIpp(result.data);
        }
      }
    };

    fetchData();
  }, [router.isReady]);

  return (
    <div className={styles.page}>
      {ipp !== undefined ? (
        <>
          <div className={styles.card}>
            <h1 className={styles.title}>Individual Program Plan</h1>

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
                <Info label="SD" value={ipp.s_d} />
                <Info label="EA" value={ipp.e_a} />
              </div>
            </div>
          </div>
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

StudentIppDetailPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default StudentIppDetailPage;
