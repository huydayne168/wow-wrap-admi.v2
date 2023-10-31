import React, { useCallback, useState } from "react";
import styles from "./SearchPopup.module.css";
import { SetURLSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../../hooks/store/useStore";
import { checkoutQueryOptionsActions } from "../../../toolkit";

const SearchPopup: React.FC<{
    searchParams: string;
    searchHandler?: Function;
}> = ({ searchParams, searchHandler }) => {
    const [isShow, setIsShow] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const showHandler = useCallback(() => {
        setIsShow((pre) => !pre);
    }, []);

    const inputChangeHandler = useCallback((value: string) => {
        setInputValue(value);
        searchHandler && searchHandler(searchParams, value);
    }, []);

    return (
        <div className={styles["search-popup"]}>
            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={showHandler} />
            <div
                className={`${styles["search-input"]} ${
                    isShow ? styles["show"] : ""
                }`}
            >
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        inputChangeHandler(e.target.value);
                    }}
                />
            </div>
        </div>
    );
};

export default SearchPopup;
