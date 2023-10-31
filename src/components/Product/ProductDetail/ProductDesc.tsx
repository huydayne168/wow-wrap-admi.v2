import React from "react";
import { Product } from "../../../models/Product";
import styles from "./ProductDesc.module.css";
import RateStar from "../../UI/RateStar/RateStar";
const ProductDesc: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <div className={`${styles["food-detail"]} content-container`}>
            <div className={styles["food-img"]}>
                <img src={product.image} alt={product.name} />
            </div>
            <div className={styles["food-desc"]}>
                <h1 className={`content-heading ${styles.name}`}>
                    {product.name}
                </h1>
                <div className={styles["food-rate"]}>
                    <RateStar ratePoint={product.rate} />
                    <p className={styles["review-count"]}>
                        ({product.reviews.length} customers review)
                    </p>
                </div>

                <div className={`content-heading ${styles["food-price"]}`}>
                    {product.salePrice ? (
                        <>
                            <span className={styles["food-old-price"]}>
                                ${product.price}
                            </span>
                            <span>${product.salePrice}</span>
                        </>
                    ) : (
                        <span>${product.price}</span>
                    )}
                </div>
                <div className={styles["food-text"]}>
                    {product.shortDescription}
                </div>

                <div className={styles["food-more-info"]}>
                    <div>
                        <span>ID:</span> {product._id}
                    </div>
                    <div>
                        <span>category:</span> {product.category.name}
                    </div>
                    <div>
                        <span>tags:</span>
                        {product.tags.map((tag) => tag.name).join(", ")}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDesc;
