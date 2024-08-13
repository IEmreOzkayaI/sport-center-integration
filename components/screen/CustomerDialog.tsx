"use server"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import CustomerForm from "./CustomerForm";
import { getAllUsers } from "@/actions/user.action";


export default async function CustomerDialog({ title }: { title: string }) {
    const userList = await getAllUsers()
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
