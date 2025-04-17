import React from "react";
import "../../../styles/general/ui/text.css";

interface InputProps {
  type: "text" | "password";
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

const Text: React.FC<InputProps> = ({
  type,
  label,
  placeholder = "",
  disabled = false,
  id,
  className,
}) => {
  return (
    <div id={id} className={className}>
      {label !== undefined && (
        <span>
          <b>{label}</b>
        </span>
      )}
      <input
        className="text"
        type={type}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

export default Text;
