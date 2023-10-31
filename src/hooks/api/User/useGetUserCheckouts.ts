import React, { useEffect, useState } from "react";
import { Checkout } from "../../../models/Checkout";
import http from "../../../utils/http";
import { useAppDispatch } from "../../store/useStore";
import { loadingActions } from "../../../toolkit";

const useGetUserCheckouts = (userId: string) => {
    const [checkouts, setCheckouts] = useState<Checkout[]>([]);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const getUserCheckouts = async () => {
            try {
                dispatch(loadingActions.setLoading(true));
                const res = await http.get(
                    process.env.REACT_APP_SERVER_DOMAIN + "/user/get-user",
                    {
                        params: {
                            _id: userId,
                        },
                    }
                );
                setCheckouts(res.data.userCheckouts);
                dispatch(loadingActions.setLoading(false));
            } catch (error) {
                console.log(error);
            }
        };
        const call = setTimeout(() => {
            getUserCheckouts();
        }, 500);

        return () => {
            clearTimeout(call);
        };
    }, []);

    return checkouts;
};

export default useGetUserCheckouts;
