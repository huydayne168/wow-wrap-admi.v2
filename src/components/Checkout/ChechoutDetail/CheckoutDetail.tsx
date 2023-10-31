import React from "react";
import styles from "./CheckoutDetail.module.css";
import { Checkout } from "../../../models/Checkout";
import Container from "../../../screen/Container/Container";
import { useLocation } from "react-router-dom";
const CheckoutDetail: React.FC<{}> = ({}) => {
    const location = useLocation();
    const checkout: Checkout = location.state;
    return (
        <Container headerTitle="Checkout Detail">
            <div className={styles["checkout-detail"]}>
                <span>Checkout ID: {checkout._id}</span>
                <span>Time: {checkout.date}</span>
                <span>Receiver: {checkout.receiverName}</span>
                <span>Phone Number: {checkout.phoneNumber}</span>
                <span>Total: ${checkout.total}</span>
                <span>Status: {checkout.status}</span>
            </div>

            <div className={styles["products"]}>
                <p>Products:</p>
                <ul className={styles["responsive-table"]}>
                    <li className={styles["table-header"]}>
                        <div className={`${styles["col"]} ${styles["col-1"]}`}>
                            Product
                        </div>
                        <div className={`${styles["col"]} ${styles["col-2"]}`}>
                            Amount
                        </div>
                    </li>
                    {checkout.products.map((product) => {
                        return (
                            <li
                                key={product._id}
                                className={styles["table-row"]}
                            >
                                <div
                                    className={`${styles["col"]} ${styles["col-1"]}`}
                                >
                                    <div>
                                        <img
                                            src={product.product.image}
                                            alt={product._id}
                                            className={styles["product-image"]}
                                        />
                                        {product.product.name}
                                    </div>
                                </div>
                                <div
                                    className={`${styles["col"]} ${styles["col-2"]}`}
                                >
                                    {product.quantity}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Container>
    );
};

export default CheckoutDetail;
