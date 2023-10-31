import React, { useCallback, useEffect, useState } from "react";
import { Checkout } from "../../../models/Checkout";
import { useAppSelector } from "../../store/useStore";
import { useAppDispatch } from "../../store/useStore";
import { loadingActions } from "../../../toolkit";
import usePrivateHttp from "../../authentication/usePrivateHttp";
import { CheckoutQueryOptions } from "../../../models/CheckoutQueryOptions";

const useGetCheckout = (
    checkoutQueryOptions: CheckoutQueryOptions,
    dependencies: any[]
) => {
    const privateHttp = usePrivateHttp();
    const dispatch = useAppDispatch();
    const checkouts = useAppSelector((state) => state.checkouts);
    const [fetchedCheckouts, setFetchedCheckouts] = useState<Checkout[]>([]);
    const [totalCheckouts, setTotalCheckouts] = useState<number>(0);

    useEffect(() => {
        const getCheckouts = async () => {
            try {
                console.log("getting checkouts");
                dispatch(loadingActions.setLoading(true));
                const res = await privateHttp.get(
                    "/api/checkout/get-checkouts",
                    {
                        params: checkoutQueryOptions,
                    }
                );
                console.log("loading...");
                setFetchedCheckouts(res.data.checkouts);
                setTotalCheckouts(res.data.totalCheckouts);
                dispatch(loadingActions.setLoading(false));
            } catch (error) {
                console.log(error);
            }
        };

        const call = setTimeout(() => {
            getCheckouts();
        }, 500);

        return () => {
            clearTimeout(call);
        };
    }, [...dependencies, checkouts]);
    console.log(fetchedCheckouts);
    return { fetchedCheckouts, totalCheckouts };
};

export default useGetCheckout;
