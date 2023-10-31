import React, { useCallback } from "react";
import Container from "../../../screen/Container/Container";
import FlashSaleForm, {
    FlashSaleFormData,
} from "../FlashSaleForm/FlashSaleForm";
import useAddNewFlashSale from "../../../hooks/api/FlashSale/useAddNewFlashSale";
import { useAppDispatch } from "../../../hooks/store/useStore";
import { loadingActions } from "../../../toolkit";

const AddNewFlashSale = () => {
    const dispatch = useAppDispatch();
    const addNewFlashSale = useAddNewFlashSale();

    const submitHandler = useCallback(async (formData: FlashSaleFormData) => {
        dispatch(loadingActions.setLoading(true));
        await addNewFlashSale(formData);
        dispatch(loadingActions.setLoading(false));
    }, []);
    return (
        <Container headerTitle="Add Flash Sale">
            <FlashSaleForm submitHandler={submitHandler} />
        </Container>
    );
};

export default AddNewFlashSale;
