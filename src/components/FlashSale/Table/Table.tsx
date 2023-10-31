import React, { useCallback, useEffect } from "react";
import styles from "./Table.module.css";
import SearchPopup from "../../UI/SearchPopup/SearchPopup";
import Dropdown from "../../UI/Dropdown/Dropdown";
import { useAppDispatch, useAppSelector } from "../../../hooks/store/useStore";
import Pagination from "../../UI/Pagination/Pagination";
import CustomBarLoader from "../../UI/BarLoader/CustomBarLoader";
import useGetFlashSale from "../../../hooks/api/FlashSale/useGetFlashSale";
import { flashSaleQueryOptionsActions } from "../../../toolkit";
import TableItem from "./TableItem";

const Table = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.loading);
    const flashSaleQueryOptions = useAppSelector(
        (state) => state.flashSaleQueryOptions
    );

    useEffect(() => {
        dispatch(flashSaleQueryOptionsActions.reset());
    }, []);

    const searchHandler = useCallback((key: string, value: string) => {
        dispatch(flashSaleQueryOptionsActions.setQueryOptions({ key, value }));
    }, []);

    const changePageHandler = useCallback((page: number) => {
        dispatch(
            flashSaleQueryOptionsActions.setQueryOptions({
                key: "page",
                value: page,
            })
        );
    }, []);

    const { flashSales, totalFlashSales } = useGetFlashSale(
        flashSaleQueryOptions,
        [flashSaleQueryOptions]
    );
    return (
        <>
            <ul className={styles["responsive-table"]}>
                <li className={styles["table-header"]}>
                    <div className={`${styles["col"]} ${styles["col-1"]}`}>
                        ID
                        <SearchPopup
                            searchHandler={searchHandler}
                            searchParams="_idQuery"
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-2"]}`}>
                        Name
                        <SearchPopup
                            searchHandler={searchHandler}
                            searchParams="nameQuery"
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-3"]}`}>
                        Discount Percent
                    </div>
                    <div className={`${styles["col"]} ${styles["col-4"]}`}>
                        Start
                    </div>
                    <div className={`${styles["col"]} ${styles["col-5"]}`}>
                        End
                    </div>
                    <div className={`${styles["col"]} ${styles["col-6"]}`}>
                        Status
                        <Dropdown
                            dropdownList={["Default", "Active", "Not Active"]}
                            searchParam="sortStatus"
                            searchHandler={searchHandler}
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-7"]}`}>
                        Action
                    </div>
                </li>
                {isLoading && <CustomBarLoader />}
                {flashSales &&
                    flashSales.map((flashSale) => {
                        return (
                            <TableItem
                                key={flashSale._id}
                                flashSale={flashSale}
                            />
                        );
                    })}
            </ul>
            <Pagination
                totalItems={totalFlashSales}
                changePageHandler={changePageHandler}
            />
        </>
    );
};

export default Table;
