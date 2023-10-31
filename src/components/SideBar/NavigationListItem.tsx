import React, { useMemo } from "react";
import styles from "./NavigationListItem.module.css";
import { useAppSelector } from "../../hooks/store/useStore";
import { Link } from "react-router-dom";
const NavigationListItem: React.FC<{ name: string; goToPages: Function }> = ({
    name,
    goToPages,
}) => {
    const navigationState = useAppSelector((state) => state.navigation);
    console.log(navigationState);

    const path = useMemo(() => {
        switch (name) {
            case "Tag & Category":
                return "tagCategory";
            case "New Product":
                return "newProduct";
            case "New Voucher":
                return "newVoucher";
            case "New Flash Sale":
                return "newFlashSale";
            default:
                return name;
        }
    }, []);

    return (
        <Link
            to={path}
            className={`${styles["navigation-list-item"]} ${
                navigationState === path.toLowerCase() ? styles["active"] : ""
            }`}
            onClick={() => {
                goToPages(path);
            }}
        >
            {name}
        </Link>
    );
};

export default NavigationListItem;
