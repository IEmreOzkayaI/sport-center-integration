import { updateCustomerStatus } from "@/actions/customer.action";
import { showToast } from "@/lib/utils";
import sessionStore from "@/store/session.store";
import { useState } from "react";
import { getNewStatus, getToastMessage } from "./utils";

export function useHook(initialStatus: string, customerId: string) {
    const [customerStatus, setCustomerStatus] = useState(initialStatus);
    const session = sessionStore((state: any) => state.session);

    const handleStatusChange = async () => {
        if (session?.role !== "admin") {
            return;
        }

        const newStatus = getNewStatus(customerStatus);
        const result = await updateCustomerStatus(customerId, newStatus);

        if (result) {
            setCustomerStatus(newStatus);
            const toastMessage = getToastMessage(newStatus);
            showToast(`Müşteri statüsü güncellendi ${toastMessage}`, "success");
        }
    };

    return { customerStatus, handleStatusChange };
}
