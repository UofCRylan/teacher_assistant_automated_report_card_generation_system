import React, { useState, useEffect } from "react";
import accountManager from "@/src/utils/Managers/AccountManager";
import ippHandler from "@/src/utils/Handlers/IppHandler";
import styles from "./StudentIppPage.module.css";
import Layout from "@/src/components/layout/Layout";
import Link from "next/link";

const StudentIppPage = () => {
  const [ipps, setIpps] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const user = await accountManager.getUserInfo();

      if (user !== undefined) {
        console.log("sending: ", user.data.id);
        const result = await ippHandler.getStudentsIpp(user.data.id);

        if (result.status === 200) {
          console.log("D: ", result.data);
          setIpps(result.data);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      {ipps !== undefined ? (
        <>
          <div className={styles.container}>
            <h1 className={styles.title}>📋 Your Individual Program Plans</h1>
            <div className={styles.grid}>
              {ipps !== undefined &&
                ipps.map((ipp, index) => (
                  <Link
                    key={index}
                    href={`/student/ipp/${ipp.teacher.id}`}
                    className={styles.card}
                  >
                    <div className={styles.cardHeader}>
                      <h2>{ipp.e_a}</h2>
                      <span className={styles.sub}>
                        with {ipp.teacher.full_name}
                      </span>
                    </div>
                    <p className={styles.goal}>
                      {ipp.goals.length > 70
                        ? ipp.goals.slice(0, 70) + "..."
                        : ipp.goals}
                    </p>
                    <div className={styles.meta}>
                      <span>📚 SD: {ipp.s_d}</span>
                      <span className={styles.linkHint}>View IPP →</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

StudentIppPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default StudentIppPage;
