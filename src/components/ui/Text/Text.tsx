import React from "react";

interface TextProps {
  value: string;
  size?: number;
  bold?: boolean;
}

const Text: React.FC<TextProps> = ({ value, size = 14, bold = false }) => {
  return <span>{value}</span>;
};

export default Text;
