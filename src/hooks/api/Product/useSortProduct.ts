import React from "react";
import { useAppDispatch } from "../../store/useStore";
import { productQueryOptionsActions } from "../../../toolkit";

const useSortProduct = () => {
    const dispatch = useAppDispatch();

    return function sortProduct(key: string, value: string) {
        if (key === "sortRate") {
            dispatch(
                productQueryOptionsActions.setQueryOptions({
                    key: "sortLowPrice",
                    value: "",
                })
            );
            dispatch(
                productQueryOptionsActions.setQueryOptions({
                    key: "sortHighPrice",
                    value: "",
                })
            );
            if (value === "Default") {
                dispatch(
                    productQueryOptionsActions.setQueryOptions({
                        key,
                        value: "",
                    })
                );
            } else {
                dispatch(
                    productQueryOptionsActions.setQueryOptions({
                        key,
                        value: value === "High Rate",
                    })
                );
            }
        } else if (key === "sortPrice" && value === "High Price") {
            dispatch(
                productQueryOptionsActions.setQueryOptions({
                    key: "sortLowPrice",
                    value: "",
                })
            );
            dispatch(
                productQueryOptionsActions.setQueryOptions({
                    key: "sortHighPrice",
                    value: "true",
                })
            );
            dispatch(
                productQueryOptionsActions.setQueryOptions({
                    key: "sortRate",
                    value: "",
                })
            );
        } else if (key === "sortPrice" && value === "Low Price") {
            dispatch(
                productQueryOptionsActions.setQueryOptions({
                    key: "sortLowPrice",
                    value: true,
                })
            );
            dispatch(
                productQueryOptionsActions.setQueryOptions({
                    key: "sortHighPrice",
                    value: false,
                })
            );
            dispatch(
                productQueryOptionsActions.setQueryOptions({
                    key: "sortRate",
                    value: false,
                })
            );
        }
    };
};

export default useSortProduct;
