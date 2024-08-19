"use server"
import { getCustomersByUserId } from "@/actions/customer.action";
import CustomerTable from "@/components/customer/Table";
import wait from 'wait'
export default async function page() {
    await wait(3000)
    const limit = 10
    const customers = await getCustomersByUserId(0, limit, "");
    return (
        <CustomerTable className="w-full md:w-3/4  h-full" serverCustomers={customers} limit={limit} />)
}
