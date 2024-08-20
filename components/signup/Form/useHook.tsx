// hooks/useSignupForm.ts
import { useEffect } from "react";
import { signup } from "@/actions/auth.action";
import { showToast } from "@/lib/utils";
import { useFormState } from "react-dom";

export function useHook() {
    const [state, action] = useFormState(signup, undefined);

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

    const formatPhoneNumber = (value: string): string => {
        let formattedValue = value.replace(/[^0-9]/g, "").slice(0, 10);
        if (formattedValue.length > 3) {
            formattedValue = `(${formattedValue.slice(0, 3)}) ${formattedValue.slice(3, 6)} ${formattedValue.slice(6)}`;
        } else if (formattedValue.length === 3) {
            formattedValue = `(${formattedValue}) `;
        }
        return formattedValue;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatPhoneNumber(e.target.value);
        e.target.value = formattedValue;
    };

    const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            const value = e.currentTarget.value.replace(/[^0-9]/g, "");
            e.currentTarget.value = value.slice(0, -1);
        }
    };

    return {
        action,
        handlePhoneChange,
        handlePhoneKeyDown,
    };
}
