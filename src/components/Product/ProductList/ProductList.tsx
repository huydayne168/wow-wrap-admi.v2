import React from "react";
import styles from "./ProductList.module.css";
import Container from "../../../screen/Container/Container";
import { useAppSelector } from "../../../hooks/store/useStore";
import Table from "../Table/Table";
const ProductList = () => {
    return (
        <Container headerTitle="Products">
            <Table />
        </Container>
    );
};

export default ProductList;
