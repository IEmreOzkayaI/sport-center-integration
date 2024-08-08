"use client"

import { logout } from '@/lib/auth/auth.action'
import React from 'react'

export default function Logout() {
    const handleLogOut = async () => {
        await logout();
    }
    return (
        <button onClick={handleLogOut} className='hover:font-bold transition cursor-pointer'>
            Çıkış
        </button>
    )
}
