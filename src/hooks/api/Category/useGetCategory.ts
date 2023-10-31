import React, { useEffect, useState } from "react";
import { Category } from "../../../models/Category";
import usePrivateHttp from "../../authentication/usePrivateHttp";
import { useAppDispatch } from "../../store/useStore";
import { loadingActions } from "../../../toolkit";

const useGetCategory = (dependencies: any[]) => {
    const privateHttp = usePrivateHttp();
    const dispatch = useAppDispatch();
    const [categories, setCategories] = useState<Category[]>();

    useEffect(() => {
        const fetchCategories = async () => {
            dispatch(loadingActions.setLoading(true));
            try {
                const res = await privateHttp.get(
                    "/api/category/get-categories"
                );
                setCategories(res.data);
                dispatch(loadingActions.setLoading(false));
            } catch (error) {
                console.log(error);
            }
        };

        const call = setTimeout(() => {
            fetchCategories();
        }, 500);

        return () => {
            clearTimeout(call);
        };
    }, [...dependencies]);

    return categories;
};

export default useGetCategory;
