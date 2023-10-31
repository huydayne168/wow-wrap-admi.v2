import React from "react";
import styles from "./TagCategoryList.module.css";
import Container from "../../screen/Container/Container";
import TagList from "./TagList";
import CategoryList from "./CategoryList";

const TagCategoryList = () => {
    return (
        <Container headerTitle="Tags & Categories">
            <div className={styles["container"]}>
                <div className={styles["tags"]}>
                    <h2>Tags</h2>
                    <TagList />
                </div>

                <div className={styles["categories"]}>
                    <h2>Categories</h2>
                    <CategoryList />
                </div>
            </div>
        </Container>
    );
};

export default TagCategoryList;
