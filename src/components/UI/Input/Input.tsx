import React, { useCallback, useEffect, useState } from "react";
import styles from "./Input.module.css";

const Input: React.FC<{
    type: string;
    name: string;
    id: string;
    defaultValue?: string;
    submitting?: boolean;
    onChangeInputValue: Function;
    label?: string;
    placeholder?: string;
}> = ({
    type,
    name,
    id,
    defaultValue,
    submitting,
    onChangeInputValue,
    label,
    placeholder,
}) => {
    const [inputValue, setInputValue] = useState<string>(
        defaultValue ? defaultValue : ""
    );
    const [image, setImage] = useState<any>(defaultValue);

    const inputHandler = useCallback((value: string) => {
        setInputValue(value);

        if (typeof submitting === "undefined") {
            console.log("oke?");
            onChangeInputValue(value);
        }
    }, []);

    const imageFileHandler = useCallback((imgInput: any) => {
        const image = imgInput.files[0];
        const reader = new FileReader();
        if (image) {
            reader.readAsDataURL(image);
            reader.onloadend = () => {
                setImage(reader.result);
                onChangeInputValue(name, reader.result);
            };
        } else {
            setImage("");
        }
    }, []);

    useEffect(() => {
        if (type !== "file" && typeof submitting !== "undefined") {
            onChangeInputValue(name, inputValue);
        }
    }, [submitting]);

    return (
        <div className={styles["input"]}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type}
                name={name}
                id={id}
                value={type !== "file" ? inputValue : undefined}
                onChange={(e) => {
                    if (type !== "file") {
                        inputHandler(e.target.value);
                    } else {
                        imageFileHandler(e.target);
                    }
                }}
                placeholder={`${placeholder ? placeholder : ""}`}
            />
        </div>
    );
};

export default Input;
