'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login } from '@/lib/auth/auth.action';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';

export function LoginForm() {
    const [state, action] = useFormState(login, undefined);

    return (
        <form action={action}>
            <div className="flex flex-col gap-2 relative">
                <div>
                    <Input
                        id="username"
                        name="username"
                        placeholder="melisa.ozcan"
                    />
                    {state?.errors?.username && (
                        <p className="text-sm text-red-500">{state.errors.username}</p>
                    )}
                </div>
                <div className="mt-4">
                    <Input id="password" type="password" name="password" />
                    {state?.errors?.password && (
                        <p className="text-sm text-red-500">{state.errors.password}</p>
                    )}
                </div>
                {state?.message && (
                    <p className="text-sm text-red-500">{state.message}</p>
                )}
                <LoginButton />
                <div className="absolute bottom-[-4.5rem] right-0 text-center bg-black p-2 rounded-md pt-10 z-[-10]">
                    <Link className="text-md text-white" href="#">
                        Şifremi Unuttum
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
            {pending ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
        </Button>
    );
}
