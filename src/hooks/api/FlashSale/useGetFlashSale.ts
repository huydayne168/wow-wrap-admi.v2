import React, { useEffect, useState } from "react";
import { FlashSale } from "../../../models/Flashsale";
import usePrivateHttp from "../../authentication/usePrivateHttp";
import { useAppDispatch } from "../../store/useStore";
import { loadingActions } from "../../../toolkit";
import { FlashSaleQueryOptions } from "../../../models/FlashSaleQueryOptions";

const useGetFlashSale = (
    flashSaleQueryOptions: FlashSaleQueryOptions,
    dependencies: any[]
) => {
    const privateHttp = usePrivateHttp();
    const dispatch = useAppDispatch();
    const [flashSales, setFlashSales] = useState<FlashSale[]>();
    const [totalFlashSales, setTotalFlashSales] = useState(0);

    useEffect(() => {
        const getAllProducts = async () => {
            dispatch(loadingActions.setLoading(true));
            try {
                const res = await privateHttp.get(
                    process.env.REACT_APP_SERVER_DOMAIN + "/api/fs/get-fss",
                    {
                        params: flashSaleQueryOptions,
                    }
                );
                console.log(res.data);
                setFlashSales(res.data.flashSales);
                setTotalFlashSales(res.data.totalFlashSales);
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
    }, [...dependencies]);

    return { flashSales, totalFlashSales };
};

export default useGetFlashSale;
