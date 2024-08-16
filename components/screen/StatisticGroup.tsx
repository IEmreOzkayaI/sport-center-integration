"use client"
import { FROM_OLD_TO_NOW, NOW, TOTAL_ACTIVE_MEMBER, TOTAL_ACTIVE_PROFIT, TOTAL_INACTIVE_MEMBER, TOTAL_MEMBER_AMOUNT, TOTAL_PENDING_MEMBER, TOTAL_PROFIT, TOTAL_SPORT_CENTER } from "@/constants";
import sessionStore from '@/store/session.store';
import { Activity, Building, CreditCard, Users } from "lucide-react";
import StatisticCard from './StatisticCard';
import { useState } from "react";
import { Card } from "../ui/card";

export default function StatisticGroup({ sportCenters, totalMemberAmount, activeMemberAmount, inActiveMemberAmount, pendingMemberAmount, totalProfit }: { sportCenters: any, totalMemberAmount: any, activeMemberAmount: any, inActiveMemberAmount: any, pendingMemberAmount: any, totalProfit: any }) {

    const session = sessionStore((state: any) => state.session);
    const [userStatisticIndex, setUserStatisticIndex] = useState(0);
    const [profitStatisticIndex, setProfitStatisticIndex] = useState(0);
    const [showSportCenterList, setShowSportCenterList] = useState(false);

    const handleUserStatisticIndex = (index: number) => {
        setUserStatisticIndex(index);
    }

    const handleProfitStatisticIndex = (index: number) => {
        setProfitStatisticIndex(index);
    }


    return (
        <>
            {session?.role === "admin" && (
                <>
                    <StatisticCard className="w-auto md:w-full" title={TOTAL_SPORT_CENTER} value={sportCenters?.data?.result?.length} icon={<Building className="h-4 w-4 text-muted-foreground" />} subText={FROM_OLD_TO_NOW} />
                </>
            )}

            {(userStatisticIndex === 0 || userStatisticIndex === null) && (
                <span onClick={() => handleUserStatisticIndex(1)} className="w-full cursor-pointer">
                    <StatisticCard
                        title={TOTAL_MEMBER_AMOUNT}
                        value={totalMemberAmount?.data?.result?.length}
                        icon={<Users className="h-4 w-4 text-muted-foreground" />}
                        subText={FROM_OLD_TO_NOW}
                    />
                </span>

            )}
            {(userStatisticIndex === 1 || userStatisticIndex === null) && (
                <span onClick={() => handleUserStatisticIndex(2)} className="w-full cursor-pointer">
                    <StatisticCard
                        title={TOTAL_ACTIVE_MEMBER}
                        value={activeMemberAmount?.data?.result?.length}
                        icon={<Activity className="h-4 w-4 text-muted-foreground" />}
                        subText={NOW}
                    />
                </span>
            )}
            {(userStatisticIndex === 2 || userStatisticIndex === null) && (
                <span onClick={() => handleUserStatisticIndex(3)} className="w-full cursor-pointer">
                    <StatisticCard
                        title={TOTAL_INACTIVE_MEMBER}
                        value={inActiveMemberAmount?.data?.result?.length}
                        icon={<Users className="h-4 w-4 text-muted-foreground" />}
                        subText={NOW}
                    />
                </span>
            )}
            {(userStatisticIndex === 3 || userStatisticIndex === null) && (
                <span onClick={() => handleUserStatisticIndex(0)} className="w-full cursor-pointer">
                    <StatisticCard
                        title={TOTAL_PENDING_MEMBER}
                        value={pendingMemberAmount?.data?.result?.length}
                        icon={<Activity className="h-4 w-4 text-muted-foreground" />}
                        subText={NOW}
                    />
                </span>
            )}


            {(profitStatisticIndex === 0 || profitStatisticIndex === null) && (
                <span onClick={() => handleProfitStatisticIndex(1)} className="w-full cursor-pointer">
                    <StatisticCard title={TOTAL_PROFIT} value={`${totalProfit?.data.result.totalProfit.toFixed(2)} ₺`} icon={<CreditCard className="h-4 w-4 text-muted-foreground" />} subText={FROM_OLD_TO_NOW} />
                </span>
            )}
            {(profitStatisticIndex === 1 || profitStatisticIndex === null) &&
                <span onClick={() => handleProfitStatisticIndex(0)} className="w-full cursor-pointer">
                    <StatisticCard title={TOTAL_ACTIVE_PROFIT} value={`${totalProfit?.data.result.totalActiveProfit.toFixed(2)} ₺`} icon={<Activity className="h-4 w-4 text-muted-foreground" />} subText={NOW} />
                </span>
            }
        </>
    )
}
