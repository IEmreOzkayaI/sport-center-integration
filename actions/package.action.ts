"use server"

import { Response } from "@/definitions";
import db from "@/lib/db";
import { packages, users } from "@/lib/drizzle/schema";
import { and, asc, desc, eq, isNotNull, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { verifySession } from "./session.action";
import { z } from "zod";

const PackageFormSchema = z.object({
    price: z.string(),
    duration: z.string(),
});

export type PackageFormState =
    | {
        errors?: {
            price: string[],
            duration: string[],
        };
        message?: string;
    }
    | undefined;


export async function createPackage(state: PackageFormState, formData: FormData): Promise<Response | null> {
    const session = await verifySession();
    if (!session) return null;

    const validatedFields = PackageFormSchema.safeParse({
        price: formData.get('price'),
        duration: formData.get('duration'),
    });

    if (!validatedFields.success) {
        return {
            data: {
                status: 400,
                description: "Lütfen tüm alanları doldurun.",
                result: {
                    errors: validatedFields.error.flatten().fieldErrors as PackageFormState,
                },
            }
        };
    }


    const { price, duration } = validatedFields.data;

    try {
        const packageAlreadyExists = await db.select().from(packages).where(
            and(
                eq(packages.userId, session.id),
                eq(packages.duration, duration),
                isNull(packages.deletedAt)
            )).execute();

            if (packageAlreadyExists.length > 0) {
                return {
                    data: {
                        status: 400,
                        description: "Bu paket için zaten bir fiyat girilmiş.",
                        result: null,
                    }
                };
            }
    } catch (e) {
        console.log('Failed to check if package already exists', e);
        return ;
     }

    try {
        const packageData = await db.insert(packages).values({
            price: price.replace('.', ''),
            duration,
            userId: session.id,
        }).returning({ userId: users.id, price: packages.price, duration: packages.duration, id: packages.id });

        const package_ = packageData[0];

        if (!package_) return {
            data: { status: 500, description: "Paket oluşturulurken bir hata oluştu.", result: null }
        };
        revalidatePath('/dashboard');
        return { data: { status: 201, description: "Paket başarıyla oluşturuldu.", result: package_ } };
    } catch (error) {
        console.log('Failed to create package', error);
        return null;
    }
}

export async function getPackagesByUserId(): Promise<Response | null> {
    const session = await verifySession();
    if (!session) return null;

    try {
        const response = await db
            .select()
            .from(packages)
            .where(
                and(
                    eq(packages.userId, session.id as string),
                    isNull(packages.deletedAt)
                )
            );

        console.log(response);

        return { data: { status: 200, description: "Paketler başarıyla getirildi.", result: response } };
    } catch (error) {
        console.log('Failed to fetch packages', error);
        return null;
    }
}

export async function deletePackage(id: string): Promise<Response | null> {
    const session = await verifySession();
    if (!session) return null;

    try {
        const deletedPackage = await db
            .update(packages)
            .set({ deletedAt: new Date() })
            .where(
                and(
                    eq(packages.id, id),
                    eq(packages.userId, session.id as string)
                )
            );

        return { data: { status: 200, description: "Paket başarıyla silindi.", result: deletedPackage } };
    } catch (error) {
        console.log('Failed to delete package', error);
        return null;
    }
}
