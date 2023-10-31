import React, { useEffect, useState } from "react";
import { Tag } from "../../../models/Tag";
import { useAppDispatch } from "../../store/useStore";
import usePrivateHttp from "../../authentication/usePrivateHttp";
import { loadingActions } from "../../../toolkit";

const useGetTag = (dependencies: any[]) => {
    const privateHttp = usePrivateHttp();
    const [tags, setTags] = useState<Tag[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchTags = async () => {
            dispatch(loadingActions.setLoading(true));
            try {
                const res = await privateHttp.get("/api/tag/get-tags");
                setTags(res.data);
                dispatch(loadingActions.setLoading(false));
            } catch (error) {
                console.log(error);
            }
        };

        const call = setTimeout(() => {
            fetchTags();
        }, 500);

        return () => {
            clearTimeout(call);
        };
    }, [...dependencies]);

    return tags;
};

export default useGetTag;
