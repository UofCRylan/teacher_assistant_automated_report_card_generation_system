import {
  RiBookletFill,
  RiBookletLine,
  RiCalendar2Fill,
  RiCalendar2Line,
  RiHome5Fill,
  RiHome5Line,
  RiTimeFill,
  RiTimeLine,
} from "@remixicon/react";

const TabManager = {
  users: {
    a: {
      tabs: [
        {
          label: "Admin Home",
          icon: RiHome5Line,
          href: "/a",
          root: true,
          active: {
            icon: RiHome5Fill,
          },
        },
      ],
    },
    t: {
      tabs: [
        {
          label: "Teacher Home",
          icon: RiHome5Line,
          href: "/t",
          root: true,
          active: {
            icon: RiHome5Fill,
          },
        },
        {
          label: "Schedule",
          icon: RiCalendar2Line,
          href: "/t/schedule",
          root: false,
          active: {
            icon: RiCalendar2Fill,
          },
        },
        {
          label: "Classes & Report cards",
          icon: RiBookletLine,
          href: "/t/classes",
          root: false,
          active: {
            icon: RiBookletFill,
          },
        },
        {
          label: "Attendance",
          icon: RiTimeLine,
          href: "/t/attendance",
          root: false,
          active: {
            icon: RiTimeFill,
          },
        },
      ],
    },
    s: {
      tabs: [
        {
          label: "Student Home",
          icon: RiHome5Line,
          href: "/student",
          root: true,
          active: {
            icon: RiHome5Fill,
          },
        },
        {
          label: "Schedule",
          icon: RiCalendar2Line,
          href: "/student/schedule",
          root: false,
          active: {
            icon: RiCalendar2Fill,
          },
        },
        {
          label: "Classes & Grades",
          icon: RiBookletLine,
          href: "/student/classes",
          root: false,
          active: {
            icon: RiBookletFill,
          },
        },
        {
          label: "Attendance",
          icon: RiTimeLine,
          href: "/student/attendance",
          root: false,
          active: {
            icon: RiTimeFill,
          },
        },
      ],
    },
  },
};

export default TabManager;
