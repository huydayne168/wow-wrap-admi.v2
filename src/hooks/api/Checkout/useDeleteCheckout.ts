import React from "react";
import { useAppDispatch } from "../../store/useStore";
import { checkoutsAction, loadingActions } from "../../../toolkit";
import usePrivateHttp from "../../authentication/usePrivateHttp";

const useDeleteCheckout = () => {
    const privateHttp = usePrivateHttp();
    const dispatch = useAppDispatch();

    async function deleteCheckout(checkoutId: string) {
        try {
            dispatch(loadingActions.setLoading(true));
            const res = await privateHttp.delete(
                "/api/checkout/delete-checkout",
                {
                    params: { checkoutId },
                }
            );
            console.log(res);
            dispatch(checkoutsAction.deleteCheckout(checkoutId));
            dispatch(loadingActions.setLoading(false));
        } catch (error) {
            console.log(error);
        }
    }

    return deleteCheckout;
};

export default useDeleteCheckout;
