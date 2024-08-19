"use client";

import {
    TableCell,
    TableRow
} from "@/components/ui/table";
import { capitalizeWords } from "@/lib/utils";
import CustomerStatus from "../Badge";
import { useHook } from "./useHook";
export default function CustomerTableRow({ customerAndInvoiceList }: any) {
    const { handleCustomerSelect } = useHook();

    return (
        <>
            {customerAndInvoiceList.map((item: any) => (
                <TableRow
                    key={item.customers.id}
                    className="hover:cursor-pointer"
                    onClick={() => handleCustomerSelect(item)}
                >
                    <TableCell className="text-center">
                        <CustomerStatus customer={item} />
                    </TableCell>
                    <TableCell>
                        <div className="font-medium text-center">
                            {capitalizeWords(item.customers.fullName)}
                        </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-center">
                        {item.invoices.packageName} Aylık
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-center">
                        {item.customers.phone}
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}
