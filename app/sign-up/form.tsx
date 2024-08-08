'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signup } from '@/lib/auth/auth.action';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';

export function SignupForm() {
    const [state, action] = useFormState(signup, undefined);

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
                    <Input id="password" type="password" name="password" placeholder='*********' />
                    {state?.errors?.password && (
                        <p className="text-sm text-red-500">{state.errors.password}</p>
                    )}
                </div>
                <div className="mt-4">
                    <Input id="phone" type="text" name="phone" placeholder='(537) 122 12 12'/>
                    {state?.errors?.phone && (
                        <p className="text-sm text-red-500">{state.errors.phone}</p>
                    )}
                </div>
                {state?.message && (
                    <p className="text-sm text-red-500">{state.message}</p>
                )}
                <SignupButton />
                <div className="absolute bottom-[-4.5rem] right-0 text-center bg-black p-2 rounded-md pt-10 z-[-10]">
                    <Link className="text-md text-white" href="#">
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
