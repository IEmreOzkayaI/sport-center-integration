"use client";

import { StatisticCardSkeleton } from "@/components/skeletons/StatisticCardSkeleton";
import {
    FROM_OLD_TO_NOW,
    TOTAL_SPORT_CENTER
} from "@/constants";
import { Building } from "lucide-react";
import StatisticCard from "../Card";
import { renderProfitStatisticCards, renderUserStatisticCards } from "./components";
import { useHook } from "./useHook";

export default function StatisticGroup({
    sportCenters,
    totalMemberAmount,
    activeMemberAmount,
    inActiveMemberAmount,
    pendingMemberAmount,
    totalProfit,
}: {
    sportCenters: any;
    totalMemberAmount: any;
    activeMemberAmount: any;
    inActiveMemberAmount: any;
    pendingMemberAmount: any;
    totalProfit: any;
}) {
    const {
        session,
        loadingAdminCard,
        userStatisticIndex,
        profitStatisticIndex,
        handleUserStatisticIndex,
        handleProfitStatisticIndex,
    } = useHook();

    return (
        <>
            {loadingAdminCard ? (
                <StatisticCardSkeleton className="w-auto md:w-full" />
            ) : (
                session?.role === "admin" && (
                    <StatisticCard
                        className="w-auto md:w-full"
                        title={TOTAL_SPORT_CENTER}
                        value={sportCenters?.data?.result?.length}
                        icon={<Building className="h-4 w-4 text-muted-foreground" />}
                        subText={FROM_OLD_TO_NOW}
                    />
                )
            )}

            {renderUserStatisticCards(
                loadingAdminCard,
                userStatisticIndex,
                handleUserStatisticIndex,
                totalMemberAmount,
                activeMemberAmount,
                inActiveMemberAmount,
                pendingMemberAmount
            )}

            {renderProfitStatisticCards(
                loadingAdminCard,
                profitStatisticIndex,
                handleProfitStatisticIndex,
                totalProfit
            )}
        </>
    );
}
