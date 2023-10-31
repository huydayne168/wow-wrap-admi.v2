import React, { useCallback, useState } from "react";
import styles from "./Dropdown.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Dropdown: React.FC<{
    dropdownList: string[];
    searchParam?: string;
    getDropdownValue?: Function; // this function to use with normal dropdown
    searchHandler?: Function;
}> = ({ dropdownList, searchParam, getDropdownValue, searchHandler }) => {
    const [isShow, setIsShow] = useState(false);

    const showHandler = useCallback(() => {
        setIsShow((pre) => !pre);
    }, []);

    const dropdownHandler = useCallback((value: string) => {
        if (getDropdownValue) {
            getDropdownValue(value);
        } else if (searchHandler && searchParam) {
            searchHandler(searchParam, value);
        }
    }, []);

    return (
        <div className={styles["dropdown"]}>
            <FontAwesomeIcon icon={faCaretDown} onClick={showHandler} />
            <ul className={isShow ? styles["show"] : ""}>
                {dropdownList.map((item) => {
                    return (
                        <li
                            key={item}
                            onClick={() => {
                                dropdownHandler(item);
                            }}
                        >
                            {item}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Dropdown;
