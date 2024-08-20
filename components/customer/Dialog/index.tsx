"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useHook } from "./useHook";
import CustomerForm from "../Form";

export default function CustomerDialog({ title }: { title: string }) {
    const userList = useHook();

    return (
        <Dialog>
            <DialogTrigger className="bg-black px-4 py-2 text-white rounded-md font-bold">
                {title}
            </DialogTrigger>
            <DialogContent className="w-80 rounded-md md:w-100">
                <DialogHeader>
                    <DialogTitle className="mb-10">{title}</DialogTitle>
                </DialogHeader>
                <CustomerForm userList={userList?.data?.result} />
            </DialogContent>
        </Dialog>
    );
}
