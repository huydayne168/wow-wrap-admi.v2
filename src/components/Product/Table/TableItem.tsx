import React, { useCallback, useState } from "react";
import { Product } from "../../../models/Product";
import styles from "./Table.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleInfo,
    faPenToSquare,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import DeletePopup from "../../UI/DeletePopup/DeletePopup";
import { useNavigate } from "react-router-dom";

const TableItem: React.FC<{ product: Product; deleteHandler: Function }> = ({
    product,
    deleteHandler,
}) => {
    const [popup, setPopup] = useState(false);
    const navigate = useNavigate();

    const gotoDetail = useCallback(() => {
        navigate("/admin/productDetail/" + product._id, { state: product });
    }, []);

    const gotoEdit = useCallback(() => {
        navigate("/admin/editProduct/" + product._id, { state: product });
    }, []);

    return (
        <li key={product._id} className={styles["table-row"]}>
            <div className={`${styles["col"]} ${styles["col-1"]}`}>
                <span>{product.rate}</span>
            </div>
            <div className={`${styles["col"]} ${styles["col-2"]}`}>
                {product._id}
            </div>
            <div
                className={`${styles["col"]} ${styles["col-3"]} ${styles["products"]}`}
            >
                <div>
                    <img
                        src={product.image}
                        alt={product.name}
                        className={styles["product-image"]}
                    />
                    <span>{product.name}</span>
                </div>
            </div>
            <div className={`${styles["col"]} ${styles["col-4"]}`}>
                <div className={styles["product-description"]}>
                    {product.shortDescription}
                </div>
            </div>
            <div className={`${styles["col"]} ${styles["col-5"]}`}>
                ${product.price}
            </div>
            <div className={`${styles["col"]} ${styles["col-6"]}`}>
                {product.category.name}
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
                        onClick={gotoEdit}
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
                        deleteHandler={async () => {
                            await deleteHandler(product._id);
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
