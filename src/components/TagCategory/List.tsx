import React from "react";
import styles from "./TagCategoryList.module.css";
import { Tag } from "../../models/Tag";
import { Category } from "../../models/Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const List: React.FC<{ items: Tag[] | Category[] }> = ({ items }) => {
    console.log(items);

    return (
        <ul className={styles["responsive-table"]}>
            <li className={styles["table-header"]}>
                <div className={`${styles["col"]} ${styles["col-1"]}`}>
                    Name
                </div>
                <div className={`${styles["col"]} ${styles["col-2"]}`}>
                    Delete
                </div>
            </li>
            {items.map((item) => {
                return (
                    <li key={item._id} className={styles["table-row"]}>
                        <div className={`${styles["col"]} ${styles["col-1"]}`}>
                            {item.name}
                        </div>
                        <div className={`${styles["col"]} ${styles["col-2"]}`}>
                            <FontAwesomeIcon
                                icon={faTrash}
                                style={{ backgroundColor: "#ff4d4f" }}
                            />
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default List;
