import React from "react";
import { SetURLSearchParams, useSearchParams } from "react-router-dom";

const useSetSearchParams = (
    search: URLSearchParams,
    setSearch: SetURLSearchParams
) => {
    function setSearchParams(paramName: string, value: string) {
        search.set(paramName, value);
        setSearch(search);
    }

    return { search, setSearchParams };
};

export default useSetSearchParams;
