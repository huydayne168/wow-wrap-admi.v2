import React, { useCallback } from "react";
import Container from "../../../screen/Container/Container";
import VoucherForm, { VoucherFormData } from "../VoucherForm/VoucherForm";
import { useAppDispatch } from "../../../hooks/store/useStore";
import useAddNewVoucher from "../../../hooks/api/Voucher/useAddNewVoucher";
import { loadingActions } from "../../../toolkit";

const AddNewVoucher = () => {
    const dispatch = useAppDispatch();
    const addNewVoucher = useAddNewVoucher();
    const submitHandler = useCallback(async (formData: VoucherFormData) => {
        dispatch(loadingActions.setLoading(true));
        await addNewVoucher(formData);
        dispatch(loadingActions.setLoading(false));
    }, []);
    return (
        <Container headerTitle="Add Voucher">
            <VoucherForm submitHandler={submitHandler} />
        </Container>
    );
};

export default AddNewVoucher;
