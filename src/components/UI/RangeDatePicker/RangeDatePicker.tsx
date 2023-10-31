import React, { useCallback, useState, useEffect } from "react";
import styles from "./RangeDatePicker.module.css";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

const RangeDatePicker: React.FC<{
    submitting?: boolean;
    onChangeRangeDatePicker: Function;
    endName: string;
    startName: string;
    label?: string;
}> = ({ submitting, onChangeRangeDatePicker, endName, startName, label }) => {
    const [end, setEnd] = useState("");
    const [start, setStart] = useState("");

    const timeHandler = useCallback(
        (
            value: DatePickerProps["value"] | RangePickerProps["value"],
            dateString: [string, string] | string
        ) => {
            if (value) {
                setStart(dateString[0]);
                setEnd(dateString[1]);
            }
        },
        []
    );

    useEffect(() => {
        if (typeof submitting !== "undefined") {
            onChangeRangeDatePicker(endName, end);
            onChangeRangeDatePicker(startName, start);
        }
    }, [submitting]);

    return (
        <div className={styles["range-date-picker"]}>
            {label && <label>{label}</label>}

            <RangePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                onChange={timeHandler}
                aria-required
            />
        </div>
    );
};

export default RangeDatePicker;
