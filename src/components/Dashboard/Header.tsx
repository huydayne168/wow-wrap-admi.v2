import React, { useState, useEffect, useMemo } from "react";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faCoins,
    faBalanceScale,
    faBowlFood,
} from "@fortawesome/free-solid-svg-icons";
import { Checkout } from "../../models/Checkout";
import { User } from "../../models/User";
import { Product } from "../../models/Product";
import { useAppDispatch } from "../../hooks/store/useStore";
import { Link, useNavigate } from "react-router-dom";
import { navigationActions } from "../../toolkit";
const Header: React.FC<{
    checkouts: Checkout[];
    users: User[];
    products: Product[];
}> = ({ checkouts, users, products }) => {
    // const dispatch = useAppDispatch();

    // calculate the earning
    const earning = useMemo(() => {
        return checkouts
            .filter((checkout) => checkout.status.toLowerCase() === "paid")
            .reduce((init, checkout) => init + Number(checkout.total), 0);
    }, [checkouts]);

    return (
        <div className={styles.headerCards}>
            <div className={`${styles.headerCard}`}>
                <div className={styles["card-body"]}>
                    <h5 className={styles["card-title"]}>
                        <span>{users.length}</span> Users
                    </h5>
                    <FontAwesomeIcon
                        style={{
                            backgroundColor: "#ffcccc",
                            color: "#de2046",
                        }}
                        icon={faUser}
                    />
                </div>
            </div>

            <div className={`${styles.headerCard}`}>
                <div className={styles["card-body"]}>
                    <h5 className={styles["card-title"]}>
                        <span>{products.length}</span> Products
                    </h5>
                    <FontAwesomeIcon
                        style={{
                            backgroundColor: "#f8edd2",
                            color: "#dcaa2c",
                        }}
                        icon={faBowlFood}
                    />
                </div>
            </div>

            <div className={`${styles.headerCard}`}>
                <div className={styles["card-body"]}>
                    <h5 className={styles["card-title"]}>
                        <span>${earning.toFixed(2)}</span> Earning
                    </h5>

                    <FontAwesomeIcon
                        style={{
                            backgroundColor: "#cce6cc",
                            color: "#329932",
                        }}
                        icon={faCoins}
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
