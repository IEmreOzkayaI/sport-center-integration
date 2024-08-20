// hooks/useCustomerSelection.ts
import customerStore from "@/store/customer.store";

export function useHook() {
    const setCustomer = customerStore((state: any) => state.setCustomer);

    const handleCustomerSelect = (customer: any) => {
        setCustomer(customer);
    };

    return { handleCustomerSelect };
}
