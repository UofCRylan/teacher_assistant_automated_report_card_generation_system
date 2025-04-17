import React from "react";

interface VSpaceProps {
  space?: number;
}

const VSpace: React.FC<VSpaceProps> = ({ space = 10 }) => {
  return <div id="vspace" style={{ height: space }}></div>;
};

export default VSpace;
