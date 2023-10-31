import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/useStore";
import usePrivateHttp from "../../authentication/usePrivateHttp";
import { loadingActions } from "../../../toolkit";
import { VoucherQueryOptions } from "../../../models/VoucherQueryOptions";
import { Voucher } from "../../../models/Voucher";

const useGetVoucher = (
    voucherQueryOptions: VoucherQueryOptions,
    dependencies: any[]
) => {
    const privateHttp = usePrivateHttp();
    const dispatch = useAppDispatch();

    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [totalVouchers, setTotalVouchers] = useState(0);

    useEffect(() => {
        const getAllVouchers = async () => {
            dispatch(loadingActions.setLoading(true));
            try {
                const res = await privateHttp.get(
                    process.env.REACT_APP_SERVER_DOMAIN +
                        "/api/voucher/get-vouchers",
                    {
                        params: voucherQueryOptions,
                    }
                );
                console.log(res.data);
                setVouchers(res.data.vouchers);
                setTotalVouchers(res.data.totalVouchers);
                dispatch(loadingActions.setLoading(false));
            } catch (error) {
                console.log(error);
            }
        };
        const call = setTimeout(() => {
            getAllVouchers();
        }, 500);

        return () => {
            clearTimeout(call);
        };
    }, [...dependencies]);

    return { vouchers, totalVouchers };
};

export default useGetVoucher;
