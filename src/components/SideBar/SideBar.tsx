import React, { useEffect, useState } from "react";
import styles from "./SideBar.module.css";
import SideBarHeader from "./SideBarHeader";
import http from "../../utils/http";
import { useAppSelector } from "../../hooks/store/useStore";
import { User } from "../../models/User";
import Navigation from "./Navigation";
import useGetUser from "../../hooks/api/User/useGetUser";
const SideBar = () => {
    const currentUserData = useAppSelector((state) => state.authentication);
    const [currentUser, setCurrentUser] = useState<User>();

    // get current User:
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const res = await http.get("/get-user", {
                    params: {
                        _id: currentUserData._id,
                    },
                });
                setCurrentUser(res.data.foundUser);
            } catch (error) {
                console.log(error);
            }
        };
        getCurrentUser();
    }, []);

    return (
        <div className={styles["side-bar"]}>
            <SideBarHeader user={currentUser} />
            <Navigation />
        </div>
    );
};

export default SideBar;
