import React from 'react';

export default function Outline({ children }: { children: React.ReactNode }) {
    return (
        <div className='p-6'>{children}</div>
    )
}
