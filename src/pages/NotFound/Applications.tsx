import React from "react";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <span>This page could not be found.</span>
    </div>
  );
}

export default NotFound;
