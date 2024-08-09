'use server';

import { CreateCustomerFormSchema, CreateCustomerFormState } from "@/definitions";
import db from "@/lib/db";
import { customers, packageEnum } from "@/lib/drizzle/schema";

export async function createCustomer(state: CreateCustomerFormState, formData: FormData): Promise<any> {

    // 1. Validate form fields
    const validatedFields = CreateCustomerFormSchema.safeParse({
        fullName: formData.get('fullName'),
        phone: formData.get('phone'),
        package_: formData.get('package_'),
        userId: formData.get('userId'),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors as CreateCustomerFormState };
    }

    // 2. Prepare data for insertion into database
    const { fullName, phone, package_, userId } = validatedFields.data;
    // 3. Insert the new customer into the database
    const data = await db.insert(customers).values({
        fullName,
        phone,
        package: package_,
        userId,
    }).returning({ id: customers.id });

    const customer = data[0];

    if (!customer) return { message: "Müşteri oluşturulurken bir hata oluştu." };

    return { message: "başarılı" };
}
