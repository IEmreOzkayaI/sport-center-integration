// hooks/useLoginForm.ts
import { useEffect } from "react";
import { login } from "@/actions/auth.action";
import { showToast } from "@/lib/utils";
import { useFormState } from "react-dom";

export function useHook() {
    const [state, action] = useFormState(login, undefined);

    useEffect(() => {
        if (state && "errors" in state && state.errors) {
            const errorKey = Object.keys(state.errors)[0] as keyof typeof state.errors;
            showToast(state.errors[errorKey]?.[0], "error");
        }
    }, [state]);

    useEffect(() => {
        if (state?.data) {
            if (state.data.status === 201) {
                showToast(state.data.description, "success", true);
            }
            if (state.data.status === 400) {
                showToast(state.data.description, "error", false);
            }
        }
    }, [state]);

    return { action };
}
