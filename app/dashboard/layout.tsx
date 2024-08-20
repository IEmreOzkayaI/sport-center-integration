import React from 'react'

export default function layout({ children, detail, statistic, table }: { children: React.ReactNode, detail: React.ReactNode, statistic: React.ReactNode, table: React.ReactNode }) {
    return (
        <main className="
        flex flex-col
        sm:flex sm:flex-col
        md:row-span-11 gap-y-6
        ">
            <div className="
        flex gap-4 flex-wrap justify-between items-center max-h-full
        sm:flex sm:gap-1 sm:flex-wrap sm:justify-evenly sm:items-center sm:my-auto sm:row-span-1
        md:flex md:gap-10 md:flex-nowrap md:justify-evenly md:items-center md:my-auto md:row-span-1
        ">
                {statistic}
            </div>

            <div className="
        flex flex-col gap-4 h-full
        sm:flex sm:flex-col sm:gap-4
        md:row-span-10 md:flex md:flex-row md:gap-10
        ">
                {table}
                {detail}
                {children}
            </div>
        </main>
    )
}
