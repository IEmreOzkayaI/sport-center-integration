"use server"

import { getActiveAndInactiveCustomersByUserId, getActiveCustomersByUserId, getCustomersByUserId } from "@/actions/customer.action";
import { verifySession } from "@/actions/session.action";
import { getAllUsers, getTotalProfitById } from "@/actions/user.action";
import CustomerDetail from "@/components/screen/CustomerDetail";
import CustomerTable from "@/components/screen/CustomerTable";
import StatisticCard from "@/components/screen/StatisticCard";

import { FROM_OLD_TO_NOW, NOW, TOTAL_ACTIVE_PROFIT, TOTAL_ACTIVE_USER, TOTAL_MEMBER_AMOUNT, TOTAL_PROFIT, TOTAL_SPORT_CENTER } from "@/constants";
import { Activity, Building, CreditCard, Users } from "lucide-react";

export default async function Home() {
    const session = await verifySession();
    const memberAmount = await getActiveAndInactiveCustomersByUserId();
    const activeMemberAmount = await getActiveCustomersByUserId();
    const sportCenters = await getAllUsers();
    const totalProfit = await getTotalProfitById();

    console.log("memberAmount", memberAmount);
    console.log("activeMemberAmount", activeMemberAmount)
    return (
        <main className="
                flex flex-col
                sm:flex sm:flex-col
                md:row-span-11 gap-y-6
                ">
            <div className="
                flex gap-4 flex-wrap justify-between items-center mb-5 max-h-full
                sm:flex sm:gap-1 sm:flex-wrap sm:justify-evenly sm:items-center sm:my-auto sm:row-span-1
                md:flex md:gap-10 md:flex-nowrap md:justify-evenly md:items-center md:my-auto md:row-span-1
                ">
                <StatisticCard className="w-auto md:w-full" title={TOTAL_MEMBER_AMOUNT} value={memberAmount?.data?.result?.length} icon={<Users className="h-4 w-4 text-muted-foreground" />} subText={FROM_OLD_TO_NOW} />
                {session?.role === "admin" && (
                    <StatisticCard className="w-auto md:w-full" title={TOTAL_SPORT_CENTER} value={sportCenters?.data?.result?.length} icon={<Building className="h-4 w-4 text-muted-foreground" />} subText={FROM_OLD_TO_NOW} />
                )}
                <StatisticCard className="w-auto md:w-full" title={TOTAL_ACTIVE_USER} value={activeMemberAmount?.data?.result?.length} icon={<Activity className="h-4 w-4 text-muted-foreground" />} subText={NOW} />
                <StatisticCard className="w-auto md:w-full" title={TOTAL_PROFIT} value={`${totalProfit?.data.result.totalProfit} ₺`} icon={<CreditCard className="h-4 w-4 text-muted-foreground" />} subText={FROM_OLD_TO_NOW} />
                <StatisticCard className="w-auto md:w-full" title={TOTAL_ACTIVE_PROFIT} value={`${totalProfit?.data.result.totalActiveProfit} ₺`} icon={<Activity className="h-4 w-4 text-muted-foreground" />} subText={NOW} />
            </div>

            <div className="
                flex flex-col gap-4 h-full
                sm:flex sm:flex-col sm:gap-4
                md:row-span-10 md:flex md:flex-row md:gap-10
                ">
                <CustomerTable className="w-full md:w-3/4  h-full" />
                <CustomerDetail className="w-full md:w-1/4 h-full" />
            </div>
        </main>
    );
}
