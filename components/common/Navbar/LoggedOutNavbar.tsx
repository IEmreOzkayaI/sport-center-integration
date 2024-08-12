'use client';

import Image from "next/image";
import Link from "next/link";

export default function LoggedOutNavbar() {
    return <header className="bg-black text-white rounded-t-md mb-4 md:-mb-24 rounded-b-md sm:rounded-b-none row-span-1">
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
