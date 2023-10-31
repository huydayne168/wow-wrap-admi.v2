import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import styles from "./RootLayout.module.css";
import Chat from "../../components/Chat/Chat";
const RootLayout = () => {
    return (
        <div className={styles["root-layout"]}>
            <SideBar />
            <Chat />
            <Outlet />
        </div>
    );
};

export default RootLayout;
