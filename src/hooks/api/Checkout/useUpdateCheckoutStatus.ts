import React from "react";
import { useAppDispatch } from "../../store/useStore";
import { checkoutsAction, loadingActions } from "../../../toolkit";
import usePrivateHttp from "../../authentication/usePrivateHttp";
const useUpdateCheckoutStatus = () => {
    const dispatch = useAppDispatch();
    const privateHttp = usePrivateHttp();

    return async function updateCheckoutStatus(
        checkoutId: string,
        status: string
    ) {
        try {
            dispatch(loadingActions.setLoading(true));
            const res = await privateHttp.post(
                "/api/checkout/update-checkout",
                {
                    checkoutId,
                    status,
                }
            );
            console.log(res);
            dispatch(checkoutsAction.updateStatus({ checkoutId, status }));
            dispatch(loadingActions.setLoading(false));
        } catch (error) {
            console.log(error);
        }
    };
};

export default useUpdateCheckoutStatus;
