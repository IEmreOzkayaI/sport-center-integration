
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useFormStatus } from "react-dom";

export function InputField({ id, name, placeholder, type = "text", onChange, onKeyDown }: any) {
    return (
        <div>
            <Input id={id} name={name} type={type} placeholder={placeholder} onChange={onChange} onKeyDown={onKeyDown} />
        </div>
    );
}

export function PackageSelect() {
    return (
        <Select name="package_">
            <SelectTrigger className="w-full outline-none focus:ring-none focus:outline-none">
                <SelectValue className="text-xl" placeholder="Paket Seçiniz" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="1">1 Ay</SelectItem>
                    <SelectItem value="3">3 Ay</SelectItem>
                    <SelectItem value="6">6 Ay</SelectItem>
                    <SelectItem value="9">9 Ay</SelectItem>
                    <SelectItem value="12">12 Ay</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export function UserSelect({ userList }: { userList: any }) {
    return (
        <div>
            <Select name="userId">
                <SelectTrigger className="w-full outline-none focus:ring-none focus:outline-none">
                    <SelectValue className="text-xl" placeholder="Salon Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {userList.map((user: any) => (
                            <SelectItem key={user.id} value={user.id}>
                                {user.username}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

export function CreateCustomerButton() {
    const { pending } = useFormStatus();

    return (
        <Button aria-disabled={pending} type="submit" className={`mt-4 w-full ${pending ? "opacity-80" : ""}`}>
            {pending ? "Ekle..." : "Ekle"}
        </Button>
    );
}
