"use client"

import sessionStore from '@/store/session.store';
import React from 'react'

export default function page() {
    const session = sessionStore((state: any) => state.session);
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            sa {session?.name}
        </div>
    )
}
