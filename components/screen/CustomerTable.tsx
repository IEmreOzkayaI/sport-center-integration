
"use client"

import { getCustomersByUserId } from "@/actions/customer.action";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import debounce from 'lodash.debounce';
import { useCallback, useState } from "react";
import CustomerDialog from "./CustomerDialog";
import CustomerSearch from "./CustomerSearch";
import CustomerTableRow from "./CustomerTableRow";
import PaginationLine from "./PaginationLine";



export default function CustomerTable(props: { className?: string, serverCustomers?: any, limit: number }) {

    const [page, setPage] = useState(0);
    const [clientCustomers, setCustomers] = useState(props.serverCustomers);

    const handleSearch = useCallback(
        debounce(async (e: any) => {
            const search = e.target.value.toLocaleLowerCase('tr');
            const customers = await getCustomersByUserId(0, props.limit, search);
            setCustomers(customers);
        }, 1000),
        [props.limit]
    );

    const handleNext = async () => {
        setPage(page + 1);
        const customers = await getCustomersByUserId(page + 1, props.limit, "");
        setCustomers(customers);
    }

    const handlePrev = async () => {
        setPage(page - 1);
        const customers = await getCustomersByUserId(page - 1, props.limit, "");
        setCustomers(customers);
    }

    console.log
    return (
        <div className={cn("h-full grid grid-rows-12 shadow border rounded-md", `${props.className}`)}>
            <Card className="row-span-11 shadow-none border-none">
                <CardHeader className="px-7">
                    <div className="flex justify-between items-center">
                        <CardTitle>Üye Tablosu</CardTitle>
                        <div className="hidden md:block">
                            <CustomerSearch handleSearch={handleSearch} />
                        </div>
                        <CustomerDialog title="Üye Ekle" />
                    </div>
                    <div className="block md:hidden w-full">
                        <CustomerSearch handleSearch={handleSearch} />
                    </div>
                    <CardDescription className="text-center md:text-left">Salon ve Diyetisyen İş Birliğine ait Üyeleri Buradan Görebilirsin</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">Statü</TableHead>
                                <TableHead className="text-center">Ad Soyad</TableHead>
                                <TableHead className="hidden sm:table-cell text-center">Paket</TableHead>
                                <TableHead className="hidden md:table-cell text-center">Telefon</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="h-full">
                            <CustomerTableRow customerAndInvoiceList={clientCustomers?.data} />
                        </TableBody>
                    </Table>
                </CardContent>
            </Card >
            <PaginationLine className="row-span-1" page={page} limit={props.limit} count={clientCustomers?.count} next={handleNext} prev={handlePrev} />
        </div>

    )
}
