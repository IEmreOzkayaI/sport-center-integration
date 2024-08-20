// hooks/useStatisticState.ts
import { useEffect, useState } from "react";
import sessionStore from "@/store/session.store";

export function useHook() {
    const session = sessionStore((state: any) => state.session);
    const [loadingAdminCard, setLoadingAdminCard] = useState(true);

    const [userStatisticIndex, setUserStatisticIndex] = useState(0);
    const [profitStatisticIndex, setProfitStatisticIndex] = useState(0);

    useEffect(() => {
        // Simulate data fetching or session check
        if (session?.role === "admin") {
            const timer = setTimeout(() => {
                setLoadingAdminCard(false);
            }, 500);

            return () => clearTimeout(timer);
        } else {
            setLoadingAdminCard(false);
        }
    }, [session]);

    const handleUserStatisticIndex = (index: number) => {
        setUserStatisticIndex(index);
    };

    const handleProfitStatisticIndex = (index: number) => {
        setProfitStatisticIndex(index);
    };

    return {
        session,
        loadingAdminCard,
        userStatisticIndex,
        profitStatisticIndex,
        handleUserStatisticIndex,
        handleProfitStatisticIndex,
    };
}
