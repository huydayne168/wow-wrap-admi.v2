import React, { useState, useCallback, useEffect } from "react";
import styles from "./VoucherForm.module.css";
import Input from "../../UI/Input/Input";
import CustomDatePicker from "../../UI/DatePicker/CustomDatePicker";

export type VoucherFormData = {
    [key: string]: any;
    name?: string;
    discountPercent?: number;
    quantity?: number;
    end?: string;
    products?: string[]; // array of product ids
};

const VoucherForm: React.FC<{ submitHandler: Function }> = ({
    submitHandler,
}) => {
    const [formData, setFormData] = useState<VoucherFormData>({});
    const [submitting, setSubmitting] = useState(false);

    const submitStateHandler = useCallback(() => {
        setSubmitting((pre) => !pre);
    }, []);

    const handleFormData = useCallback(
        (key: string, value: string | string[]) => {
            setFormData((pre) => {
                setFormData((pre: VoucherFormData) => {
                    const newFormData = { ...pre };
                    newFormData[key] = value;
                    return newFormData;
                });
            });
        },
        []
    );

    useEffect(() => {
        console.log(formData);
        submitHandler(formData);
    }, [formData]);
    return (
        <form className={styles["voucher-form"]}>
            <Input
                type="text"
                name="code"
                id="code"
                label="Code"
                onChangeInputValue={handleFormData}
                submitting={submitting}
            />

            <Input
                type="number"
                name="discount"
                id="discount"
                label="Discount %"
                onChangeInputValue={handleFormData}
                submitting={submitting}
            />

            <Input
                type="number"
                name="quantity"
                id="quantity"
                label="Quantity"
                onChangeInputValue={handleFormData}
                submitting={submitting}
            />

            <CustomDatePicker
                name="end"
                onChangeDatePicker={handleFormData}
                label="End Time"
                submitting={submitting}
            />
            <button
                className="button"
                onClick={(e) => {
                    e.preventDefault();
                    submitStateHandler();
                }}
            >
                Add
            </button>
        </form>
    );
};

export default VoucherForm;
