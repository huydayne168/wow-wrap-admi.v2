import React, { useCallback, useMemo } from "react";
import styles from "./EditProduct.module.css";
import Container from "../../../screen/Container/Container";
import ProductForm, { ProductFormData } from "../ProductForm/ProductForm";
import { useLocation, useNavigate } from "react-router-dom";
import useEditProduct from "../../../hooks/api/Product/useEditProduct";
import { Product } from "../../../models/Product";
import { useAppDispatch, useAppSelector } from "../../../hooks/store/useStore";
import { loadingActions } from "../../../toolkit";
import CustomBarLoader from "../../UI/BarLoader/CustomBarLoader";
const EditProduct = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.loading);
    const location = useLocation();
    const product: Product = useMemo(() => {
        return location.state;
    }, []);
    const editProduct = useEditProduct();

    const submitHandler = useCallback(async (formData: ProductFormData) => {
        dispatch(loadingActions.setLoading(true));
        const result = await editProduct(product._id, formData);
        dispatch(loadingActions.setLoading(false));
    }, []);

    return (
        <Container headerTitle="Edit Product">
            {isLoading && <CustomBarLoader />}
            <ProductForm product={product} submitHandler={submitHandler} />
        </Container>
    );
};

export default EditProduct;
