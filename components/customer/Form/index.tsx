"use client";

import { cn } from "@/lib/utils";
import { CreateCustomerButton, InputField, PackageSelect, UserSelect } from "./components";
import { useHook } from "./useHook";
import { formatPhoneNumber } from "./utils";

export default function CustomerForm({ className, userList }: { className?: string; userList: any }) {
    const { state, action, session } = useHook();

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatPhoneNumber(e.target.value);
        e.target.value = formattedValue;
    };

    const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            const value = e.currentTarget.value.replace(/[^0-9]/g, "");
            e.currentTarget.value = value.slice(0, -1);
        }
    };

    return (
        <form action={action} className={cn("space-y-3", className)}>
            <InputField id="fullName" name="fullName" placeholder="Ad Soyad" />
            <InputField
                id="phone"
                type="text"
                name="phone"
                placeholder="(537) 122 12 12"
                onChange={handlePhoneChange}
                onKeyDown={handlePhoneKeyDown}
            />
            <PackageSelect />
            {session?.role === "admin" && <UserSelect userList={userList} />}
            {session?.role === "sport_center" && <input type="hidden" name="userId" value={session.id} />}
            <CreateCustomerButton />
        </form>
    );
}
