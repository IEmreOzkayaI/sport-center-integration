import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn, showToast } from '@/lib/utils'

const formSchema = z.object({
    fullName: z.string().min(1, "Ad soyad giriniz!").regex(/^[a-zA-Z\s]*$/, "Ad soyad sadece harf içerebilir!"),
    phone: z.string().min(1, "Telefon numarası giriniz!").regex(/^[0-9]*$/, "Telefon numarası sadece rakam içerebilir!"),
    package: z.string().min(1, "Paket bilgisi giriniz!").regex(/^[0-9]*$/, "Paket bilgisi sadece rakam içerebilir! (1-12)"),
})


export default function UserForm({ className }: { className?: string }) {

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            phone: "",
            package: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
    }

    useEffect(() => {
        if (Object.keys(form.formState.errors).length > 0) {
            showToast(form.formState.errors[Object.keys(form.formState.errors)[0]]?.message, 'error')
        }
    }, [form.formState.errors])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-3', className)}>
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Ad Soyad" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Telefon"
                                    {...field}
                                    value={field.value}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                                        if (value.length > 3) {
                                            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)} ${value.slice(6)}`;
                                        } else if (value.length === 3) {
                                            value = `(${value}) `;
                                        }
                                        field.onChange(value);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Backspace') {
                                            e.preventDefault();
                                            const value = field.value.replace(/[^0-9]/g, '');
                                            field.onChange(value.slice(0, -1));
                                        }
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="package"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Paket Ay Bilgisi 1-12"
                                    {...field}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
                                        field.onChange(value);
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit">Ekle</Button>
            </form>
        </Form>
    )
}
