import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"

import UserForm from './CustomerForm'

export default function CustomerDialog({ title }: { title: string }) {
    return (
        <Dialog>
            <DialogTrigger className="bg-black px-4 py-2 text-white rounded-md font-bold">{title}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-10">{title}</DialogTitle>
                </DialogHeader>
                <UserForm />
            </DialogContent>
        </Dialog>

    )
}
