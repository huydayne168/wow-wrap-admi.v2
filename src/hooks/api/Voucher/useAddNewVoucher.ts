import React from "react";
import usePrivateHttp from "../../authentication/usePrivateHttp";
import { VoucherFormData } from "../../../components/Voucher/VoucherForm/VoucherForm";

const useAddNewVoucher = () => {
    const privateHttp = usePrivateHttp();

    async function addNewVoucher(formData: VoucherFormData) {
        try {
            const res = await privateHttp.post("/api/voucher/add-voucher", {
                code: formData.code,
                discountPercent: formData.discountPercent,
                quantity: formData.quantity,
                end: formData.end,
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return addNewVoucher;
};

export default useAddNewVoucher;
