import React from "react";
import { ToastContainer, Bounce } from "react-toastify";

const MessageAlert = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  );
};

export default MessageAlert;
