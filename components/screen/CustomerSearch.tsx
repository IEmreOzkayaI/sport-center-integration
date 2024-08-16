"use client"

import React from 'react'
import { Input } from '../ui/input'
import { getCustomersByUserId } from '@/actions/customer.action'
import { SearchIcon } from 'lucide-react'
import { revalidatePath } from 'next/cache'

export default function CustomerSearch({ handleSearch }: { handleSearch: (e: any) => void }) {

    return (
        <div className="w-full relative">
            <Input id="username" name="username" placeholder="Statü , Üye , Salon" onChange={(e) => handleSearch(e)} className='border-l-0 border-r-0 my-4 md:my-0' />
            <SearchIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 size-4" />
        </div>
    )
}
