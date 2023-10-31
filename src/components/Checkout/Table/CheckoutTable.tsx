import React, { useCallback, useEffect } from "react";
import styles from "./CheckoutTable.module.css";
import TableItem from "./TableItem";
import Dropdown from "../../UI/Dropdown/Dropdown";
import SearchPopup from "../../UI/SearchPopup/SearchPopup";
import useDeleteCheckout from "../../../hooks/api/Checkout/useDeleteCheckout";
import { useAppDispatch, useAppSelector } from "../../../hooks/store/useStore";
import CustomBarLoader from "../../UI/BarLoader/CustomBarLoader";
import Pagination from "../../UI/Pagination/Pagination";
import { checkoutQueryOptionsActions } from "../../../toolkit";
import useGetCheckout from "../../../hooks/api/Checkout/useGetCheckout";

const CheckoutTable: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.loading);
    const checkoutQueryOptions = useAppSelector(
        (state) => state.checkoutQueryOptions
    );

    useEffect(() => {
        dispatch(checkoutQueryOptionsActions.reset());
    }, []);

    console.log(checkoutQueryOptions);

    const { fetchedCheckouts: checkouts, totalCheckouts } = useGetCheckout(
        checkoutQueryOptions,
        [checkoutQueryOptions]
    );

    const deleteHandler = useDeleteCheckout();

    const searchHandler = useCallback((key: string, value: string) => {
        dispatch(checkoutQueryOptionsActions.setQueryOptions({ key, value }));
    }, []);

    const changePageHandler = useCallback((page: number) => {
        dispatch(
            checkoutQueryOptionsActions.setQueryOptions({
                key: "page",
                value: page,
            })
        );
    }, []);

    return (
        <>
            <ul className={styles["responsive-table"]}>
                <li className={styles["table-header"]}>
                    <div className={`${styles["col"]} ${styles["col-1"]}`}>
                        Time
                        <Dropdown
                            dropdownList={["Default", "Latest", "Earliest"]}
                            searchParam="sortDate"
                            searchHandler={searchHandler}
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-2"]}`}>
                        Receiver Name
                        <SearchPopup
                            searchHandler={searchHandler}
                            searchParams="userQuery"
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-3"]}`}>
                        Products
                        <SearchPopup
                            searchHandler={searchHandler}
                            searchParams="productsQuery"
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-4"]}`}>
                        Phone Number
                        <SearchPopup
                            searchHandler={searchHandler}
                            searchParams="phoneNumberQuery"
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-5"]}`}>
                        Total
                        <Dropdown
                            dropdownList={["Default", "Highest", "Lowest"]}
                            searchParam="sortTotal"
                            searchHandler={searchHandler}
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-6"]}`}>
                        Status
                        <Dropdown
                            dropdownList={[
                                "All",
                                "Paid",
                                "waiting for paying",
                                "canceled",
                            ]}
                            searchParam="sortStatus"
                            searchHandler={searchHandler}
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-7"]}`}>
                        Action
                    </div>
                </li>
                {isLoading && <CustomBarLoader />}
                {checkouts &&
                    checkouts.map((checkout) => {
                        return (
                            <TableItem
                                key={checkout._id}
                                checkout={checkout}
                                deleteHandler={deleteHandler}
                            />
                        );
                    })}
            </ul>
            <Pagination
                totalItems={totalCheckouts}
                changePageHandler={changePageHandler}
            />
        </>
    );
};

export default CheckoutTable;
