import React from "react";
import styles from "./ProductReview.module.css";
import { Review } from "../../../models/Review";
import RateStar from "../../UI/RateStar/RateStar";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ProductReview: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
    console.log(reviews);

    return (
        <div className={styles["review"]}>
            {reviews.map((review, index) => {
                return (
                    <div key={review._id} className={styles["review-item"]}>
                        <Avatar
                            style={{ backgroundColor: "#fb8f2c" }}
                            icon={<UserOutlined />}
                        />

                        <div className={styles["desc"]}>
                            <div className={styles.top}>
                                <div className={styles.username}>
                                    {review.user.userName}
                                </div>
                                <span>-</span>
                                <div className={styles["date"]}>
                                    {review.date}
                                </div>
                            </div>
                            <div className={styles.body}>{review.comment}</div>
                            <RateStar ratePoint={review.ratePoint} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductReview;
