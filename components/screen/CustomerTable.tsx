"use client"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import sessionStore from "@/store/session.store"
import PaginationLine from "./PaginationLine"
import CustomerDialog from "./CustomerDialog"



export default function CustomerTable(props: { className?: string }) {
    const session = sessionStore((state: any) => state.session)

    return (
        <div className={cn("h-full grid grid-rows-12 shadow border rounded-md", `${props.className}`)}>
            <Card className="row-span-11 shadow-none border-none">
                <CardHeader className="px-7">
                    <div className="flex justify-between">
                        <CardTitle>Üye Tablosu</CardTitle>
                        <CustomerDialog title="Üye Ekle" />
                    </div>
                    <CardDescription>Salon ve Diyetisten İş Birliğine ait Üyeleri Buradan Görebilirsin</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Ad Soyad</TableHead>
                                <TableHead className="hidden sm:table-cell">Paket</TableHead>
                                <TableHead className="hidden md:table-cell">Ücret</TableHead>
                                <TableHead className="text-center">Statü</TableHead>
                                {/* <TableHead className="hidden sm:table-cell">Telefon</TableHead>
                            <TableHead className="hidden md:table-cell">Başlangıç</TableHead>
                            <TableHead className="hidden md:table-cell">Bitiş</TableHead>
                            <TableHead className="text-right">Spor Salonu</TableHead> */}
                            </TableRow>
                        </TableHeader>
                        <TableBody className="h-full">
                            <TableRow className="bg-accent">
                                <TableCell>
                                    <div className="font-medium">Liam Johnson</div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">3 Aylık</TableCell>
                                <TableCell className="hidden sm:table-cell">250 ₺</TableCell>
                                <TableCell className="text-center">
                                    <Badge className="text-xs">
                                        Pasif
                                    </Badge>
                                </TableCell>
                            </TableRow>
                            <TableRow className="">
                                <TableCell>
                                    <div className="font-medium">Liam Johnson</div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">3 Aylık</TableCell>
                                <TableCell className="hidden sm:table-cell">250 ₺</TableCell>
                                <TableCell className="text-center">
                                    <Badge className="text-xs">
                                        Pasif
                                    </Badge>
                                </TableCell>
                            </TableRow>
                            <TableRow className="bg-accent">
                                <TableCell>
                                    <div className="font-medium">Liam Johnson</div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">3 Aylık</TableCell>
                                <TableCell className="hidden sm:table-cell">250 ₺</TableCell>
                                <TableCell className="text-center">
                                    <Badge className="text-xs">
                                        Pasif
                                    </Badge>
                                </TableCell>
                            </TableRow>
                            <TableRow className="">
                                <TableCell>
                                    <div className="font-medium">Liam Johnson</div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">3 Aylık</TableCell>
                                <TableCell className="hidden sm:table-cell">250 ₺</TableCell>
                                <TableCell className="text-center">
                                    <Badge className="text-xs">
                                        Pasif
                                    </Badge>
                                </TableCell>
                            </TableRow>
                            <TableRow className="bg-accent">
                                <TableCell>
                                    <div className="font-medium">Liam Johnson</div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">3 Aylık</TableCell>
                                <TableCell className="hidden sm:table-cell">250 ₺</TableCell>
                                <TableCell className="text-center">
                                    <Badge className="text-xs">
                                        Pasif
                                    </Badge>
                                </TableCell>
                            </TableRow>
                            <TableRow className="bg-accent">
                                <TableCell>
                                    <div className="font-medium">Liam Johnson</div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">3 Aylık</TableCell>
                                <TableCell className="hidden sm:table-cell">250 ₺</TableCell>
                                <TableCell className="text-center">
                                    <Badge className="text-xs">
                                        Pasif
                                    </Badge>
                                </TableCell>
                            </TableRow>
                            <TableRow className="bg-accent">
                                <TableCell>
                                    <div className="font-medium">Liam Johnson</div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">3 Aylık</TableCell>
                                <TableCell className="hidden sm:table-cell">250 ₺</TableCell>
                                <TableCell className="text-center">
                                    <Badge className="text-xs">
                                        Pasif
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card >
            <PaginationLine className="row-span-1" />
        </div>

    )
}
