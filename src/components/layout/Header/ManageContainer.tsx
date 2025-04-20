import React from "react";
import Avatar from "@/src/components/ui/Avatar/Avatar";
import { RiLogoutCircleRLine } from "@remixicon/react";
import "@/src/styles/general/layout/header.css";

interface ManageContainerProps {
  show?: boolean;
  handleViewInformation: () => void;
}

const ManageContainer: React.FC<ManageContainerProps> = ({
  show = false,
  setShow,
  fullName,
  handleViewInformation,
}) => {
  return (
    <div id="manage-container" style={{ display: show ? "flex" : "none" }}>
      <button
        className="information-button"
        onClick={() => {
          setShow();
          handleViewInformation();
        }}
      >
        <Avatar fullName={fullName} size="xs" />
        <span>{fullName}</span>
      </button>
      <div>
        <RiLogoutCircleRLine size={32} />
        <span>Sign Out</span>
      </div>
    </div>
  );
};

export default ManageContainer;
