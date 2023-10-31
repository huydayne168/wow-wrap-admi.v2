import { useEffect, useState } from "react";
import { User } from "../../../models/User";
import usePrivateHttp from "../../authentication/usePrivateHttp";
import { useAppDispatch } from "../../store/useStore";
import { loadingActions } from "../../../toolkit";
import { UserQueryOptions } from "../../../models/UserQueryOptions";

const useGetUser = (
    userQueryOptions: UserQueryOptions,
    dependencies: any[]
) => {
    const privateHttp = usePrivateHttp();
    const [users, setUsers] = useState<User[]>([]);
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getUsers = async () => {
            dispatch(loadingActions.setLoading(true));
            try {
                const res = await privateHttp.get("/user/get-users", {
                    params: userQueryOptions,
                });
                setUsers(res.data.users);
                setTotalUsers(res.data.totalUsers);
                dispatch(loadingActions.setLoading(false));
            } catch (error) {
                console.log(error);
            }
        };

        const call = setTimeout(() => {
            getUsers();
        }, 500);

        return () => {
            clearTimeout(call);
        };
    }, [...dependencies]);

    return { users, totalUsers };
};

export default useGetUser;
