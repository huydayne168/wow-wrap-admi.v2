import React, { useEffect, useState } from "react";
import { Product } from "../../../models/Product";
import http from "../../../utils/http";
import { ProductQueryOptions } from "../../../models/ProductQueryOptions";
import { useAppDispatch } from "../../store/useStore";
import { loadingActions } from "../../../toolkit";

const useGetProduct = (
    productQueryOptions: ProductQueryOptions,
    dependencies: any[]
) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const dispatch = useAppDispatch();
    useEffect(() => {
        try {
            dispatch(loadingActions.setLoading(true));
            const getAllProducts = async () => {
                try {
                    const res = await http.get(
                        process.env.REACT_APP_SERVER_DOMAIN +
                            "/api/product/get-products",
                        {
                            params: productQueryOptions,
                        }
                    );
                    setProducts(res.data.products);
                    setTotalProducts(res.data.totalProducts);
                    dispatch(loadingActions.setLoading(false));
                } catch (error) {
                    console.log(error);
                }
            };

            const call = setTimeout(() => {
                getAllProducts();
            }, 500);

            return () => {
                clearTimeout(call);
            };
        } catch (error) {
            console.log(error);
        }
    }, [...dependencies]);

    return { products, totalProducts };
};

export default useGetProduct;
