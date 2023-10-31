import React, { useCallback, useEffect, useState } from "react";
import styles from "./Selection.module.css";
import { Tag } from "../../../models/Tag";
import { Category } from "../../../models/Category";

const Selection: React.FC<{
    selectOptions: Tag[] | Category[];
    name: string;
    id: string;
    defaultValue?: Tag | Category;
    submitting: boolean;
    onChangeSelectHandler: Function;
    label?: string;
}> = ({
    selectOptions,
    name,
    id,
    defaultValue,
    label,
    submitting,
    onChangeSelectHandler,
}) => {
    const [selectedOption, setSelectedOption] = useState<
        Category | Tag | undefined
    >(defaultValue ? defaultValue : undefined);

    const selectHandler = useCallback((value: string) => {
        setSelectedOption((pre) => {
            const item = selectOptions.filter((o) => o._id === value)[0];
            return item;
        });
    }, []);

    useEffect(() => {
        onChangeSelectHandler(name, selectedOption);
    }, [submitting]);

    return (
        <div className={styles["selection"]}>
            {label && <label htmlFor={name}>{label}</label>}
            <select
                name={name}
                id={id}
                defaultValue={defaultValue?._id}
                onChange={(e) => {
                    selectHandler(e.target.value);
                }}
            >
                {defaultValue?._id ? (
                    <option value={defaultValue?._id}>
                        {defaultValue?.name}
                    </option>
                ) : (
                    <option value={""} hidden>
                        --Choose--
                    </option>
                )}
                {selectOptions.map((option) => {
                    return (
                        <option
                            hidden={defaultValue?._id === option._id}
                            key={option.name}
                            value={option._id}
                        >
                            {option.name}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default Selection;
