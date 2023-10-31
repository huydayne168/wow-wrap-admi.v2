import React from "react";
import styles from "./DeletePopup.module.css";
const DeletePopup: React.FC<{ cancel: Function; deleteHandler: Function }> = ({
    cancel,
    deleteHandler,
}) => {
    return (
        <div className={styles["delete-popup"]}>
            <p>Are you sure to delete?</p>
            <div className={styles["action"]}>
                <button
                    className={styles["cancel"]}
                    onClick={() => {
                        cancel();
                    }}
                >
                    Cancel
                </button>
                <button
                    className={styles["delete"]}
                    onClick={() => {
                        deleteHandler();
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeletePopup;
