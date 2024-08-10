'use client';

import { logout } from "@/actions/auth.action";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import sessionStore from "@/store/session.store";
import { DoorOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from 'react';

export default function Navbar({ session }: { session: any }) {
    const pathname = usePathname();
    const setSession = sessionStore((state: any) => state.setSession);
    const clearSession = sessionStore((state: any) => state.clearSession);

    useEffect(() => {
        if (session) setSession(session);
    }, [session]);

    if (pathname.includes('login') || pathname.includes('signup') || pathname.includes('reset-password')) {
        return null; // URL "log-in" içeriyorsa navigation bar'ı göstermeyin
    }
    if (!session) {
        return <header className="bg-black text-white rounded-t-md mb-4 md:-mb-24 rounded-b-md sm:rounded-b-none">
            <div className="px-6 sm:px-16 mx-auto flex justify-between items-center py-6">
                <Image src='/logo.png' alt='logo' width={40} height={40} className='rounded-md' />
                <nav className="flex items-center justify-center">
                    <ul className="flex md:space-x-6 items-center justify-center">
                        <li><Link href="/signup" className="hover:underline">Kayıt Ol</Link></li>
                        <li>
                            <Link href="/login" className="ml-5 sm:ml-0 bg-white text-black px-4 py-2 rounded-full">Giriş Yap</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    }

    const handleLogout = async () => {
        clearSession();
        await logout();
    }

    return <header className="border text-white rounded-md mb-4 md:-mb-24">
        <div className="px-16 mx-auto flex justify-between items-center py-3">
            <Image src='/logo.png' alt='logo' width={36} height={36} className='rounded-md' />
            <DropdownMenu>
                <DropdownMenuTrigger className="text-black outline-none">{session?.username}</DropdownMenuTrigger>
                <DropdownMenuContent className="cursor-pointer shadow-none mt-5 text-center">Paket</DropdownMenuContent>
            </DropdownMenu>
            <nav className="flex items-center justify-center">
                <span onClick={handleLogout} className="text-black bg-white rounded-sm px-2 py-1 text-md cursor-pointer">
                    <DoorOpen size={26} />
                </span>
            </nav>
        </div>
    </header>
}
