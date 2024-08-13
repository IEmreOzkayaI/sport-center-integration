"use client"

import {
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    DeleteIcon,
    MoreVertical,
    PhoneCall,
    PhoneIcon,
    PhoneOutgoing,
    TrashIcon,
    Truck,
    User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"
import { cn, showToast } from "@/lib/utils"
import customerStore from "@/store/customer.store"
import { custom } from "zod"
import sessionStore from "@/store/session.store"
import { deleteCustomerById } from "@/actions/customer.action"

export default function CustomerDetail(props: { className?: string }) {
    const customerDetail = customerStore((state: any) => state.customer)
    const clearCustomerDetail = customerStore((state: any) => state.clearCustomer)
    const session = sessionStore((state: any) => state.session)
    const handleDelete = async (customerId: string) => {
        const response = await deleteCustomerById(customerId);
        if (response.data.status === 200) {
            clearCustomerDetail()
            showToast(response.data.description, 'success', false)
        }

    }
    return (
        <>
            {customerDetail?.customers?.id && (
                <Card className={cn("overflow-hidden h-full flex flex-col justify-between", props.className)}>
                    <div>
                        <CardHeader className="flex flex-row items-start bg-muted/50">
                            <div className="grid gap-0.5">
                                <CardTitle className="group flex items-center gap-2 text-lg">
                                    {customerDetail.customers.fullName}
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                    >
                                        <Copy className="h-3 w-3" />
                                        <span className="sr-only">Copy Order ID</span>
                                    </Button>
                                </CardTitle>
                                <CardDescription>{" "}
                                    {("0" + new Date(customerDetail.invoices.packageStartDate).getDate()).slice(-2)}.
                                    {("0" + (new Date(customerDetail.invoices.packageStartDate).getMonth() + 1)).slice(-2)}.
                                    {new Date(customerDetail.invoices.packageStartDate).getFullYear()}
                                    {" "}
                                    -
                                    {" "}
                                    {("0" + new Date(customerDetail.invoices.packageEndDate).getDate()).slice(-2)}.
                                    {("0" + (new Date(customerDetail.invoices.packageEndDate).getMonth() + 1)).slice(-2)}.
                                    {new Date(customerDetail.invoices.packageEndDate).getFullYear()}
                                </CardDescription>
                            </div>
                            <div className="ml-auto flex items-center gap-1">
                                <Button size="sm" variant="outline" className="h-8 gap-1">
                                    <TrashIcon className="h-3.5 w-3.5" onClick={() => handleDelete(customerDetail.customers.id)} />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 text-sm">
                            <div className="grid gap-3">
                                <div className="font-semibold">Üye Detayı</div>
                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            Ad Soyad
                                        </span>
                                        {customerDetail.customers.fullName}

                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground flex">
                                            Telefon
                                        </span>
                                        {customerDetail.customers.phone}
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground flex">
                                            Statü
                                        </span>
                                        {customerDetail.customers.status === 'active' && 'Aktif'}
                                        {customerDetail.customers.status === 'inactive' && 'Pasif'}
                                        {customerDetail.customers.status === 'pending' && 'Talep'}

                                    </li>
                                </ul>
                                <Separator className="my-2" />
                                <div className="font-semibold">Paket Detayı</div>
                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Paket Süresi</span>
                                        <span>{customerDetail.invoices.packageName} Ay</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Paket Başlangıç Tarihi</span>
                                        <span>
                                            {("0" + new Date(customerDetail.invoices.packageStartDate).getDate()).slice(-2)}.
                                            {("0" + (new Date(customerDetail.invoices.packageStartDate).getMonth() + 1)).slice(-2)}.
                                            {new Date(customerDetail.invoices.packageStartDate).getFullYear()}
                                        </span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Paket Bitiş Tarihi</span>
                                        <span>
                                            {("0" + new Date(customerDetail.invoices.packageEndDate).getDate()).slice(-2)}.
                                            {("0" + (new Date(customerDetail.invoices.packageEndDate).getMonth() + 1)).slice(-2)}.
                                            {new Date(customerDetail.invoices.packageEndDate).getFullYear()}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <Separator className="my-4" />
                            <div className="font-semibold">Kazanç Detayı</div>
                            <ul className="grid gap-3 mt-2">
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Spor Salonu</span>
                                    <span>{customerDetail.invoices.sportCenterName}</span>
                                </li>
                                {session?.role === 'admin' && (
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Diyetisyen Ücreti</span>
                                        <span>{customerDetail.invoices.adminPrice} ₺</span>
                                    </li>
                                )}
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Salon Ücreti</span>
                                    <span>{customerDetail.invoices.sportCenterPrice} ₺</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Salon Komisyonu</span>
                                    <span>%{customerDetail.invoices.commissionPercentage} </span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Salon Kazancı</span>
                                    <span>{(Number(customerDetail.invoices.sportCenterPrice) * Number(customerDetail.invoices.commissionPercentage)) / 100} ₺</span>
                                </li>
                                {session?.role === 'admin' && (
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Diyetisyen Kazancı</span>
                                        <span>{Number(customerDetail.invoices.adminPrice) - (Number(customerDetail.invoices.sportCenterPrice) * Number(customerDetail.invoices.commissionPercentage)) / 100} ₺</span>
                                    </li>
                                )}

                            </ul>
                        </CardContent>
                    </div>
                    <CardFooter className="border-t bg-muted/50 px-6 py-3 flex items-center justify-center text-sm text-muted-foreground">
                        Müşteri Detay Kartı
                    </CardFooter>
                </Card>)}
            {!customerDetail?.customers?.id && (
                <Card className={cn("overflow-hidden", props.className)}>
                    <CardHeader className="w-full h-full flex items-center justify-center bg-muted/20">
                        Üye Seçiniz
                    </CardHeader>
                </Card>
            )}
        </>

    )
}
