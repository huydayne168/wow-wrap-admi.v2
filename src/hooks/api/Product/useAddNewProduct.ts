import React from "react";
import usePrivateHttp from "../../authentication/usePrivateHttp";
import { ProductFormData } from "../../../components/Product/ProductForm/ProductForm";

const useAddNewProduct = () => {
    const privateHttp = usePrivateHttp();

    return async function addNewProduct(formData: ProductFormData) {
        const {
            name,
            category,
            amount,
            price,
            shortDescription,
            longDescription,
            tags,
            image,
        } = formData;
        try {
            const response = await privateHttp.post(
                "/api/product/add-product",
                {
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
            console.log(error);
            return error;
        }
    };
};

export default useAddNewProduct;
