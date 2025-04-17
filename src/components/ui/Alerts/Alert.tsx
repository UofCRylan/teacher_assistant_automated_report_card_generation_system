import {
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiInformationLine,
} from "@remixicon/react";
import React from "react";

import "./Alert.css";

interface AlertProps {
  message: string;
  type: "success" | "warning" | "error" | "info";
  closable?: boolean;
  timeoutMs?: number;
}

const Alert: React.FC<AlertProps> = ({
  type,
  message,
  closable,
  timeoutMs,
}) => {
  const icon = (function getIcon(type: string) {
    if (type === "success") {
      return <RiCheckboxCircleLine />;
    } else if (type === "warning") {
      return <RiErrorWarningLine />;
    } else if (type === "error") {
      return <RiErrorWarningLine />;
    } else if (type === "info") {
      return <RiInformationLine />;
    }
  })(type);

  return (
    <div className={`alert ${type}`}>
      <div>{icon}</div>
      <div>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Alert;
