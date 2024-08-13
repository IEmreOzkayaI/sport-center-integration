'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login } from '@/actions/auth.action';
import { showToast } from '@/lib/utils';
import Link from 'next/link';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

export function LoginForm() {
    const [state, action] = useFormState(login, undefined);

    useEffect(() => {
        if (state && 'errors' in state && state.errors) {
            const errorKey = Object.keys(state.errors)[0] as keyof typeof state.errors;
            showToast(state.errors[errorKey]?.[0], 'error');
        }
    }, [state]);

    if (state?.data) {
        if (state.data.status === 201) {
            showToast(state.data.description, 'success', true)
        }
        if (state.data.status === 400) {
            showToast(state.data.description, 'error', false)
        }
    }



    return (
        <form action={action}>
            <div className="flex flex-col gap-2 relative">
                <div>
                    <Input id="username" name="username" placeholder="melisa.ozcan" />
                </div>
                <div className="mt-4">
                    <Input id="password" type="password" name="password" />
                </div>
                <LoginButton />
                <div className="absolute bottom-[-4.5rem] right-0 text-center p-2 rounded-md pt-10 cursor-pointer ">
                    <Link className="text-md text-white z-10 bg-black rounded-br-md rounded-bl-md p-4" href="signup">
                        Kayıt Ol
                    </Link>
                </div>
            </div>
        </form>
    );
}

export function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button aria-disabled={pending} type="submit" className={`mt-4 w-full ${pending ? 'opacity-80' : ''}`}>
            {pending ? 'Giriş Yap...' : 'Giriş Yap'}
        </Button>
    );
}
