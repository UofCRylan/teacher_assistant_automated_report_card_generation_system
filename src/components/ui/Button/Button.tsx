import React from "react";
import styles from "../../../styles/general/ui/button.module.css";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  id?: string;
  className?: string;
  textColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  fontSize?: number;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled = false,
  onClick,
  id,
  className,
  textColor,
  backgroundColor,
  borderRadius,
  padding,
  fontSize,
}) => {
  return (
    <button
      id={id}
      className={`${styles.button} ${
        disabled ? styles.disabled : ""
      } ${className}`}
      disabled={disabled}
      onClick={onClick}
      style={{
        color: textColor || "white",
        backgroundColor: backgroundColor || "#092833",
        borderRadius: borderRadius || "5px",
        padding: padding || "10px 20px",
        border: "none",
        fontSize: fontSize || "16px",
      }}
    >
      {label}
    </button>
  );
};

export default Button;
