import React from "react";
import "./Modal.css";
import { RiCloseLine } from "@remixicon/react";

const Modal = ({
  children,
  show,
  width,
  height,
  borderRadius,
  style,
  handleClose,
}) => {
  const modalStyles = {
    ...(style || {}),
    ...(width && { width }),
    ...(height && { height }),
    ...(borderRadius && { borderRadius }),
  };

  return (
    <div className={`modal ${!show ? "hidden" : ""}`} style={modalStyles}>
      <button className="close-icon" onClick={() => handleClose()}>
        <RiCloseLine size={30} />
      </button>
      <div id="content">{children}</div>
    </div>
  );
};

export default Modal;
