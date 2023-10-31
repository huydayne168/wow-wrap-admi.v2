import React, { useCallback } from "react";
import styles from "./Table.module.css";
import SearchPopup from "../../UI/SearchPopup/SearchPopup";
import Dropdown from "../../UI/Dropdown/Dropdown";
import CustomBarLoader from "../../UI/BarLoader/CustomBarLoader";
import Pagination from "../../UI/Pagination/Pagination";
import { useAppDispatch, useAppSelector } from "../../../hooks/store/useStore";
import { voucherQueryOptionsActions } from "../../../toolkit";
import useGetVoucher from "../../../hooks/api/Voucher/useGetVoucher";
import TableItem from "./TableItem";

const Table = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.loading);
    const voucherQueryOptions = useAppSelector(
        (state) => state.voucherQueryOptions
    );

    const { vouchers, totalVouchers } = useGetVoucher(voucherQueryOptions, [
        voucherQueryOptions,
    ]);

    const searchHandler = useCallback((key: string, value: string) => {
        dispatch(voucherQueryOptionsActions.setQueryOptions({ key, value }));
    }, []);

    const changePageHandler = useCallback((page: number) => {
        dispatch(
            voucherQueryOptionsActions.setQueryOptions({
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
                        Code
                        <SearchPopup
                            searchParams="codeQuery"
                            searchHandler={searchHandler}
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-2"]}`}>
                        Discount
                    </div>
                    <div className={`${styles["col"]} ${styles["col-3"]}`}>
                        Remain
                        <Dropdown
                            dropdownList={["Default", "Most", "Least"]}
                            searchParam="sortQuantity"
                            searchHandler={searchHandler}
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-4"]}`}>
                        End
                    </div>
                    <div className={`${styles["col"]} ${styles["col-5"]}`}>
                        Status
                        <Dropdown
                            dropdownList={[
                                "Default",
                                "Available",
                                "Not Available",
                            ]}
                            searchParam="sortRole"
                            searchHandler={searchHandler}
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-6"]}`}>
                        Action
                    </div>
                </li>
                <div className="bar-loader">
                    {isLoading ? <CustomBarLoader /> : null}
                </div>
                {vouchers &&
                    vouchers.map((voucher) => {
                        return (
                            <TableItem key={voucher._id} voucher={voucher} />
                        );
                    })}
            </ul>
            <Pagination
                totalItems={totalVouchers}
                changePageHandler={changePageHandler}
            />
        </>
    );
};

export default Table;
