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

const TeacherScheduleView = ({ schedule }) => {
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

  // Find the closest 15-minute time slot for a given time
  const findNearestTimeSlot = (timeStr) => {
    try {
      // Parse the time
      const time = parse(timeStr, "HH:mm", new Date());

      // Get hours and minutes
      const hours = getHours(time);
      const minutes = getMinutes(time);

      // Round to nearest 15 minute increment
      const roundedMinutes = Math.floor(minutes / 15) * 15;

      // Create a new date with rounded minutes
      const roundedTime = setMinutes(
        parse(`${hours}:00`, "H:mm", new Date()),
        roundedMinutes
      );

      return format(roundedTime, "HH:mm");
    } catch (e) {
      console.error("Error finding nearest slot for:", timeStr, e);
      return timeStr;
    }
  };

  // Assign classes to specific days - for now using simple approach
  const getClassesByDay = (day) => {
    // This could be enhanced to filter classes by day if that data is added
    return schedule;
  };

  const renderDayColumn = (day) => {
    const classes = getClassesByDay(day);
    const elements = [];
    let index = 0;
    const processedSlots = new Set(); // Keep track of which slots we've handled

    // Pre-calculate the nearest time slot for each class and organize by time slot
    const classesByTimeSlot = {};
    classes.forEach((cls) => {
      const nearestSlot = findNearestTimeSlot(cls.time_start);
      if (!classesByTimeSlot[nearestSlot]) {
        classesByTimeSlot[nearestSlot] = [];
      }
      classesByTimeSlot[nearestSlot].push(cls);
    });

    while (index < timeSlots.length) {
      const currentSlot = timeSlots[index];

      // Check if a class starting at this time slot
      if (
        classesByTimeSlot[currentSlot] &&
        classesByTimeSlot[currentSlot].length > 0
      ) {
        const clsItem = classesByTimeSlot[currentSlot][0]; // Get the first class at this time

        try {
          const startTime = parse(clsItem.time_start, "HH:mm", new Date());
          const endTime = parse(clsItem.time_end, "HH:mm", new Date());

          const duration = differenceInMinutes(endTime, startTime);
          const slotCount = Math.max(1, Math.round(duration / 15));

          elements.push(
            <div
              key={`${day}-${clsItem.class_number}-${clsItem.time_start}`}
              className={`${styles.classBlock} ${
                styles[styling[clsItem.subject]] || styles.defaultColor
              }`}
              style={{ height: `${slotCount * SLOT_HEIGHT}px` }}
            >
              <strong>{clsItem.class_name}</strong>
              <div>Room {clsItem.room.room_number}</div>
              {clsItem.teacher && clsItem.teacher.data && (
                <div>{clsItem.teacher.data.full_name}</div>
              )}
              <div className={styles.classTime}>
                {clsItem.time_start} - {clsItem.time_end}
              </div>
            </div>
          );

          // Mark this time slot as processed
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

export default TeacherScheduleView;
