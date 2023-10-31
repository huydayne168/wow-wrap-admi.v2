import React, { useCallback } from "react";
import styles from "./Table.module.css";
import { User } from "../../../models/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSetSearchParams from "../../../hooks/search/useSetSearchParams";

const TableItem: React.FC<{ user: User }> = ({ user }) => {
    const navigate = useNavigate();

    const gotoDetail = useCallback(() => {
        navigate("/admin/userDetail/" + user._id, { state: user });
    }, []);

    return (
        <li key={user._id} className={styles["table-row"]}>
            <div className={`${styles["col"]} ${styles["col-1"]}`}>
                <span>{user._id}</span>
            </div>
            <div className={`${styles["col"]} ${styles["col-2"]}`}>
                {user.userName}
            </div>
            <div className={`${styles["col"]} ${styles["col-3"]}`}>
                {user.email}
            </div>
            <div className={`${styles["col"]} ${styles["col-4"]}`}>
                {user.phoneNumber}
            </div>
            <div className={`${styles["col"]} ${styles["col-5"]}`}>
                {user.roleId.name}
            </div>
            <div className={`${styles["col"]} ${styles["col-6"]}`}>
                <span>
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.06)" }}
                        onClick={gotoDetail}
                    />
                </span>
            </div>
        </li>
    );
};

export default TableItem;
