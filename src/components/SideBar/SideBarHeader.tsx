import React from "react";
import { User } from "../../models/User";
import styles from "./SideBarHeader.module.css";
import Logo from "../UI/Logo/Logo";
const SideBarHeader: React.FC<{ user?: User }> = ({ user }) => {
    return (
        <div className={styles["side-bar-header"]}>
            <Logo />
            {user && user.userName ? user.userName : "Admin"}
        </div>
    );
};

export default SideBarHeader;
