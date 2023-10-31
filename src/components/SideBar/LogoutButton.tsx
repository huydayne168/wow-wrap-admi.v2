import React, { useCallback } from "react";
import styles from "./LogoutButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import http from "../../utils/http";
import { authActions } from "../../toolkit";
const LogoutButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // logout
    const logoutHandler = useCallback(async () => {
        const res = await http.get("/logout", {
            withCredentials: true,
        });
        dispatch(authActions.logout());
        navigate("/");
    }, []);
    return (
        <button
            className={styles["logout-button"]}
            onClick={(e) => {
                e.preventDefault();
                logoutHandler();
            }}
        >
            Logout <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    );
};

export default LogoutButton;
