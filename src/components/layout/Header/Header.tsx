"use client";

import React, { useState } from "react";
import TabBar from "../TabBar/TabBar";
import Avatar from "@/src/components/ui/Avatar/Avatar";
import "@/src/styles/general/layout/header.css";
import { RiArrowDropDownLine } from "@remixicon/react";
import ManageContainer from "./ManageContainer";
import { usePathname } from "next/navigation";

function Header() {
  const location = usePathname();
  let userType: "a" | "s" | "t" | null = null;

  if (location) {
    if (location.startsWith("/a")) {
      userType = "a";
    } else if (location.startsWith("/s")) {
      userType = "s";
    } else if (location.startsWith("/t")) {
      userType = "t";
    }
  }

  console.log(userType);
  const [showManageContainer, setShowManageContainer] = useState(false);

  const handleManageClick = () => {
    console.log("CLICKED");
    setShowManageContainer((prevState) => !prevState); // Toggle the state
  };

  return (
    <div className="header">
      <div>
        <div>
          <img
            src="/assets/images/uoftlogo.png"
            height={60}
            width={150}
            alt="Logo"
          />
        </div>
        <TabBar userType={userType} />
        <button id="manage-section" onClick={handleManageClick}>
          <Avatar fullName="Sarah Mackini" size="s" />
          <div id="manage-dropdown">
            <RiArrowDropDownLine size={32} />
          </div>
        </button>
      </div>
      <ManageContainer show={showManageContainer} />
    </div>
  );
}

export default Header;
