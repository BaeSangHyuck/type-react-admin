// MainContent.tsx
import React from "react";
import styles from "../style/MainPage.module.css";

const MainContent = () => {
  return (
    <div className={styles.main_content}>
      <div className={styles.content_card}>
        <h3 className={styles.content_title}>메인페이지 입니다.
        </h3>
        <p className={styles.content_text}>
          Manage your tasks and view insights.
        </p>
      </div>
    </div>
  );
};

export default MainContent;
