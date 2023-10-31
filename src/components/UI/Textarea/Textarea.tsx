import React, { useState, useCallback, useEffect } from "react";
import styles from "./Textarea.module.css";
const Textarea: React.FC<{
    name: string;
    id: string;
    defaultValue?: string;
    submitting: boolean;
    onChangeInputValue?: Function;
    label?: string;
    placeholder?: string;
    cols: number;
    rows: number;
}> = ({
    name,
    id,
    defaultValue,
    submitting,
    onChangeInputValue,
    label,
    placeholder,
    cols,
    rows,
}) => {
    const [inputValue, setInputValue] = useState<string>(
        defaultValue ? defaultValue : ""
    );

    const inputHandler = useCallback((value: string) => {
        setInputValue(value);
    }, []);

    useEffect(() => {
        onChangeInputValue && onChangeInputValue(name, inputValue);
    }, [submitting]);

    return (
        <div className={styles["textarea"]}>
            {label && <label htmlFor={name}>{label}</label>}
            <textarea
                name={name}
                id={id}
                cols={cols}
                rows={rows}
                value={inputValue}
                onChange={(e) => {
                    inputHandler(e.target.value);
                }}
                placeholder={placeholder ? placeholder : ""}
            />
        </div>
    );
};

export default Textarea;
