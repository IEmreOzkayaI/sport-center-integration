"use server"

import StatisticCard from "@/components/custom/root/StatisticCard";
import UserTable from "@/components/custom/root/table/UserTable";
import UserDetail from "@/components/custom/root/UserDetail";

import { TOTAL_ACTIVE_USER, TOTAL_MEMBER_AMOUNT, TOTAL_PROFIT, TOTAL_SPORT_CENTER } from "@/constants";
import { getSession, verifySession } from "@/lib/auth/session.auth";
import userStore from "@/store/user.store";
import { Activity, Building, CreditCard, Users } from "lucide-react";

export default async function Home() {
    return (
        <main className="
                flex flex-col
                sm:flex sm:flex-col
                md:grid md:grid-rows-10 max-h-screen w-full
                ">
            <div className="
                flex gap-4 flex-wrap justify-between items-center mb-5
                sm:flex sm:gap-1 sm:flex-wrap sm:justify-evenly sm:items-center sm:my-auto sm:row-span-2 sm:mb-5
                md:flex md:gap-10 md:flex-nowrap md:justify-evenly md:items-center md:my-auto md:row-span-2 md:mb-5
                ">
                <StatisticCard className="w-auto md:w-full" title={TOTAL_MEMBER_AMOUNT} value={"200"} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
                <StatisticCard className="w-auto md:w-full" title={TOTAL_SPORT_CENTER} value={"200"} icon={<Building className="h-4 w-4 text-muted-foreground" />} />
                <StatisticCard className="w-auto md:w-full" title={TOTAL_ACTIVE_USER} value={"200"} icon={<Activity className="h-4 w-4 text-muted-foreground" />} />
                <StatisticCard className="w-auto md:w-full" title={TOTAL_PROFIT} value={"200"} icon={<CreditCard className="h-4 w-4 text-muted-foreground" />} />
            </div>

            <div className="
                flex flex-col gap-4
                sm:flex sm:flex-col sm:gap-4
                md:row-span-8 md:flex md:flex-row md:gap-10
                ">
                <UserTable className="w-full md:w-3/4" />
                <UserDetail className="w-full md:w-1/4" />
            </div>
        </main>
    );
}
