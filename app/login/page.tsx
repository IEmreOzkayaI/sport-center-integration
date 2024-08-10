import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';
import { LoginForm } from './form';
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <Link href="/home" className="absolute top-0 left-0 p-4 bg-black text-white m-3 rounded-md">
                <ArrowLeftIcon />
            </Link>
            <Card className="mx-auto max-w-sm">
                <CardHeader className='className="text-center flex flex-col items-center justify-center"'>
                    <Image src="/logo.png" alt='logo' width={70} height={70} className='p-1 mb-4' />
                    <CardTitle className="text-md font-bold w-full text-center" >
                        Giriş
                    </CardTitle>
                    <CardDescription>
                        Devam etmek için lütfen bilgilerinizi giriniz.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>

    );
}
