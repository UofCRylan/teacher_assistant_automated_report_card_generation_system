import React from "react";
import Avatar from "@/src/components/ui/Avatar/Avatar";
import { RiLogoutBoxRFill } from "@remixicon/react";

interface ManageContainerProps {
  show?: boolean;
}

const ManageContainer: React.FC<ManageContainerProps> = ({ show = false }) => {
  return (
    <div id="manage-container" style={{ display: show ? "flex" : "none" }}>
      <div>
        <Avatar fullName="Sarah Mackini" size="xs" />
        <span>Sarah Mackini</span>
      </div>
      <div>
        <RiLogoutBoxRFill size={32} />
        <span>Sign Out</span>
      </div>
    </div>
  );
};

export default ManageContainer;
