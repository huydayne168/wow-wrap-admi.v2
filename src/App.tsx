import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./screen/RootLayout/RootLayout";
import DashboardPage from "./components/Dashboard/DashboardPage";
import Login from "./components/Login/Login";
import CheckoutDetail from "./components/Checkout/ChechoutDetail/CheckoutDetail";
import UserList from "./components/User/UserList/UserList";
import UserDetail from "./components/User/UserDetail/UserDetail";
import ProductList from "./components/Product/ProductList/ProductList";
import ProductDetail from "./components/Product/ProductDetail/ProductDetail";
import EditProduct from "./components/Product/Edit/EditProduct";
import AddNewProduct from "./components/Product/AddNew/AddNewProduct";
import CheckoutList from "./components/Checkout/CheckoutList/CheckoutList";
import FlashSaleList from "./components/FlashSale/FlashSaleList/FlashSaleList";
import VoucherList from "./components/Voucher/VoucherList/VoucherList";
import TagCategoryList from "./components/TagCategory/TagCategoryList";
import AddNewFlashSale from "./components/FlashSale/AddNew/AddNewFlashSale";
import AddNewVoucher from "./components/Voucher/AddNew/AddNewVoucher";
function App() {
    const router = createBrowserRouter([
        {
            path: "",
            element: <Login />,
        },
        // {
        //     path: "sign-up",
        //     element: <SignUp />,
        // },
        {
            path: "/admin/",
            element: <RootLayout />,
            children: [
                {
                    path: "dashboard",
                    element: <DashboardPage />,
                },
                {
                    path: "user",
                    element: <UserList />,
                },
                {
                    path: "userDetail/:userId",
                    element: <UserDetail />,
                },
                {
                    path: "checkout",
                    element: <CheckoutList />,
                },
                {
                    path: "checkoutDetail",
                    element: <CheckoutDetail />,
                },
                {
                    path: "product",
                    element: <ProductList />,
                },
                {
                    path: "productDetail/:productId",
                    element: <ProductDetail />,
                },
                {
                    path: "newProduct",
                    element: <AddNewProduct />,
                },
                {
                    path: "editProduct/:productId",
                    element: <EditProduct />,
                },
                {
                    path: "flashsale",
                    element: <FlashSaleList />,
                },
                {
                    path: "newFlashSale",
                    element: <AddNewFlashSale />,
                },
                {
                    path: "voucher",
                    element: <VoucherList />,
                },
                {
                    path: "newVoucher",
                    element: <AddNewVoucher />,
                },
                {
                    path: "tagCategory",
                    element: <TagCategoryList />,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
