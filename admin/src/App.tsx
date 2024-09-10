// App.tsx
import React from "react";
import styles from "./style/App.module.css";
import MainPage from "./component/MainPage.tsx";
import Header from "./component/Header.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./component/SideBar.tsx";
import WarehouseTable from "./component/WarehouseTable.tsx";
import WarehouseDetail from "./component/WarehouseDetail.tsx";

const App = () => {
  return (
    <div className={styles.app_container}>
      <BrowserRouter>
        <Sidebar />
        <div className={styles.main_section}>
          <Header />
          <div className={styles.content_area}>
            <Routes>
              <Route path="/warehouse" element={<WarehouseTable />} />
              <Route path="/warehouse/:id" element={<WarehouseDetail />} />
              <Route path="/*" element={<MainPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
