import React from "react";
import Container from "../../../screen/Container/Container";
import CheckoutTable from "../Table/CheckoutTable";

const CheckoutList = () => {
    return (
        <Container headerTitle="Checkouts">
            <CheckoutTable />
        </Container>
    );
};

export default CheckoutList;
