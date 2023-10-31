import React, { useCallback } from "react";
import Container from "../../../screen/Container/Container";
import ProductForm, { ProductFormData } from "../ProductForm/ProductForm";
import { useAppDispatch, useAppSelector } from "../../../hooks/store/useStore";
import { loadingActions } from "../../../toolkit";
import useAddNewProduct from "../../../hooks/api/Product/useAddNewProduct";
import CustomBarLoader from "../../UI/BarLoader/CustomBarLoader";
import { useNavigate } from "react-router-dom";

const AddNewProduct = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoading = useAppSelector((state) => state.loading);
    const addNewProduct = useAddNewProduct();

    const submitHandler = useCallback(async (formData: ProductFormData) => {
        dispatch(loadingActions.setLoading(true));
        const result = await addNewProduct(formData);
        dispatch(loadingActions.setLoading(false));
    }, []);
    return (
        <Container headerTitle="Add New Product">
            {isLoading && <CustomBarLoader />}
            <ProductForm submitHandler={submitHandler} />
        </Container>
    );
};

export default AddNewProduct;
