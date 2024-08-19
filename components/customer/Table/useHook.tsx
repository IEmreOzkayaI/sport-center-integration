// hooks/useCustomerData.ts
import { getCustomersByUserId } from "@/actions/customer.action";
import debounce from "lodash.debounce";
import { useCallback, useState } from "react";

export function useHook(initialCustomers: any, limit: number) {
    const [page, setPage] = useState(0);
    const [clientCustomers, setCustomers] = useState(initialCustomers);

    const fetchCustomers = async (page: number, search: string = "") => {
        const customers = await getCustomersByUserId(page, limit, search);
        setCustomers(customers);
    };

    const handleSearch = useCallback(
        debounce(async (e: any) => {
            const search = e.target.value.toLocaleLowerCase("tr");
            await fetchCustomers(0, search);
        }, 1000),
        [limit]
    );

    const handleNext = async () => {
        setPage((prevPage) => prevPage + 1);
        await fetchCustomers(page + 1);
    };

    const handlePrev = async () => {
        setPage((prevPage) => prevPage - 1);
        await fetchCustomers(page - 1);
    };

    return {
        page,
        clientCustomers,
        handleSearch,
        handleNext,
        handlePrev,
    };
}
