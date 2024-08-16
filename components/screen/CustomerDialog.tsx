"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import CustomerForm from "./CustomerForm";
import { getAllUsers } from "@/actions/user.action";
import { useEffect, useState } from "react";


export default function CustomerDialog({ title }: { title: string }) {
    const [userList, setUserList] = useState<any>()
    useEffect(() => {
        const getUserList = async () => {
            const data = await getAllUsers()
            setUserList(data)
        }
        getUserList()
    }, [])
    return (
        <Dialog>
            <DialogTrigger className="bg-black px-4 py-2 text-white rounded-md font-bold">{title}</DialogTrigger>
            <DialogContent className="w-80 rounded-md md:100">
                <DialogHeader>
                    <DialogTitle className="mb-10">{title}</DialogTitle>
                </DialogHeader>
                <CustomerForm userList={userList?.data?.result} />
            </DialogContent>
        </Dialog>

    )
}
