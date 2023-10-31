import React from "react";
import styles from "./ProductDetail.module.css";
import { useLocation } from "react-router-dom";
import Container from "../../../screen/Container/Container";
import { Product } from "../../../models/Product";
import ProductDesc from "./ProductDesc";
import ProductReview from "./ProductReview";
const ProductDetail = () => {
    const location = useLocation();
    const product: Product = location.state;
    console.log(product);

    return (
        <Container headerTitle="Product Detail">
            <ProductDesc product={product} />
            <h2 className={styles["reviews"]}>Reviews</h2>
            <ProductReview reviews={product.reviews} />
        </Container>
    );
};

export default ProductDetail;
