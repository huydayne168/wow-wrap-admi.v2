import React from "react";
import styles from "./Table.module.css";
import { Voucher } from "../../../models/Voucher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const TableItem: React.FC<{ voucher: Voucher }> = ({ voucher }) => {
    return (
        <li key={voucher._id} className={styles["table-row"]}>
            <div className={`${styles["col"]} ${styles["col-1"]}`}>
                <span>{voucher.code}</span>
            </div>
            <div className={`${styles["col"]} ${styles["col-2"]}`}>
                {voucher.discountPercent}%
            </div>
            <div className={`${styles["col"]} ${styles["col-3"]}`}>
                {voucher.quantity}
            </div>
            <div className={`${styles["col"]} ${styles["col-4"]}`}>
                {voucher.end}
            </div>
            <div className={`${styles["col"]} ${styles["col-5"]}`}>
                {voucher.isActive ? "Available" : "Not Available"}
            </div>
            <div className={`${styles["col"]} ${styles["col-6"]}`}>
                <span>
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.06)" }}
                    />
                </span>
            </div>
        </li>
    );
};

export default TableItem;
