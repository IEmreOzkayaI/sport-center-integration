// hooks/useCustomerForm.ts
import { useEffect } from "react";
import { createCustomer } from "@/actions/customer.action";
import { showToast } from "@/lib/utils";
import sessionStore from "@/store/session.store";
import { useFormState } from "react-dom";

export function useHook() {
    const [state, action] = useFormState(createCustomer, undefined);
    const session = sessionStore((state: any) => state.session);

    useEffect(() => {
        if (state?.errors) {
            showToast(state.errors[Object.keys(state.errors)[0]][0], "error");
        }
    }, [state?.errors]);

    useEffect(() => {
        if (state?.data) {
            if (state.data.status === 201) {
                showToast(state.data.description, "success", true);
            }
            if (state.data.status === 400) {
                showToast(state.data.description, "error", false);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        }
    }, [state?.data]);

    return { state, action, session };
}
