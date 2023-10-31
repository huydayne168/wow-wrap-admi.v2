import React from "react";
import styles from "./CustomBarLoader.module.css";
import { BarLoader } from "react-spinners";
const CustomBarLoader = () => {
    return (
        <div className={styles["bar-loader"]}>
            <BarLoader />
        </div>
    );
};

export default CustomBarLoader;
