"use server"

import { getActiveAndInactiveCustomersByUserId, getActiveCustomersByUserId, getCustomersByUserId, getInactiveCustomersByUserId, getPendingCustomersByUserId } from "@/actions/customer.action";
import { verifySession } from "@/actions/session.action";
import { getAllUsers, getTotalProfitById } from "@/actions/user.action";
import CustomerDetail from "@/components/screen/CustomerDetail";
import CustomerTable from "@/components/screen/CustomerTable";
import StatisticGroup from "@/components/screen/StatisticGroup";


export default async function Home({ searchParams }: { searchParams: { page?: number, limit?: number, search?: string } }) {
    const totalMemberAmount = await getActiveAndInactiveCustomersByUserId();
    const activeMemberAmount = await getActiveCustomersByUserId();
    const inActiveMemberAmount = await getInactiveCustomersByUserId();
    const pendingMemberAmount = await getPendingCustomersByUserId();
    const sportCenters = await getAllUsers();
    const totalProfit = await getTotalProfitById();
    const limit = 10
    const customers = await getCustomersByUserId(0, limit, "");
    return (
        <main className="
                flex flex-col
                sm:flex sm:flex-col
                md:row-span-11 gap-y-6
                ">
            <div className="
                flex gap-4 flex-wrap justify-between items-center max-h-full
                sm:flex sm:gap-1 sm:flex-wrap sm:justify-evenly sm:items-center sm:my-auto sm:row-span-1
                md:flex md:gap-10 md:flex-nowrap md:justify-evenly md:items-center md:my-auto md:row-span-1
                ">
                <StatisticGroup sportCenters={sportCenters}
                    totalProfit={totalProfit}
                    totalMemberAmount={totalMemberAmount}
                    activeMemberAmount={activeMemberAmount}
                    inActiveMemberAmount={inActiveMemberAmount}
                    pendingMemberAmount={pendingMemberAmount}
                />
            </div>

            <div className="
                flex flex-col gap-4 h-full
                sm:flex sm:flex-col sm:gap-4
                md:row-span-10 md:flex md:flex-row md:gap-10
                ">
                <CustomerTable className="w-full md:w-3/4  h-full" serverCustomers={customers} limit={limit} />
                <CustomerDetail className="w-full md:w-1/4 h-full" />
            </div>
        </main>
    );
}
