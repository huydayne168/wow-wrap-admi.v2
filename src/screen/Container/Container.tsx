import React from "react";
import Header from "./Header";
import styles from "./Container.module.css";

const Container: React.FC<{
    children: React.ReactNode;
    headerTitle: string;
}> = ({ children, headerTitle }) => {
    return (
        <main className={styles["main-container"]}>
            <Header headerTitle={headerTitle} />
            {children}
        </main>
    );
};

export default Container;
