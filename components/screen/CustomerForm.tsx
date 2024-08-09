import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn, showToast } from '@/lib/utils';
import { createCustomer } from '@/actions/customer.action';
import { useFormState, useFormStatus } from 'react-dom';
import { getAllUsers } from '@/actions/user.action';

export default function CustomerForm({ className }: { className?: string }) {
    const [state, action] = useFormState(createCustomer, undefined);
    const data = getAllUsers();
    useEffect(() => {
        if (state?.errors) {
            showToast(state.errors[Object.keys(state.errors)[0]][0], 'error')
        }
    }, [state?.errors])

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
            <div>
                <Input id="package_" name="package_" placeholder="Paket Ay Bilgisi 1-12" onChange={handlePackageChange} />
            </div>
            <div>
                <select id="userId" name="userId" className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="">Kullanıcı Seçiniz</option>
                    <option value="1">Kullanıcı 1</option>
                    <option value="2">Kullanıcı 2</option>
                    <option value="3">Kullanıcı 3</option>
                </select>
            </div>
            <CreateCustomerButton />
        </form>
    );
}

export function CreateCustomerButton() {
    const { pending } = useFormStatus();

    return (
        <Button aria-disabled={pending} type="submit" className={`mt-4 w-full ${pending ? 'opacity-80' : ''}`}>
            {pending ? 'Ekle...' : 'Ekle'}
        </Button>
    );
}
