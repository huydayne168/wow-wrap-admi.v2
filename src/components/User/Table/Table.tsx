import React, { useCallback, useEffect } from "react";
import styles from "./Table.module.css";
import { User } from "../../../models/User";
import Dropdown from "../../UI/Dropdown/Dropdown";
import SearchPopup from "../../UI/SearchPopup/SearchPopup";
import TableItem from "./TableItem";
import { useAppDispatch, useAppSelector } from "../../../hooks/store/useStore";
import CustomBarLoader from "../../UI/BarLoader/CustomBarLoader";
import { userQueryOptionsActions } from "../../../toolkit";
import useGetUser from "../../../hooks/api/User/useGetUser";
import Pagination from "../../UI/Pagination/Pagination";
const Table: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.loading);
    const userQueryOptions = useAppSelector((state) => state.userQueryOptions);

    useEffect(() => {
        dispatch(userQueryOptionsActions.reset());
    }, []);

    const searchHandler = useCallback((key: string, value: string) => {
        dispatch(userQueryOptionsActions.setQueryOptions({ key, value }));
    }, []);

    const { users, totalUsers } = useGetUser(userQueryOptions, [
        userQueryOptions,
    ]);

    const changePageHandler = useCallback((page: number) => {
        dispatch(
            userQueryOptionsActions.setQueryOptions({
                key: "page",
                value: page,
            })
        );
    }, []);

    return (
        <>
            <ul className={styles["responsive-table"]}>
                <li className={styles["table-header"]}>
                    <div className={`${styles["col"]} ${styles["col-1"]}`}>
                        ID
                        <SearchPopup
                            searchParams="_idQuery"
                            searchHandler={searchHandler}
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-2"]}`}>
                        User
                        <SearchPopup
                            searchParams="userNameQuery"
                            searchHandler={searchHandler}
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-3"]}`}>
                        Email
                        <SearchPopup
                            searchParams="emailQuery"
                            searchHandler={searchHandler}
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-4"]}`}>
                        Phone Number
                        <SearchPopup
                            searchParams="phoneNumberQuery"
                            searchHandler={searchHandler}
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-5"]}`}>
                        Role
                        <Dropdown
                            dropdownList={["Default", "Admin", "User"]}
                            searchParam="sortRole"
                            searchHandler={searchHandler}
                        />
                    </div>
                    <div className={`${styles["col"]} ${styles["col-6"]}`}>
                        Action
                    </div>
                </li>
                <div className="bar-loader">
                    {isLoading ? <CustomBarLoader /> : null}
                </div>
                {users &&
                    users.map((user) => {
                        return <TableItem key={user._id} user={user} />;
                    })}
            </ul>
            <Pagination
                totalItems={totalUsers}
                changePageHandler={changePageHandler}
            />
        </>
    );
};

export default Table;
