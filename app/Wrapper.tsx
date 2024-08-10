import { verifySession } from '@/actions/session.action';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Wrapper({ children }: { children: React.ReactNode }) {
    const session = await verifySession();
    if (!session) redirect('/log-in');

    return (
        <>{children}</>
    )
}
