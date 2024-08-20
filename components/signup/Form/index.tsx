'use client';

import Link from 'next/link';
import { InputField, SignupButton } from './components';
import { useHook } from './useHook';

export function SignupForm() {
    const { action, handlePhoneChange, handlePhoneKeyDown } = useHook();

    return (
        <form action={action}>
            <div className="flex flex-col gap-2 relative">
                <InputField id="username" name="username" placeholder="melisa.ozcan" />
                <InputField id="password" type="password" name="password" placeholder="*********" />
                <InputField
                    id="phone"
                    type="text"
                    name="phone"
                    placeholder="(537) 122 12 12"
                    onChange={handlePhoneChange}
                    onKeyDown={handlePhoneKeyDown}
                />
                <SignupButton />
                <div className="absolute bottom-[-4.5rem] right-0 text-center p-2 rounded-md pt-10 cursor-pointer">
                    <Link className="text-md text-white z-10 bg-black rounded-br-md rounded-bl-md p-4" href="login">
                        Giriş Yap
                    </Link>
                </div>
            </div>
        </form>
    );
}
