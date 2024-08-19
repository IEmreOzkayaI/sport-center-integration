"use server"

import { getActiveAndInactiveCustomersByUserId, getActiveCustomersByUserId, getInactiveCustomersByUserId, getPendingCustomersByUserId } from "@/actions/customer.action";
import { getAllUsers, getTotalProfitById } from "@/actions/user.action";
import StatisticGroup from "@/components/statistic/Group";
import wait from 'wait'
export default async function page() {
    await wait(4000)

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
