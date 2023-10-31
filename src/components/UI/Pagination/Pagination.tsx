import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./Pagination.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Pagination: React.FC<{
    totalItems: number;
    changePageHandler: Function;
}> = ({ totalItems, changePageHandler }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // calculate total pages:
    const totalPages = useMemo(() => {
        const check = totalItems % 5;
        if (check === 0) {
            return totalItems / 5;
        } else {
            return Math.floor(totalItems / 5) + 1;
        }
    }, [totalItems]);

    const onChangeCurrentPage = useCallback((type: "dec" | "inc") => {
        if (type === "dec") {
            setCurrentPage((pre) => pre - 1);
            // changePageHandler(currentPage - 1);
        } else if (type === "inc") {
            setCurrentPage((pre) => pre + 1);
        }
    }, []);

    useEffect(() => {
        changePageHandler(currentPage);
    }, [currentPage]);

    return (
        <ul className={styles["pagination"]}>
            {currentPage !== 1 ? (
                <li
                    className={`${styles["left"]} ${styles["appear"]}`}
                    onClick={() => {
                        onChangeCurrentPage("dec");
                    }}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </li>
            ) : (
                <div className={styles["left"]}></div>
            )}
            <li className={styles["page-number"]}>{currentPage}</li>
            {currentPage !== totalPages ? (
                <li
                    onClick={() => {
                        onChangeCurrentPage("inc");
                    }}
                    className={`${styles["right"]} ${styles["appear"]}`}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </li>
            ) : (
                <div className={styles["right"]}></div>
            )}
        </ul>
    );
};

export default Pagination;
