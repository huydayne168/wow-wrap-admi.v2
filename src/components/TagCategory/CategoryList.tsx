import React, { useState, useCallback } from "react";
import { useAppSelector } from "../../hooks/store/useStore";
import { Category } from "../../models/Category";
import Input from "../UI/Input/Input";
import List from "./List";

const CategoryList = () => {
    const categoriesSlice = useAppSelector((state) => state.categoriesSlice);
    const [categories, setCategories] = useState<Category[]>(categoriesSlice);

    const onChangeInputValue = useCallback((value: string) => {
        if (value === "") {
            setCategories((pre) => categoriesSlice);
        } else {
            setCategories((pre) => {
                return pre.filter((category) => {
                    return category.name
                        .toLowerCase()
                        .includes(value.toLowerCase());
                });
            });
        }
    }, []);

    return (
        <div>
            <Input
                type="text"
                name="tags"
                id="tags"
                onChangeInputValue={onChangeInputValue}
            />
            <button style={{ marginTop: "2.4rem" }} className="button">
                Add
            </button>
            <List items={categories} />
        </div>
    );
};

export default CategoryList;
