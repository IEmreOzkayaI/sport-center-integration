"use client"

import { useEffect } from 'react';

import { createCustomer } from '@/actions/customer.action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn, showToast } from '@/lib/utils';
import sessionStore from '@/store/session.store';
import { useFormState, useFormStatus } from 'react-dom';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

export default function CustomerForm({ className, userList }: { className?: string, userList: any }) {
    const [state, action] = useFormState(createCustomer, undefined);
    const session = sessionStore((state: any) => state.session);

    useEffect(() => {
        if (state?.errors) {
            showToast(state.errors[Object.keys(state.errors)[0]][0], 'error')
        }
    }, [state?.errors])

    if (state?.data) {
        showToast(state.data.description, 'success', true)
    }

    const formatPhoneNumber = (value: string) => {
        let formattedValue = value.replace(/[^0-9]/g, '').slice(0, 10);
        if (formattedValue.length > 3) {
            formattedValue = `(${formattedValue.slice(0, 3)}) ${formattedValue.slice(3, 6)} ${formattedValue.slice(6)}`;
        } else if (formattedValue.length === 3) {
            formattedValue = `(${formattedValue}) `;
        }
        return formattedValue;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatPhoneNumber(e.target.value);
        e.target.value = formattedValue;
    };

    const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            const value = e.currentTarget.value.replace(/[^0-9]/g, '');
            e.currentTarget.value = value.slice(0, -1);
        }
    };

    const handlePackageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
    };

    return (
        <form action={action} className={cn('space-y-3', className)}>
            <div>
                <Input id="fullName" name="fullName" placeholder="Ad Soyad" />
            </div>
            <div className="mt-4">
                <Input id="phone" type="text" name="phone" placeholder="(537) 122 12 12"
                    onChange={handlePhoneChange} onKeyDown={handlePhoneKeyDown} />
            </div>
            {/* <div>
                <Input id="package_" name="package_" placeholder="Paket Ay Bilgisi 1-12" onChange={handlePackageChange} />
            </div> */}
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
            {session?.role === 'admin' && <UserSelect userList={userList} userId={session.id} />}
            {session?.role === 'sport_center' && <input type="hidden" name="userId" value={session.id} />}
            <CreateCustomerButton />
        </form>
    );
}

export function CreateCustomerButton() {
    const { pending, data } = useFormStatus();
    return (
        <Button aria-disabled={pending} type="submit" className={`mt-4 w-full ${pending ? 'opacity-80' : ''}`}>
            {pending ? 'Ekle...' : 'Ekle'}
        </Button>
    );
}


const UserSelect = ({ userList, userId }: { userList: any, userId: any }) => {
    return <div>
        {/* <select id="userId" name="userId" className="w-full p-2 border border-gray-300 rounded-md">
            <option value="">Kullanıcı Seçiniz</option>
            {userList.map((user: any) => (
                <option key={user.id} value={user.id}>{user.username}</option>
            ))}
        </select> */}
        <Select name="userId">
            <SelectTrigger className="w-full outline-none focus:ring-none focus:outline-none">
                <SelectValue className="text-xl" placeholder="Salon Seçiniz" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {userList.map((user: any) => (
                        <SelectItem key={user.id} value={user.id}>{user.username}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
}
