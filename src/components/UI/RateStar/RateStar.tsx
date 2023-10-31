import React from "react";
import styles from "./RateStar.module.css";
import Star from "./Star";
const RateStar: React.FC<{ ratePoint: number }> = ({ ratePoint }) => {
    const points = [1, 2, 3, 4, 5];
    return (
        <div className={styles["rate-star"]}>
            {points.map((point, index) => {
                return (
                    <Star
                        key={point}
                        point={point}
                        color={ratePoint > index ? "#FB8F2C" : "#828282"}
                    />
                );
            })}
        </div>
    );
};

export default RateStar;
