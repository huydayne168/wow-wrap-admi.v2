import React from "react";
import usePrivateHttp from "../../authentication/usePrivateHttp";
import { useAppDispatch } from "../../store/useStore";
import { loadingActions, productsAction } from "../../../toolkit";

const useDeleteProduct = () => {
    const privateHttp = usePrivateHttp();
    const dispatch = useAppDispatch();

    return async function deleteProduct(_id: string) {
        try {
            dispatch(loadingActions.setLoading(true));
            const res = await privateHttp.delete(
                "/api/product/delete-product",
                {
                    params: {
                        _id,
                    },
                }
            );
            dispatch(productsAction.deleteProduct(_id));
            dispatch(loadingActions.setLoading(false));
        } catch (error) {
            console.log(error);
        }
    };
};

export default useDeleteProduct;
