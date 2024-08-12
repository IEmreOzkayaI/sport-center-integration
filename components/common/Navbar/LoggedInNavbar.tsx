'use client';

import { DoorOpen } from "lucide-react";
import Image from "next/image";
import { UserMenu } from "./SubComponents";


export default function LoggedInNavbar({ session, handleLogout }: { session: any, handleLogout: any }) {
    return <header className="border text-white rounded-md mb-4 row-span-1">
        <div className="px-16 mx-auto flex justify-between items-center py-3">
            <Image src='/logo.png' alt='logo' width={36} height={36} className='rounded-md' />
            <UserMenu session={session} />
            <nav className="flex items-center justify-center">
                <span onClick={handleLogout} className="text-black bg-white rounded-sm px-2 py-1 text-md cursor-pointer">
                    <DoorOpen size={26} />
                </span>
            </nav>
        </div>
    </header>
}
