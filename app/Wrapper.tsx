import { getSession } from '@/lib/auth/session.auth';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Wrapper({ children }: { children: React.ReactNode }) {
    const session = await getSession();
    if (!session) redirect('/log-in');

    return (
        <>{children}</>
    )
}
