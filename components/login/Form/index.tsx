'use client';

import Link from 'next/link';
import { InputField, LoginButton } from './components';
import { useHook } from './useHook';

export function LoginForm() {
    const { action } = useHook();

    return (
        <form action={action}>
            <div className="flex flex-col gap-2 relative">
                <InputField id="username" name="username" placeholder="kullanıcı adı" />
                <InputField id="password" type="password" name="password" placeholder="şifre" />
                <LoginButton />
                <div className="absolute bottom-[-4.5rem] right-0 text-center p-2 rounded-md pt-10 cursor-pointer">
                    <Link className="text-md text-white z-10 bg-black rounded-br-md rounded-bl-md p-4" href="signup">
                        Kayıt Ol
                    </Link>
                </div>
            </div>
        </form>
    );
}
