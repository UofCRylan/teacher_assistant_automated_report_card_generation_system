import React, { useState } from "react";
import { format, startOfWeek, addWeeks } from "date-fns";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import "@/src/styles/student/attendance.css";

const WeekNavigator = () => {
  const [weekOffset, setWeekOffset] = useState(0);

  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 }); // Monday
  const currentWeekStart = addWeeks(startOfCurrentWeek, weekOffset);

  const displayLabel = () => {
    if (weekOffset === 0) return "This Week";
    if (weekOffset === -1) return "Last Week";

    const startLabel = format(currentWeekStart, "dd/MM");
    const endLabel = format(
      new Date(currentWeekStart.getTime() + 4 * 24 * 60 * 60 * 1000),
      "dd/MM"
    ); // Friday
    return `${startLabel} - ${endLabel}`;
  };

  const handleBack = () => setWeekOffset((prev) => prev - 1);
  const handleFront = () => {
    if (weekOffset < 0) setWeekOffset((prev) => prev + 1);
  };

  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <button className="button" onClick={handleBack}>
        <RiArrowLeftSLine />
      </button>
      <span className="time-label" style={{ margin: "0 1rem" }}>
        {displayLabel()}
      </span>
      <button
        className="button"
        onClick={handleFront}
        disabled={weekOffset === 0}
      >
        <RiArrowRightSLine />
      </button>

      {/* <div style={{ marginTop: "1rem" }}>
        {[0, 1, 2, 3, 4].map((i) => {
          const day = new Date(currentWeekStart);
          day.setDate(day.getDate() + i);
          return <div key={i}>{format(day, "EEEE dd/MM")}</div>;
        })}
      </div> */}
    </div>
  );
};

export default WeekNavigator;
