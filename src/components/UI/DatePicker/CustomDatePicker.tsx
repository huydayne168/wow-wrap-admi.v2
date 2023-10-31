import React, { useCallback, useEffect, useState } from "react";
import styles from "./CustomDatePicker.module.css";
import { DatePicker, Form, Input, InputNumber, Button, Alert } from "antd";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
const CustomDatePicker: React.FC<{
    submitting?: boolean;
    onChangeDatePicker: Function;
    name: string;
    label?: string;
}> = ({ submitting, onChangeDatePicker, name, label }) => {
    const [date, setDate] = useState("");

    const timeHandler = useCallback(
        (
            value: DatePickerProps["value"] | RangePickerProps["value"],
            dateString: string
        ) => {
            if (value) {
                setDate(dateString);
            }
        },
        []
    );

    useEffect(() => {
        if (typeof submitting !== "undefined") {
            onChangeDatePicker(name, date);
        }
    }, [submitting]);

    return (
        <div className={styles["date-picker"]}>
            {label && <label>{label}</label>}
            <DatePicker showTime={{ format: "HH:mm" }} onChange={timeHandler} />
        </div>
    );
};

export default CustomDatePicker;
