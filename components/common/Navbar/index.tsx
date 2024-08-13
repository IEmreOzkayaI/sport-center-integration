'use client';

import { logout } from "@/actions/auth.action";
import sessionStore from "@/store/session.store";
import { usePathname } from "next/navigation";
import { useEffect } from 'react';
import LoggedInNavbar from "./LoggedInNavbar";
import LoggedOutNavbar from "./LoggedOutNavbar";


export default function Navbar({ session }: { session: any }) {
    const pathname = usePathname();
    const setSession = sessionStore((state: any) => state.setSession);
    const clearSession = sessionStore((state: any) => state.clearSession);

    useEffect(() => {
        if (session) setSession(session);
    }, [session]);

    if (pathname.includes('login') || pathname.includes('signup') || pathname.includes('reset-password')) {
        return null;
    }

    const handleLogout = async () => {
        await logout();
        clearSession();
    }

    if (!session) return <LoggedOutNavbar />


    return <LoggedInNavbar session={session} handleLogout={handleLogout} />
}
