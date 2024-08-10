'use server';

import { CreateCustomerFormSchema, CreateCustomerFormState } from "@/definitions";
import db from "@/lib/db";
import { customers, packageEnum } from "@/lib/drizzle/schema";
import { verifySession } from "./session.action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { gt, lt, and } from "drizzle-orm";

export async function createCustomer(state: CreateCustomerFormState, formData: FormData): Promise<any> {

    const session = await verifySession();
    if (!session) return null;
    // 1. Validate form fields
    const validatedFields = CreateCustomerFormSchema.safeParse({
        fullName: formData.get('fullName'),
        phone: formData.get('phone'),
        package_: formData.get('package_'),
        userId: formData.get('userId'),
    });

    console.log(formData.get('userId'));

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors as CreateCustomerFormState };
    }


    // 2. Prepare data for insertion into database
    const { fullName, phone, package_, userId } = validatedFields.data;
    // 3. Insert the new customer into the database
    let data = await db.insert(customers).values({
        fullName,
        phone,
        package: package_,
        userId,
    }).returning({ id: customers.id });

    const customer = data[0];

    if (!customer) return { message: "Müşteri oluşturulurken bir hata oluştu." };
    revalidatePath('/');
    return { data: { status: 200, description: "Müşteri başarıyla oluşturuldu.", result: customer } }

}


export async function getCustomersByUserId(): Promise<any[] | null> {
    const session = await verifySession();
    if (!session) {
        console.log('No session found');
        return null;
    }

    try {
        if (session.role === 'admin') {
            const data = await db.select().from(customers);
            return data;
        } else {
            const data = await db.select().from(customers).where(eq(customers.userId, session.id));
            return data;
        }
    } catch (error) {
        console.error('Failed to fetch customers:', error);
        return null;
    }
}


export async function updateCustomerStatus(customerId: string, status: string): Promise<UpdateResult | null> {
    const session = await verifySession();
    if (!session) {
        console.log('No session found');
        return null;
    }

    try {
        const data = await db
            .update(customers)
            .set({ status })
            .where(
                and(
                    eq(customers.id, customerId),
                    eq(customers.userId, session.id)
                )
            );

        if (data.affectedRows === 0) {
            console.warn('No rows were updated, check if the customer ID and session are correct');
            return null;
        }

        return data;
    } catch (error) {
        console.error('Failed to update customer status:', error);
        return null;
    }
}
