import React from "react";
import { ProductFormData } from "../../../components/Product/ProductForm/ProductForm";
import usePrivateHttp from "../../authentication/usePrivateHttp";

const useEditProduct = () => {
    const privateHttp = usePrivateHttp();

    return async function editProduct(
        _id: string,
        productFormData: ProductFormData
    ) {
        const {
            name,
            category,
            amount,
            price,
            shortDescription,
            longDescription,
            tags,
            image,
        } = productFormData;
        try {
            const response = await privateHttp.patch(
                "/api/product/edit-product",
                {
                    _id,
                    name,
                    category: category._id,
                    amount,
                    price,
                    shortDescription,
                    longDescription,
                    tags: tags.map((tag) => tag._id),
                    image,
                }
            );

            return response;
        } catch (error) {
            return error;
        }
    };
};

export default useEditProduct;
