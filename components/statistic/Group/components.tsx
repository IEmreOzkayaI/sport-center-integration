"use client";

import { StatisticCardSkeleton } from "@/components/skeletons/StatisticCardSkeleton";
import {
    FROM_OLD_TO_NOW,
    NOW,
    TOTAL_ACTIVE_MEMBER,
    TOTAL_ACTIVE_PROFIT,
    TOTAL_INACTIVE_MEMBER,
    TOTAL_MEMBER_AMOUNT,
    TOTAL_PENDING_MEMBER,
    TOTAL_PROFIT
} from "@/constants";
import { Activity, CreditCard, Users } from "lucide-react";
import StatisticCard from "../Card";


export function renderUserStatisticCards(
    index: number,
    handleIndexChange: (index: number) => void,
    totalMemberAmount: any,
    activeMemberAmount: any,
    inActiveMemberAmount: any,
    pendingMemberAmount: any
) {
    if (index === 0 || index === null) {
        return <span onClick={() => handleIndexChange(1)} className="w-full cursor-pointer">
            <StatisticCard
                title={TOTAL_MEMBER_AMOUNT}
                value={totalMemberAmount?.data?.result?.length}
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
                subText={FROM_OLD_TO_NOW}
            />
        </span>

    }

    if (index === 1 || index === null) {
        return <span onClick={() => handleIndexChange(2)} className="w-full cursor-pointer">
            <StatisticCard
                title={TOTAL_ACTIVE_MEMBER}
                value={activeMemberAmount?.data?.result?.length}
                icon={<Activity className="h-4 w-4 text-muted-foreground" />}
                subText={NOW}
            />
        </span>
    }

    if (index === 2 || index === null) {
        return <span onClick={() => handleIndexChange(3)} className="w-full cursor-pointer">
            <StatisticCard
                title={TOTAL_INACTIVE_MEMBER}
                value={inActiveMemberAmount?.data?.result?.length}
                icon={<Activity className="h-4 w-4 text-muted-foreground" />}
                subText={NOW}
            />
        </span>
    }

    if (index === 3 || index === null) {
        return <span onClick={() => handleIndexChange(0)} className="w-full cursor-pointer">
            <StatisticCard
                title={TOTAL_PENDING_MEMBER}
                value={pendingMemberAmount?.data?.result?.length}
                icon={<Activity className="h-4 w-4 text-muted-foreground" />}
                subText={NOW}
            />
        </span>
    }

    return null;
}

export function renderProfitStatisticCards(
    index: number,
    handleIndexChange: (index: number) => void,
    totalProfit: any
) {
    if (index === 0 || index === null) {
        return <span onClick={() => handleIndexChange(1)} className="w-full cursor-pointer">
            <StatisticCard
                title={TOTAL_PROFIT}
                value={`${totalProfit?.data.result.totalProfit.toFixed(2)} ₺`}
                icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
                subText={FROM_OLD_TO_NOW}
            />
        </span>
    }

    if (index === 1 || index === null) {
        return (
            <span onClick={() => handleIndexChange(0)} className="w-full cursor-pointer">
                <StatisticCard
                    title={TOTAL_ACTIVE_PROFIT}
                    value={`${totalProfit?.data.result.totalActiveProfit.toFixed(2)} ₺`}
                    icon={<Activity className="h-4 w-4 text-muted-foreground" />}
                    subText={NOW}
                />
            </span>
        );
    }

    return null;
}
