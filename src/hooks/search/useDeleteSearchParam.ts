import React from "react";
import { useSearchParams } from "react-router-dom";

const useDeleteSearchParams = () => {
    const [search, setSearch] = useSearchParams();

    function deleteSearchParam(paramName: string) {
        search.delete(paramName);
        setSearch(search, {
            replace: true,
        });
    }

    return { search, deleteSearchParam };
};

export default useDeleteSearchParams;
