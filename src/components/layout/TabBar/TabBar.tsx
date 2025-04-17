import React from "react";
import Tab from "@/src/components/ui/Tab/Tab";
import TabManager from "@/src/utils/TabManager";
import "@/src/styles/general/layout/tabbar.css";

interface TabBarProps {
  userType: "a" | "s" | "t" | null;
}

const TabBar: React.FC<TabBarProps> = ({ userType }) => {
  const userTabs = userType != null ? TabManager.users[userType].tabs : [];

  return (
    <div className="tab-bar">
      {userTabs &&
        userTabs.map((tab, index) => {
          return (
            <Tab
              icon={<tab.icon />}
              activeIcon={<tab.active.icon />}
              href={tab.href}
              label={tab.label}
              root={tab.root}
              size={30}
              key={index}
            />
          );
        })}
    </div>
  );
};

export default TabBar;
