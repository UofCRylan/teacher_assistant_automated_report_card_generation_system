"use client";

import React from "react";
import { usePathname } from "next/navigation";
import "@/src/styles/general/ui/tab.css";

interface TabProps {
  icon: React.ReactElement;
  label: string;
  href: string;
  root: boolean;
  size?: number;
  activeIcon?: React.ReactElement;
}

const Tab: React.FC<TabProps> = ({
  icon,
  label,
  href,
  root,
  size = 30,
  activeIcon,
}) => {
  const location = usePathname();
  const isActive = (function checkActive(root) {
    if (!location) {
      return false;
    }

    if (root) {
      return location == href;
    }

    return location.startsWith(href);
  })(root);

  const iconWithProps = (() => {
    if (isActive && activeIcon) {
      return React.cloneElement(activeIcon, {
        size: size,
        className: "icon",
      });
    } else {
      return React.cloneElement(icon, {
        size: size,
        className: "icon",
      });
    }
  })();

  return (
    <a href={href}>
      <div className={`tab ${isActive ? "active" : ""}`}>
        {iconWithProps}
        {label}
      </div>
    </a>
  );
};

export default Tab;
