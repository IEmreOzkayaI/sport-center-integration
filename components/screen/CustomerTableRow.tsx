"use client"

import {
    TableCell,
    TableRow
} from "@/components/ui/table"
import CustomerStatus from './CustomerStatus'
import customerStore from "@/store/customer.store";
import sessionStore from "@/store/session.store";

export default function CustomerTableRow({ customerAndInvoiceList }: { customerAndInvoiceList: any }) {
    const setCustomer = customerStore((state: any) => state.setCustomer);
    return (
        <>
            {
                customerAndInvoiceList?.map((item: any) => (
                    <TableRow key={item.customers.id} className="hover:cursor-pointer" onClick={() => setCustomer(item)}>
                        <TableCell className="text-center">
                            <CustomerStatus customer={item}/>
                        </TableCell>
                        <TableCell>
                            <div className="font-medium text-center">{item.customers.fullName}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-center">{item.invoices.packageName} Aylık</TableCell>
                        <TableCell className="hidden md:table-cell text-center">{item.customers.phone}</TableCell>
                    </TableRow>
                ))
            }
        </>)

}
