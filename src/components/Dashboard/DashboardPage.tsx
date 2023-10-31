import React, { useEffect, useMemo } from "react";
import styles from "./DashboardPage.module.css";
import Container from "../../screen/Container/Container";
import Header from "./Header";
import CheckoutTable from "../Checkout/Table/CheckoutTable";
import useGetCheckout from "../../hooks/api/Checkout/useGetCheckout";
import useGetUser from "../../hooks/api/User/useGetUser";
import { useAppDispatch } from "../../hooks/store/useStore";
import { categoriesActions, productsAction, tagsActions } from "../../toolkit";
import useGetProduct from "../../hooks/api/Product/useGetProduct";
import useGetCategory from "../../hooks/api/Category/useGetCategory";
import useGetTag from "../../hooks/api/Tag/useGetTag";
const DashboardPage = () => {
    const dispatch = useAppDispatch();
    const headerTitle = useMemo(() => {
        return "Dash Board";
    }, []);

    // get all users with the role user
    const { users } = useGetUser({ sortRole: "user" }, []);

    // get all products and store
    const { products } = useGetProduct({ category: "All" }, []);
    dispatch(productsAction.setProducts(products)); // store all products

    // get all checkouts
    const { fetchedCheckouts: checkouts } = useGetCheckout(
        { sortDate: true },
        []
    );

    // get all categories and store
    const categories = useGetCategory([]);
    dispatch(categoriesActions.fetchAllCategories(categories));

    // get all categories and store
    const tags = useGetTag([]);
    dispatch(tagsActions.fetchAllTags(tags));

    return (
        <Container headerTitle={headerTitle}>
            <Header checkouts={checkouts} users={users} products={products} />
            <h2 className={styles["latest-checkout"]}>Latest Checkouts</h2>
            <CheckoutTable />
        </Container>
    );
};

export default DashboardPage;
