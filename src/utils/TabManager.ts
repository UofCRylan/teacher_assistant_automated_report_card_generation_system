import {
  RiBookletFill,
  RiBookletLine,
  RiBookShelfFill,
  RiBookShelfLine,
  RiCalendar2Fill,
  RiCalendar2Line,
  RiGraduationCapFill,
  RiGraduationCapLine,
  RiGroupFill,
  RiGroupLine,
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
          label: "Home",
          icon: RiHome5Line,
          href: "/admin",
          root: true,
          active: {
            icon: RiHome5Fill,
          },
        },
        {
          label: "Manage Class",
          icon: RiBookShelfLine,
          href: "/admin/class",
          root: false,
          active: {
            icon: RiBookShelfFill,
          },
        },
        {
          label: "Manage Schedule",
          icon: RiCalendar2Line,
          href: "/admin/schedule",
          root: false,
          active: {
            icon: RiCalendar2Fill,
          },
        },
        {
          label: "Manage Attendance",
          icon: RiTimeLine,
          href: "/admin/attendance",
          root: false,
          active: {
            icon: RiTimeFill,
          },
        },
      ],
    },
    t: {
      tabs: [
        {
          label: "Home",
          icon: RiHome5Line,
          href: "/teacher",
          root: true,
          active: {
            icon: RiHome5Fill,
          },
        },
        {
          label: "Schedule",
          icon: RiCalendar2Line,
          href: "/teacher/schedule",
          root: false,
          active: {
            icon: RiCalendar2Fill,
          },
        },
        {
          label: "Grades",
          icon: RiGraduationCapLine,
          href: "/teacher/grades",
          root: false,
          active: {
            icon: RiGraduationCapFill,
          },
        },
        {
          label: "Report cards",
          icon: RiBookletLine,
          href: "/teacher/reports",
          root: false,
          active: {
            icon: RiBookletFill,
          },
        },
        {
          label: "IPP",
          icon: RiGroupLine,
          href: "/teacher/ipp",
          root: false,
          active: {
            icon: RiGroupFill,
          },
        },
        {
          label: "Manage Attendance",
          icon: RiTimeLine,
          href: "/teacher/attendance",
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
          label: "Home",
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
          label: "My Classes",
          icon: RiBookShelfLine,
          href: "/student/class",
          root: false,
          active: {
            icon: RiBookShelfFill,
          },
        },
        {
          label: "Report Card",
          icon: RiBookletLine,
          href: "/student/report",
          root: false,
          active: {
            icon: RiBookletFill,
          },
        },
        {
          label: "IPP",
          icon: RiGroupLine,
          href: "/student/ipp",
          root: false,
          active: {
            icon: RiGroupFill,
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
