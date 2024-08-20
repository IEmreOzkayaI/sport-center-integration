// hooks/useUserList.ts
import { useState, useEffect } from "react";
import { getAllUsers } from "@/actions/user.action";

export function useHook() {
    const [userList, setUserList] = useState<any>();

    useEffect(() => {
        const fetchUserList = async () => {
            const data = await getAllUsers();
            setUserList(data);
        };

        fetchUserList();
    }, []);

    return userList;
}
