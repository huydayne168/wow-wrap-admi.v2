import React, { useCallback, useState, useEffect } from "react";
import styles from "./FlashSale.module.css";
import Input from "../../UI/Input/Input";
import RangeDatePicker from "../../UI/RangeDatePicker/RangeDatePicker";
import ChooseProduct from "./ChooseProduct";

export type FlashSaleFormData = {
    [key: string]: any;
    name?: string;
    discountPercent?: number;
    start?: string;
    end?: string;
    products?: string[]; // array of product ids
};

const FlashSaleForm: React.FC<{ submitHandler: Function }> = ({
    submitHandler,
}) => {
    const [formData, setFormData] = useState<FlashSaleFormData>({});
    const [submitting, setSubmitting] = useState(false);

    const submitStateHandler = useCallback(() => {
        setSubmitting((pre) => !pre);
    }, []);

    const handleFormData = useCallback(
        (key: string, value: string | string[]) => {
            setFormData((pre) => {
                setFormData((pre: FlashSaleFormData) => {
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

    console.log(formData);

    return (
        <form className={styles["flashSale-form"]}>
            <Input
                type="text"
                name="name"
                id="name"
                label="Name"
                submitting={submitting}
                onChangeInputValue={handleFormData}
            />

            <Input
                type="number"
                name="discountPercent"
                label="Discount Percent"
                id="discountPercent"
                submitting={submitting}
                onChangeInputValue={handleFormData}
            />

            <RangeDatePicker
                endName="end"
                startName="start"
                label="Time"
                onChangeRangeDatePicker={handleFormData}
                submitting={submitting}
            />

            <ChooseProduct
                name="products"
                onChangeChooseProducts={handleFormData}
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

export default FlashSaleForm;
