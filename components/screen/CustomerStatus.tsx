"use client";
import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { updateCustomerStatus } from "@/actions/customer.action";
import { showToast } from "@/lib/utils";
import { verifySession } from "@/actions/session.action";
import sessionStore from "@/store/session.store";

export default function CustomerStatus({ customer }: { customer: any }) {
    const [status, setStatus] = useState(customer.customers.status);
    const session = sessionStore((state: any) => state.session);

    const handleStatusChange = async () => {
        if (session?.role !== "admin") return;
        const newStatus =
            status === "pending"
                ? "active"
                : status === "active"
                    ? "inactive"
                    : "pending";
        console.log("newStatus", customer);
        const result = await updateCustomerStatus(customer.customers.id, newStatus);
        if (result) {
            setStatus(newStatus);
            const message = newStatus === "pending" ? "talep" : newStatus === "active" ? "aktif" : "pasif";
            showToast(`Müşteri statüsü güncellendi ${message}`, "success");
        }
    };

    return (
        <Badge className="text-xs" onClick={handleStatusChange}>
            {status === "pending" && "Talep"}
            {status === "active" && "Aktif"}
            {status === "inactive" && "Pasif"}
        </Badge>
    );
}
