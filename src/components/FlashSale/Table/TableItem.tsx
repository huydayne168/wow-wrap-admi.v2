import React from "react";
import styles from "./Table.module.css";
import { FlashSale } from "../../../models/Flashsale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleInfo,
    faPenToSquare,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
const TableItem: React.FC<{ flashSale: FlashSale }> = ({ flashSale }) => {
    return (
        <li key={flashSale._id} className={styles["table-row"]}>
            <div className={`${styles["col"]} ${styles["col-1"]}`}>
                <span>{flashSale._id}</span>
            </div>
            <div className={`${styles["col"]} ${styles["col-2"]}`}>
                {flashSale.name}
            </div>
            <div
                className={`${styles["col"]} ${styles["col-3"]} ${styles["products"]}`}
            >
                {flashSale.discountPercent}%
            </div>
            <div className={`${styles["col"]} ${styles["col-4"]}`}>
                {flashSale.start}
            </div>
            <div className={`${styles["col"]} ${styles["col-5"]}`}>
                {flashSale.end}
            </div>
            <div className={`${styles["col"]} ${styles["col-6"]}`}>
                {flashSale.isActive ? "Available" : "Not Available"}
            </div>
            <div className={`${styles["col"]} ${styles["col-7"]}`}>
                <span>
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.06)" }}
                        // onClick={gotoDetail}
                    />
                </span>
                <span style={{ display: "flex" }}>
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ backgroundColor: "#1677ff" }}
                    />
                </span>
                <span className={styles["delete-btn"]}>
                    <FontAwesomeIcon
                        icon={faTrash}
                        style={{ backgroundColor: "#ff4d4f" }}
                    />
                </span>
            </div>
        </li>
    );
};

export default TableItem;
