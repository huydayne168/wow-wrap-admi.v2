import React, { useCallback, useEffect } from "react";
import styles from "./Table.module.css";
import Dropdown from "../../UI/Dropdown/Dropdown";
import SearchPopup from "../../UI/SearchPopup/SearchPopup";
import { useAppDispatch, useAppSelector } from "../../../hooks/store/useStore";
import CustomBarLoader from "../../UI/BarLoader/CustomBarLoader";
import TableItem from "./TableItem";
import Pagination from "../../UI/Pagination/Pagination";
import { productQueryOptionsActions } from "../../../toolkit";
import useGetProduct from "../../../hooks/api/Product/useGetProduct";
import useSortProduct from "../../../hooks/api/Product/useSortProduct";
import useDeleteProduct from "../../../hooks/api/Product/useDeleteProduct";
const Table = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.loading);
    const productsSlice = useAppSelector((state) => state.products);
    const productQueryOptions = useAppSelector(
        (state) => state.productQueryOptions
    );

    useEffect(() => {
        dispatch(productQueryOptionsActions.reset());
    }, []);

    const searchHandler = useCallback((key: string, value: string) => {
        dispatch(productQueryOptionsActions.setQueryOptions({ key, value }));
    }, []);

    const sortHandler = useSortProduct();

    const { products, totalProducts } = useGetProduct(productQueryOptions, [
        productQueryOptions,
        productsSlice,
    ]);

    const deleteProduct = useDeleteProduct();

    const changePageHandler = useCallback((page: number) => {
        dispatch(
            productQueryOptionsActions.setQueryOptions({
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
                        Rate
                        <Dropdown
                            dropdownList={["Default", "High Rate", "Earliest"]}
                            searchParam="sortRate"
                            searchHandler={sortHandler}
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-2"]}`}>
                        ID
                        <SearchPopup
                            searchHandler={searchHandler}
                            searchParams="_idQuery"
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-3"]}`}>
                        Name
                        <SearchPopup
                            searchHandler={searchHandler}
                            searchParams="nameQuery"
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-4"]}`}>
                        Description
                    </div>
                    <div className={`${styles["col"]} ${styles["col-5"]}`}>
                        Price
                        <Dropdown
                            dropdownList={[
                                "Default",
                                "High Price",
                                "Low Price",
                            ]}
                            searchParam="sortPrice"
                            searchHandler={sortHandler}
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-6"]}`}>
                        Category
                        <SearchPopup
                            searchHandler={searchHandler}
                            searchParams="categoryQuery"
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-7"]}`}>
                        Action
                    </div>
                </li>
                {isLoading && <CustomBarLoader />}
                {products &&
                    products.map((product) => {
                        return (
                            <TableItem
                                key={product._id}
                                product={product}
                                deleteHandler={deleteProduct}
                            />
                        );
                    })}
            </ul>
            <Pagination
                totalItems={totalProducts}
                changePageHandler={changePageHandler}
            />
        </>
    );
};

export default Table;
