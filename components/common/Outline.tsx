import React from 'react';

export default function Outline({ children }: { children: React.ReactNode }) {
    return (
        <div className='p-6 md:grid md:grid-rows-12 h-screen'>{children}</div>
    )
}
