import React, { useEffect } from "react";
import styles from "./UserDetail.module.css";
import { useParams, useSearchParams } from "react-router-dom";
import Container from "../../../screen/Container/Container";
import CheckoutTable from "../../Checkout/Table/CheckoutTable";
import useGetCheckout from "../../../hooks/api/Checkout/useGetCheckout";
import useGetUser from "../../../hooks/api/User/useGetUser";
import { useAppDispatch } from "../../../hooks/store/useStore";
import { checkoutQueryOptionsActions } from "../../../toolkit";

const UserDetail = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const userId = params.userId;

    const { users: user } = useGetUser({ _idQuery: userId }, []);

    useEffect(() => {
        if (userId) {
            dispatch(
                checkoutQueryOptionsActions.setQueryOptions({
                    key: "userIdQuery",
                    value: userId,
                })
            );
        }
    }, [userId]);

    return (
        <Container headerTitle="User Detail">
            <div className={styles["user-info-desc"]}>
                <div className={styles["info-type"]}>
                    <span>Name:</span> <span>{user[0]?.userName}</span>
                </div>
                <div className={styles["info-type"]}>
                    <span>Email:</span> <span>{user[0]?.email}</span>
                </div>
                <div className={styles["info-type"]}>
                    <span>Phone Number:</span>{" "}
                    <span>{user[0]?.phoneNumber}</span>
                </div>
            </div>
            <h2 className={styles["latest-checkout"]}>Checkouts History</h2>

            <CheckoutTable />
        </Container>
    );
};

export default UserDetail;
