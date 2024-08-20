"use server"

import { getActiveAndInactiveCustomersByUserId, getActiveCustomersByUserId, getInactiveCustomersByUserId, getPendingCustomersByUserId } from "@/actions/customer.action";
import { getAllUsers, getTotalProfitById } from "@/actions/user.action";
import StatisticGroup from "@/components/statistic/Group";
export default async function page() {

    const totalMemberAmount = await getActiveAndInactiveCustomersByUserId();
    const activeMemberAmount = await getActiveCustomersByUserId();
    const inActiveMemberAmount = await getInactiveCustomersByUserId();
    const pendingMemberAmount = await getPendingCustomersByUserId();
    const sportCenters = await getAllUsers();
    const totalProfit = await getTotalProfitById();

    return (
        <StatisticGroup sportCenters={sportCenters}
            totalProfit={totalProfit}
            totalMemberAmount={totalMemberAmount}
            activeMemberAmount={activeMemberAmount}
            inActiveMemberAmount={inActiveMemberAmount}
            pendingMemberAmount={pendingMemberAmount}
        />)
}
