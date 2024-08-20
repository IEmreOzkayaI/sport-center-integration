"use client";
import { Badge } from "../../ui/badge";
import { useHook } from "./useHook";

export default function CustomerStatus({ customer }: { customer: any }) {
    const { customerStatus, handleStatusChange } = useHook(customer.customers.status, customer.customers.id);

    return (
        <Badge className="text-xs" onClick={handleStatusChange}>
            {customerStatus === "pending" && "Talep"}
            {customerStatus === "active" && "Aktif"}
            {customerStatus === "inactive" && "Pasif"}
        </Badge>
    );
}
