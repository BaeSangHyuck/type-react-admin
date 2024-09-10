// Header.tsx
import React from "react";
import styles from "../style/Header.module.css";

const Header = () => {
  return (
    <div className={styles.header_container}>
      <h2 className={styles.header_title}>POS ADMIN</h2>
      <div className={styles.header_actions}>
        <button className={`${styles.header_btn} ${styles.notification_btn}`}>
          🔔
        </button>
        <button className={`${styles.header_btn} ${styles.profile_btn}`}>
          👤
        </button>
      </div>
    </div>
  );
};

export default Header;
