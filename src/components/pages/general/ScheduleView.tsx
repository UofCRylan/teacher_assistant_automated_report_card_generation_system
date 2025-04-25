import React from "react";
import styles from "./ScheduleView.module.css";
import {
  format,
  addMinutes,
  isBefore,
  parse,
  differenceInMinutes,
  setMinutes,
  getMinutes,
  getHours,
} from "date-fns";
import { toast } from "react-toastify";

const ScheduleView = ({ schedule }) => {
  const styling = {
    Math: "mathColor",
    Science: "scienceColor",
    English: "englishColor",
    Gym: "gymColor",
    Music: "musicColor",
    Homeroom: "homeroomColor",
    "Social Studies": "socialStudiesColor",
  };
  const SLOT_HEIGHT = 80;

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const startTime = parse("08:00", "HH:mm", new Date());
  const endTime = parse("17:00", "HH:mm", new Date());

  const timeSlots = [];
  let currentTime = startTime;
  while (isBefore(currentTime, endTime)) {
    timeSlots.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, 15);
  }

  // Classes have 15 minute intervals
  const findNearestTimeSlot = (timeStr) => {
    try {
      const time = parse(timeStr, "HH:mm", new Date());

      const hours = getHours(time);
      const minutes = getMinutes(time);

      const roundedMinutes = Math.floor(minutes / 15) * 15;

      const roundedTime = setMinutes(
        parse(`${hours}:00`, "H:mm", new Date()),
        roundedMinutes
      );

      return format(roundedTime, "HH:mm");
    } catch (e) {
      toast.error("Error finding nearest slot for:", timeStr, e);
      return timeStr;
    }
  };

  const renderDayColumn = (day) => {
    const classes = schedule;
    const elements = [];
    let index = 0;
    const processedSlots = new Set();

    const classesByTimeSlot = {};
    classes.forEach((cls) => {
      const nearestSlot = findNearestTimeSlot(cls.class.time_start);
      if (!classesByTimeSlot[nearestSlot]) {
        classesByTimeSlot[nearestSlot] = [];
      }
      classesByTimeSlot[nearestSlot].push(cls);
    });

    while (index < timeSlots.length) {
      const currentSlot = timeSlots[index];

      if (
        classesByTimeSlot[currentSlot] &&
        classesByTimeSlot[currentSlot].length > 0
      ) {
        const clsItem = classesByTimeSlot[currentSlot][0];
        const { class: cls } = clsItem;

        try {
          const startTime = parse(cls.time_start, "HH:mm", new Date());
          const endTime = parse(cls.time_end, "HH:mm", new Date());

          const duration = differenceInMinutes(endTime, startTime);
          const slotCount = Math.max(1, Math.round(duration / 15));

          elements.push(
            <div
              key={`${day}-${cls.class_number}-${cls.time_start}`}
              className={`${styles.classBlock} ${
                styles[styling[cls.subject]] || styles.defaultColor
              }`}
              style={{ height: `${slotCount * SLOT_HEIGHT}px` }}
            >
              <strong>{cls.class_name}</strong>
              <div>Room {cls.room.room_number}</div>
              {cls.teacher && cls.teacher.data && (
                <div>{cls.teacher.data.full_name}</div>
              )}
              <div className={styles.classTime}>
                {cls.time_start} - {cls.time_end}
              </div>
            </div>
          );

          processedSlots.add(currentSlot);
          index += slotCount;
        } catch (error) {
          toast.error(error);
          elements.push(
            <div
              key={`${day}-error-${index}`}
              className={styles.emptySlot}
              style={{ height: `${SLOT_HEIGHT}px` }}
            ></div>
          );
          index++;
        }
      } else {
        elements.push(
          <div
            key={`${day}-empty-${index}`}
            className={styles.emptySlot}
            style={{ height: `${SLOT_HEIGHT}px` }}
          ></div>
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
          {Object.entries(styling).map(([subject, styleClass]) => (
            <div key={subject} className={styles.legendItem}>
              <span
                className={`${styles.legendColor} ${styles[styleClass]}`}
              ></span>
              <span className={styles.legendLabel}>{subject}</span>
            </div>
          ))}
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
