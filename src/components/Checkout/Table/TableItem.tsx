import React, { useCallback, useState } from "react";
import styles from "./CheckoutTable.module.css";
import { Checkout } from "../../../models/Checkout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleInfo,
    faPenToSquare,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import DeletePopup from "../../UI/DeletePopup/DeletePopup";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../UI/Dropdown/Dropdown";
import useUpdateCheckoutStatus from "../../../hooks/api/Checkout/useUpdateCheckoutStatus";

const TableItem: React.FC<{ checkout: Checkout; deleteHandler: Function }> = ({
    checkout,
    deleteHandler,
}) => {
    const navigate = useNavigate();
    const [popup, setPopup] = useState(false);

    // function to go to see checkout detail:
    const gotoDetail = useCallback(() => {
        navigate("/admin/checkoutDetail", { state: checkout });
    }, []);

    const updateCheckoutStatus = useUpdateCheckoutStatus();

    const updateHandler = useCallback((status: string) => {
        updateCheckoutStatus(checkout._id, status);
    }, []);

    return (
        <li key={checkout._id} className={styles["table-row"]}>
            <div className={`${styles["col"]} ${styles["col-1"]}`}>
                <span>{checkout.date}</span>
            </div>
            <div className={`${styles["col"]} ${styles["col-2"]}`}>
                {checkout.receiverName}
            </div>
            <div
                className={`${styles["col"]} ${styles["col-3"]} ${styles["products"]}`}
            >
                {checkout.products.map((product) => {
                    return (
                        <div key={product._id}>
                            <img
                                src={product.product.image}
                                alt={product.product.name}
                                className={styles["product-image"]}
                            />
                            <span>
                                {product.product.name} x {product.quantity}
                            </span>
                        </div>
                    );
                })}
            </div>
            <div className={`${styles["col"]} ${styles["col-4"]}`}>
                {checkout.phoneNumber}
            </div>
            <div className={`${styles["col"]} ${styles["col-5"]}`}>
                ${checkout.total}
            </div>
            <div className={`${styles["col"]} ${styles["col-6"]}`}>
                {checkout.status}
            </div>
            <div className={`${styles["col"]} ${styles["col-7"]}`}>
                <span>
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.06)" }}
                        onClick={gotoDetail}
                    />
                </span>
                <span style={{ display: "flex" }}>
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{ backgroundColor: "#1677ff" }}
                    />
                    <Dropdown
                        dropdownList={[
                            "Paid",
                            "Canceled",
                            "Waiting for paying",
                        ]}
                        getDropdownValue={updateHandler}
                    />
                </span>
                <span className={styles["delete-btn"]}>
                    <FontAwesomeIcon
                        icon={faTrash}
                        style={{ backgroundColor: "#ff4d4f" }}
                        onClick={() => {
                            setPopup(true);
                        }}
                    />
                </span>
                {popup ? (
                    <DeletePopup
                        cancel={() => {
                            setPopup(false);
                        }}
                        deleteHandler={() => {
                            deleteHandler(checkout._id);
                        }}
                    />
                ) : (
                    ""
                )}
            </div>
        </li>
    );
};

export default TableItem;
