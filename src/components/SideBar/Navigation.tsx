import React, { useCallback } from "react";
import styles from "./Navigation.module.css";
import NavigationListItem from "./NavigationListItem";
import { useAppDispatch } from "../../hooks/store/useStore";
import { navigationActions } from "../../toolkit";
import LogoutButton from "./LogoutButton";
const Navigation = () => {
    const dispatch = useAppDispatch();

    const goToPages = useCallback((page: string) => {
        dispatch(navigationActions.setNavigationState(page.toLowerCase()));
    }, []);

    return (
        <div className={styles["navigation"]}>
            <div className={styles["navigation-list"]}>
                <span>Main</span>
                <ul>
                    <NavigationListItem
                        name="Dashboard"
                        goToPages={goToPages}
                    />
                </ul>
            </div>

            <div className={styles["navigation-list"]}>
                <span>List</span>
                <ul>
                    <NavigationListItem name="User" goToPages={goToPages} />
                    <NavigationListItem name="Product" goToPages={goToPages} />
                    <NavigationListItem
                        name="Flashsale"
                        goToPages={goToPages}
                    />
                    <NavigationListItem name="Voucher" goToPages={goToPages} />
                    <NavigationListItem name="Checkout" goToPages={goToPages} />
                    <NavigationListItem
                        name="Tag & Category"
                        goToPages={goToPages}
                    />
                </ul>
            </div>

            <div className={styles["navigation-list"]}>
                <span>New</span>
                <ul>
                    <NavigationListItem
                        name="New Product"
                        goToPages={goToPages}
                    />
                    <NavigationListItem
                        name="New Flash Sale"
                        goToPages={goToPages}
                    />
                    <NavigationListItem
                        name="New Voucher"
                        goToPages={goToPages}
                    />
                </ul>
            </div>

            <LogoutButton />
        </div>
    );
};

export default Navigation;
