import React from "react";

interface LabelProps {
  value: string;
  size?: "xl" | "l" | "m" | "s";
  bold?: boolean;
}

const Label: React.FC<LabelProps> = ({ value, size = "m", bold = true }) => {
  return <div>{value}</div>;
};

export default Label;
