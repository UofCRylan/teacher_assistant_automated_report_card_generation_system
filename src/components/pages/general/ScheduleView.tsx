import React from "react";
import styles from "./ScheduleView.module.css";
import {
  format,
  addMinutes,
  isBefore,
  parse,
  differenceInMinutes,
} from "date-fns";

const ScheduleView = () => {
  const styling = {
    Math: "mathColor",
    Science: "scienceColor",
  };

  const schedule = [
    {
      class_id: 1,
      class_section: 5,
      class_room: 8,
      class_name: "Algebra I",
      class_subject: "Math",
      time_start: "08:00",
      time_end: "09:00",
    },
    {
      class_id: 3,
      class_section: 5,
      class_room: 8,
      class_name: "Calculus I",
      class_subject: "Math",
      time_start: "11:00",
      time_end: "12:00",
    },
    {
      class_id: 1,
      class_section: 5,
      class_room: 8,
      class_name: "Algebra I",
      class_subject: "Science",
      time_start: "13:00",
      time_end: "14:15",
    },
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const startTime = parse("08:00", "HH:mm", new Date());
  const endTime = parse("17:00", "HH:mm", new Date());

  const timeSlots = [];
  let currentTime = startTime;
  while (isBefore(currentTime, endTime)) {
    timeSlots.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, 15);
  }

  const getClassesByDay = (day) => {
    // You can customize per day logic if needed later
    return schedule;
  };

  const renderDayColumn = (day) => {
    const classes = getClassesByDay(day);
    const elements = [];
    let index = 0;

    while (index < timeSlots.length) {
      const currentSlot = timeSlots[index];
      const cls = classes.find((c) => c.time_start === currentSlot);

      if (cls) {
        const duration = differenceInMinutes(
          parse(cls.time_end, "HH:mm", new Date()),
          parse(cls.time_start, "HH:mm", new Date())
        );
        const slotCount = duration / 15;

        elements.push(
          <div
            key={`${day}-${cls.class_id}`}
            className={`${styles.classBlock} ${
              styles[styling[cls.class_subject]]
            }`}
            style={{ height: `${slotCount * 20}px` }}
          >
            <strong>{cls.class_name}</strong>
            <div>Room {cls.class_room}</div>
          </div>
        );

        index += slotCount;
      } else {
        elements.push(
          <div key={`${day}-empty-${index}`} className={styles.emptySlot}></div>
        );
        index++;
      }
    }

    return elements;
  };

  return (
    <div className={styles.container}>
      <div className={styles.scheduleWrapper}>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span
              className={`${styles.legendColor} ${styles.mathColor}`}
            ></span>
            <span className={styles.legendLabel}>Math</span>
          </div>
          <div className={styles.legendItem}>
            <span
              className={`${styles.legendColor} ${styles.scienceColor}`}
            ></span>
            <span className={styles.legendLabel}>Science</span>
          </div>
        </div>
        <div className={styles.dayHeaders}>
          <div className={styles.timeColumnHeader}></div>
          {days.map((day) => (
            <div key={day} className={styles.dayHeader}>
              {day}
            </div>
          ))}
        </div>

        <div className={styles.scheduleGrid}>
          <div className={styles.timeColumn}>
            {timeSlots.map((time) => (
              <div key={time} className={styles.timeSlot}>
                {format(parse(time, "HH:mm", new Date()), "hh:mm a")}
              </div>
            ))}
          </div>

          {days.map((day) => (
            <div key={day} className={styles.dayColumn}>
              {renderDayColumn(day)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleView;
