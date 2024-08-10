import { z } from 'zod';

export const SignupFormSchema = z.object({
    username: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
    password: z.string().min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, { message: 'Contain at least one special character.', }).trim(),
    phone: z.string().min(10, { message: 'Phone number must be at least 10 characters long.' }),
});

export const LoginFormSchema = z.object({
    username: z.string().min(1, { message: 'Username field must not be empty.' }),
    password: z.string().min(1, { message: 'Password field must not be empty.' }),
});

export type FormState =
    | {
        errors?: {
            username: string[],
            password: string[],
            phone: string[],
        };
        message?: string;
    }
    | undefined;

export type SessionPayload = {
    id: string | number;
    username: string;
    role: string;
};

export type User = {
    id: string;
    username: string;
    role: string;
    status: string;
    phone: string;
};


export type CreateCustomerFormState = | {
    errors?: {
        fullName: string[],
        phone: string[],
        package_: string[],
        userId: string[],
    };
    message?: string;
} | undefined;


export const CreateCustomerFormSchema = z.object({
    fullName: z.string().min(1, "Ad soyad giriniz!").regex(/^[a-zA-Z\s]*$/, "Ad soyad sadece harf içerebilir!"),
    phone: z.string().min(1, "Telefon numarası giriniz!").regex(/^\(\d{3}\) \d{3} \d{4}$/, "Telefon numarası sadece rakam içerebilir!"),
    package_: z.enum(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
    userId: z.string().min(1, "Kullanıcı Seçiniz"),
})
