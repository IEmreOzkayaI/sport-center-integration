// @ts-nocheck
'use client';

import { createPackage, deletePackage, getPackagesByUserId } from "@/actions/package.action";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { showToast } from "@/lib/utils";
import { CheckIcon, LoaderIcon, PlusIcon, Trash } from "lucide-react";
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../../ui/button";


export const UserMenu = ({ session }: { session: any }) => {
    return <DropdownMenu>
        <DropdownMenuTrigger className="text-black outline-none">{session?.username}</DropdownMenuTrigger>
        <DropdownMenuContent className="cursor-pointer shadow-none mt-5 text-center">
            <Popover>
                <PackageMenu />
            </Popover>
        </DropdownMenuContent>
    </DropdownMenu>
}


export const PackageMenu = () => {
    const [openPackageForm, setOpenPackageForm] = useState(false);
    const [packages, setPackages] = useState(null);

    return <>
        <PopoverTrigger className="text-center">
            <span className="">Paket</span>
        </PopoverTrigger>
        <PopoverContent className="mt-2 w-96">
            <PlusIcon className="border w-full rounded-md mb-4" onClick={() => setOpenPackageForm(prev => !prev)} />
            {openPackageForm && <PackageForm setPackages={setPackages} packages={packages} />}
            <MenuPackageList packages={packages} setPackages={setPackages} />
        </PopoverContent>
    </>
}


export const PackageForm = ({ setPackages, packages }: { setPackages: any, packages: any }) => {
    const [state, action] = useFormState(createPackage, undefined);
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (state && 'errors' in state && state.errors) {
            const errorKey = Object.keys(state.errors)[0] as keyof typeof state.errors;
            showToast(state.errors[errorKey]?.[0], 'error', false);
        }
        if (state?.data.status === 201) {

            setPrice('');
            const sorted = [...packages, state.data.result].sort((a, b) => a.duration - b.duration);
            setPackages(sorted);
            showToast(state.data.description, 'success', false);
        }
        if (state?.data.status === 400) {
            showToast(state.data.description, 'error', false);
        }
    }, [state]);



    const handlePriceChange = (event: any) => {
        let value = event.target.value.replace(/\D/g, '');
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        setPrice(value);
    };

    return (
        <form action={action} className="space-y-3">
            <div className="w-full py-2 border-b flex gap-2">
                <Select name="duration">
                    <SelectTrigger className="w-3/5 outline-none focus:ring-none focus:outline-none">
                        <SelectValue className="text-xl" placeholder="Paket Seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="1">1 Ay</SelectItem>
                            <SelectItem value="3">3 Ay</SelectItem>
                            <SelectItem value="6">6 Ay</SelectItem>
                            <SelectItem value="9">9 Ay</SelectItem>
                            <SelectItem value="12">12 Ay</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="relative w-3/5">
                    <input type="text" placeholder="Fiyat Giriniz" className="text-sm w-full p-2 border border-gray-300 rounded-md"
                        value={price} onChange={handlePriceChange} id="price" name="price" />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                        ₺
                    </span>
                </div>
                <PackageFormButton />
            </div>
        </form>
    );
};

export const PackageFormButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button aria-disabled={pending} type="submit" className={`w-1/7 ${pending ? 'opacity-80' : ''}`}>
            {pending ? <LoaderIcon size={18} /> : <CheckIcon size={18} />}
        </Button>
    );
}

export const MenuPackageList = ({ packages, setPackages }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchPackages() {
            setLoading(true);
            const packages = await getPackagesByUserId();
            if (!packages) return;
            const sortedPackages = packages.data.result.sort((a, b) => a.duration - b.duration);
            setPackages(sortedPackages);
            setLoading(false);
        }
        fetchPackages();
    }, []);

    const handlePackageDelete = async (id) => {
        const response = await deletePackage(id);
        if (!response) return;

        showToast('Paket başarıyla silindi.', 'success', false);
        const packages = await getPackagesByUserId();
        if (!packages) return;
        setPackages(packages.data.result);
    }

    return (
        <>
            {loading && <div className="text-center w-full"> ... </div>}
            {!loading && packages && packages.length === 0 && <div className="text-center w-full pt-3">Mevcut Paket Yok</div>}
            {packages?.map((item: any) => (
                <span key={item.id} className="flex w-full justify-between p-2 border-b">
                    <span>{item.duration} Ay - {Number(item.price).toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</span>
                    <Trash size={20} className="text-gray-400 hover:text-black cursor-pointer" onClick={() => handlePackageDelete(item.id)} />
                </span>
            ))}
        </>
    );
}
