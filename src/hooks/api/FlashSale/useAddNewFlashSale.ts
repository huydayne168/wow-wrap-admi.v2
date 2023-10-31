import React from "react";
import usePrivateHttp from "../../authentication/usePrivateHttp";

import { FlashSaleFormData } from "../../../components/FlashSale/FlashSaleForm/FlashSaleForm";

const useAddNewFlashSale = () => {
    const privateHttp = usePrivateHttp();

    async function addNewFlashSale(formData: FlashSaleFormData) {
        try {
            const res = await privateHttp.post("/api/fs/add-fs", {
                name: formData.name,
                discountPercent: formData.discountPercent,
                start: formData.start,
                end: formData.end,
                products: formData.products,
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return addNewFlashSale;
};

export default useAddNewFlashSale;
