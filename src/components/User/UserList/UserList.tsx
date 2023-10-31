import React, { useMemo } from "react";
import styles from "./UserList.module.css";
import Container from "../../../screen/Container/Container";
import Table from "../Table/Table";
const UserList = () => {
    const headerTitle = useMemo(() => {
        console.log("again");
        return "Users";
    }, []);

    return (
        <Container headerTitle={headerTitle}>
            <Table />
        </Container>
    );
};

export default UserList;
