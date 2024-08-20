"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Copy, TrashIcon } from "lucide-react";
import { DetailItem, Section } from "./components";
import { useHook } from "./useHook";
import { formatDate } from "./utils";

export default function CustomerDetail(props: { className?: string }) {
    const { customerDetail, session, handleDelete } = useHook();

    if (!customerDetail?.customers?.id) {
        return (
            <Card className={cn("overflow-hidden", props.className)}>
                <CardHeader className="w-full h-full flex items-center justify-center bg-muted/20">
                    Üye Seçiniz
                </CardHeader>
            </Card>
        );
    }

    const { customers, invoices } = customerDetail;

    return (
        <Card className={cn("overflow-hidden h-full flex flex-col justify-between", props.className)}>
            <div>
                <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                        <CardTitle className="group flex items-center gap-2 text-lg">
                            {customers.fullName}
                            <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <Copy className="h-3 w-3" />
                                <span className="sr-only">Copy Order ID</span>
                            </Button>
                        </CardTitle>
                        <CardDescription>
                            {formatDate(invoices.packageStartDate)} - {formatDate(invoices.packageEndDate)}
                        </CardDescription>
                    </div>
                    {session?.role === "admin" && (
                        <Button size="sm" variant="outline" className="h-8 gap-1 ml-auto" onClick={() => handleDelete(customers.id)}>
                            <TrashIcon className="h-3.5 w-3.5" />
                        </Button>
                    )}
                </CardHeader>
                <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                        <Section title="Üye Detayı">
                            <DetailItem label="Ad Soyad" value={customers.fullName} />
                            <DetailItem label="Telefon" value={customers.phone} />
                            <DetailItem
                                label="Statü"
                                value={
                                    customers.status === "active"
                                        ? "Aktif"
                                        : customers.status === "inactive"
                                            ? "Pasif"
                                            : "Talep"
                                }
                            />
                        </Section>
                        <Separator className="my-2" />
                        <Section title="Paket Detayı">
                            <DetailItem label="Paket Süresi" value={`${invoices.packageName} Ay`} />
                            <DetailItem label="Paket Başlangıç Tarihi" value={formatDate(invoices.packageStartDate)} />
                            <DetailItem label="Paket Bitiş Tarihi" value={formatDate(invoices.packageEndDate)} />
                        </Section>
                        <Separator className="my-4" />
                        <Section title="Kazanç Detayı">
                            <DetailItem label="Spor Salonu" value={invoices.sportCenterName} />
                            {session?.role === "admin" && (
                                <DetailItem label="Diyetisyen Ücreti" value={`${invoices.adminPrice} ₺`} />
                            )}
                            <DetailItem label="Salon Ücreti" value={`${invoices.sportCenterPrice} ₺`} />
                            <DetailItem label="Salon Komisyonu" value={`%${invoices.commissionPercentage}`} />
                            <DetailItem
                                label="Salon Kazancı"
                                value={`${(Number(invoices.sportCenterPrice) * Number(invoices.commissionPercentage)) / 100} ₺`}
                            />
                            {session?.role === "admin" && (
                                <DetailItem
                                    label="Diyetisyen Kazancı"
                                    value={`${Number(invoices.adminPrice) -
                                        (Number(invoices.sportCenterPrice) * Number(invoices.commissionPercentage)) / 100
                                        } ₺`}
                                />
                            )}
                        </Section>
                    </div>
                </CardContent>
            </div>
            <CardFooter className="border-t bg-muted/50 px-6 py-3 flex items-center justify-center text-sm text-muted-foreground">
                Müşteri Detay Kartı
            </CardFooter>
        </Card>
    );
}
