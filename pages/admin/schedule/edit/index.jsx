import React, { useEffect, useState } from "react";
import styles from "@/src/styles/admin/schedule/edit.module.css";
import Layout from "../../../../src/components/layout/Layout";
import Link from "next/link";
import scheduleHandler from "@/src/utils/Handlers/ScheduleHandler.ts";
import { RiArrowRightSLine } from "@remixicon/react";
import Button from "../../../../src/components/ui/Button/Button";

const AdminEditSchedulePage = () => {
  const [schedules, setSchedules] = useState(undefined);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const rawSchedules = await scheduleHandler.getAllSchedules();

      const transformedSchedules = Object.entries(rawSchedules.data).map(
        ([scheduleId, classList]) => ({
          schedule_id: parseInt(scheduleId),
          classes: classList.map((item) => ({
            id: `${item.class.class_number}-${item.class.section}`,
            name: item.class.class_name,
            subject: item.class.subject,
            teacher: item.class.teacher.data.full_name,
            startTime: item.class.time_start,
            endTime: item.class.time_end,
          })),
        })
      );

      setSchedules(transformedSchedules);
    };

    fetchData();
  }, []);

  const openModal = (schedule) => {
    setSelectedSchedule(schedule);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSchedule(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Schedules</h1>
      <div className={styles.scheduleWrapper}>
        {schedules !== undefined &&
          schedules.map((schedule) => (
            <div key={schedule.schedule_id} className={styles.scheduleCard}>
              <Link href={`/admin/schedule/edit/${schedule.schedule_id}`}>
                <div className={styles.scheduleContent}>
                  <div>
                    <h2 className={styles.scheduleTitle}>
                      Schedule ID: {schedule.schedule_id}
                    </h2>
                    <div className={styles.classList}>
                      {schedule.classes.slice(0, 3).map((classItem) => (
                        <div key={classItem.id} className={styles.classItem}>
                          <h3>{classItem.name}</h3>
                          <p>
                            Subject: {classItem.subject} | Teacher:{" "}
                            {classItem.teacher}
                          </p>
                          <p>
                            Time: {classItem.startTime} - {classItem.endTime}
                          </p>
                        </div>
                      ))}
                      {schedule.classes.length > 3 && (
                        <Button
                          label="Show More"
                          className={styles.showMoreButton}
                          onClick={() => openModal(schedule)}
                        />
                      )}
                    </div>
                  </div>
                  <RiArrowRightSLine className={styles.arrowIcon} />
                </div>
              </Link>
            </div>
          ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedSchedule && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Schedule ID: {selectedSchedule.schedule_id}</h2>
            <div className={styles.classList}>
              {selectedSchedule.classes.map((classItem) => (
                <div key={classItem.id} className={styles.classItem}>
                  <h3>{classItem.name}</h3>
                  <p>
                    Subject: {classItem.subject} | Teacher: {classItem.teacher}
                  </p>
                  <p>
                    Time: {classItem.startTime} - {classItem.endTime}
                  </p>
                </div>
              ))}
            </div>
            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

AdminEditSchedulePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AdminEditSchedulePage;
