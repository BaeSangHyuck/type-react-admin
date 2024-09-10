// Sidebar.tsx
import React from "react";
import styles from "../style/SideBar.module.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={styles.sidebar_container}>
      <div className={styles.sidebar_logo}>
        <h2 >
          <Link to="/" style={{
          color:"white"
        }}>Admin</Link>
        </h2>
      </div>
      <ul className={styles.sidebar_menu}>
        <li>
          <Link to="/warehouse" className={styles.sidebar_link}>
            창고 설정
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
