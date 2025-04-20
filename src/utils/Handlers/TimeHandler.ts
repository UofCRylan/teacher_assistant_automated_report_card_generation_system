import { format, addMinutes, setMinutes, setHours } from "date-fns";

const generateTimeOptions = (startTime = "08:00") => {
  const options = [];
  const interval = 15;

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const start = setMinutes(setHours(new Date(), startHour), startMinute);
  const end = setMinutes(setHours(new Date(), 17), 0); // 5:00 PM

  let current = start;

  while (current <= end) {
    options.push({
      label: format(current, "h:mm a"), // e.g., "2:15 PM"
      value: format(current, "HH:mm"), // e.g., "14:15"
    });
    current = addMinutes(current, interval);
  }

  return options;
};

export { generateTimeOptions };
