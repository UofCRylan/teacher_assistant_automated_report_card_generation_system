import React from "react";
import Header from "./Header/Header";

import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.content}>{children}</main>
    </>
  );
};

export default Layout;
