'use client';

import { logout } from "@/lib/auth/auth.action";
import sessionStore from "@/store/session.store";
import { usePathname } from "next/navigation";
import { useEffect } from 'react';

export default function NavbarClient({ session }: { session: any }) {
    const pathname = usePathname();
    const setSession = sessionStore((state: any) => state.setSession);
    const clearSession = sessionStore((state: any) => state.clearSession);

    useEffect(() => {
        if (session) setSession(session);
    }, [session]);

    if (pathname.includes('log-in') || pathname.includes('sign-up') || pathname.includes('reset-password')) {
        return null; // URL "log-in" içeriyorsa navigation bar'ı göstermeyin
    }

    if (!session) {
        return null; // Kullanıcı oturumu yoksa navigation bar'ı göstermeyin veya yönlendirin
    }

    const handleLogout = async () => {
        clearSession();
        await logout();
    }

    return <nav className="w-full bg-black py-3 px-4 text-white flex justify-between items-center">
        <span>{session.name}</span>
        <button onClick={handleLogout}>Çıkış</button>
    </nav>
}
