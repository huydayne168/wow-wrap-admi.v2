import React from "react";
import styles from "./Header.module.css";
const Header: React.FC<{ headerTitle: string }> = ({ headerTitle }) => {
    return <h1 className={styles["heading"]}>{headerTitle}</h1>;
};

export default Header;
