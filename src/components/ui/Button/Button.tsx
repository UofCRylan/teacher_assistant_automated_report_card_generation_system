import React from "react";
import "../../../styles/general/ui/button.css";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  id?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled = false,
  onClick,
  id,
  className,
}) => {
  return (
    <input
      id={id}
      className={`button ${className}`}
      type="button"
      value={label}
      disabled={disabled}
      onClick={onClick}
    />
  );
};

export default Button;
