// hooks/useCustomerDetail.ts
import { deleteCustomerById } from "@/actions/customer.action";
import { showToast } from "@/lib/utils";
import customerStore from "@/store/customer.store";
import sessionStore from "@/store/session.store";
import { useCallback } from "react";

export function useHook() {
    const customerDetail = customerStore((state: any) => state.customer);
    const clearCustomerDetail = customerStore((state: any) => state.clearCustomer);
    const session = sessionStore((state: any) => state.session);

    const handleDelete = useCallback(async (customerId: string) => {
        const response = await deleteCustomerById(customerId);
        if (response.data.status === 200) {
            clearCustomerDetail();
            showToast(response.data.description, "success", false);
        }
    }, [clearCustomerDetail]);

    return { customerDetail, session, handleDelete };
}
