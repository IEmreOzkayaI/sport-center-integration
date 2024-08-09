'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signup } from '@/actions/auth.action';
import { showToast } from '@/lib/utils';
import Link from 'next/link';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

export function SignupForm() {
    const [state, action] = useFormState(signup, undefined);

    useEffect(() => {
        if (state?.errors) {
            showToast(state.errors[Object.keys(state.errors)[0]][0], 'error')
        }
    }, [state?.errors])

    const formatPhoneNumber = (value: string) => {
        let formattedValue = value.replace(/[^0-9]/g, '').slice(0, 10)
        if (formattedValue.length > 3) {
            formattedValue = `(${formattedValue.slice(0, 3)}) ${formattedValue.slice(3, 6)} ${formattedValue.slice(6)}`
        } else if (formattedValue.length === 3) {
            formattedValue = `(${formattedValue}) `
        }
        return formattedValue
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatPhoneNumber(e.target.value)
        e.target.value = formattedValue;
    }

    const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            e.preventDefault()
            const value = e.currentTarget.value.replace(/[^0-9]/g, '')
            e.currentTarget.value = value.slice(0, -1);
        }
    }

    return (
        <form action={action}>
            <div className="flex flex-col gap-2 relative">
                <div>
                    <Input id="username" name="username" placeholder="melisa.ozcan" />
                </div>
                <div className="mt-4">
                    <Input id="password" type="password" name="password" placeholder='*********' />
                </div>
                <div className="mt-4">
                    <Input
                        id="phone"
                        type="text"
                        name="phone"
                        placeholder='(537) 122 12 12'
                        onChange={handlePhoneChange}
                        onKeyDown={handlePhoneKeyDown}
                    />
                </div>
                <SignupButton />
                <div className="absolute bottom-[-4.5rem] right-0 text-center p-2 rounded-md pt-10 cursor-pointer ">
                    <Link className="text-md text-white z-10 bg-black rounded-br-md rounded-bl-md p-4" href="login">
                        Giriş Yap
                    </Link>
                </div>
            </div>
        </form>
    );
}

export function SignupButton() {
    const { pending } = useFormStatus();

    return (
        <Button aria-disabled={pending} type="submit" className={`mt-4 w-full ${pending ? 'opacity-80' : ''}`}>
            {pending ? 'Kayıt Ol...' : 'Kayıt Ol'}
        </Button>
    );
}
