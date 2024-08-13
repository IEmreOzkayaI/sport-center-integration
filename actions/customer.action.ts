// @ts-nocheck
'use server';

import {
    CreateCustomerFormSchema, CreateCustomerFormState
} from "@/definitions";
import db from "@/lib/db";
import { customers, invoices, packages, users } from "@/lib/drizzle/schema";
import { and, eq, isNull, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { verifySession } from "./session.action";

const COMMISSION_PERCENTAGE = "10";

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

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors as CreateCustomerFormState };
    }

    // 2. Prepare data for insertion into database
    const { fullName, phone, package_, userId } = validatedFields.data;

    // Check if the package exist
    const packageData = await db.select().from(packages).where(and(eq(packages.duration, package_), eq(packages.userId, userId), isNull(packages.deletedAt))).execute();


    if (!packageData[0]) {
        return { data: { status: 400, description: "Paket bulunamadı.", result: null } }
    };

    // Check if the customer already exists
    const customerData = await db.select().from(customers).where(and(eq(customers.phone, phone), isNull(customers.deletedAt))).execute();

    if (customerData[0]) return {
        data: { status: 400, description: "Bu telefon numarasıyla müşteri zaten mevcut.", result: null }
    };

    // Take admin packages
    const adminPackages = await db.select().from(packages).fullJoin(users, eq(packages.userId, users.id)).where(and(eq(users.role, 'admin'), isNull(packages.deletedAt))).execute();

    if (!adminPackages[0]) return { data: { status: 400, description: "Admin paketleri bulunamadı.", result: null } };

    const selectedPackage = adminPackages.find((p: any) => p.packages.duration === package_);

    // 3. Insert the new customer into the database
    let data = await db.insert(customers).values({
        fullName,
        phone,
        userId,
    }).returning({ id: customers.id });

    // Create invoice
    const invoiceData = await db.insert(invoices).values({
        customerId: data[0].id,
        packageName: packageData[0].duration,
        packageStartDate: new Date(),
        packageEndDate: new Date(new Date().getFullYear(), Number(new Date().getMonth() + Number(packageData[0].duration)), new Date().getDate()),
        sportCenterName: session.username,
        sportCenterPrice: packageData[0].price,
        commissionPercentage: COMMISSION_PERCENTAGE,
        adminPrice: selectedPackage?.packages?.price,
    }).returning({ id: packages.id });

    const customer = data[0];

    if (!customer) return { data: { status: 400, description: "Müşteri oluşturulamadı.", result: null } };
    revalidatePath('/dashboard');
    return { data: { status: 201, description: "Müşteri başarıyla oluşturuldu.", result: customer } }
}


export async function getCustomersByUserId(): Promise<any[] | null> {
    const session = await verifySession();
    if (!session) {
        console.log('No session found');
        return null;
    }

    try {
        const query = session.role === 'admin'
            ? db.select().from(customers).leftJoin(invoices, eq(customers.id, invoices.customerId))
            : db.select().from(customers).leftJoin(invoices, eq(customers.id, invoices.customerId)).where(and(
                eq(customers.userId, session.id as string),
                isNull(customers.deletedAt)
            ));

        const data = await query.execute();

        return data;
    } catch (error) {
        console.error('Failed to fetch customers:', error);
        return null;
    }
}


export async function updateCustomerStatus(customerId: string, status: string): Promise<any | null> {
    const session = await verifySession();
    if (!session) {
        console.log('No session found');
        return null;
    }

    try {
        const query = session.role === 'admin'
            ? db.update(customers).set({ status: status as "active" | "inactive" | "pending" | null | undefined }).where(eq(customers.id, customerId))
            : db.update(customers).set({ status: status as "active" | "inactive" | "pending" | null | undefined }).where(
                and(
                    eq(customers.id, customerId),
                    eq(customers.userId, session.id as string)
                )
            );

        const data = await query.execute();

        revalidatePath('/dashboard');
        return data;
    } catch (error) {
        console.error('Failed to update customer status:', error);
        return null;
    }
}


export async function deleteCustomerById(customerId: string): Promise<any | null> {
    const session = await verifySession();
    if (!session) {
        console.log('No session found');
        return null;
    }

    try {
        const query = session.role === 'admin'
            ? db.update(customers).set({ deletedAt: new Date()}).where(eq(customers.id, customerId))
            : db.update(customers).set({ deletedAt: new Date()}).where(
                and(
                    eq(customers.id, customerId),
                    eq(customers.userId, session.id as string)
                )
            );

        const data = await query.execute();
        revalidatePath('/dashboard');
        return { data: { status: 200, description: "Müşteri başarıyla silindi.", result: data } };
    } catch (error) {
        console.error('Failed to delete customer:', error);
        return null;
    }
}

export async function getActiveAndInactiveCustomersByUserId(): Promise<any | null> {
    const session = await verifySession();
    if (!session) {
        console.log('No session found');
        return null;
    }

    try {
        const query = session.role === 'admin'
            ? db.select().from(customers).where(
                or(eq(customers.status, "active"), eq(customers.status, "inactive"))
            )
            : db.select().from(customers).where(
                and(
                    eq(customers.userId, session.id as string),
                    or(eq(customers.status, "active"), eq(customers.status, "inactive"))
                )
            );
        const data = await query.execute();
        return { data: { status: 200, description: "Aktif ve pasif müşteriler başarıyla getirildi.", result: data } };
    } catch (error) {
        console.error('Failed to fetch active and inactive customers:', error);
        return null;
    }
}

export async function getActiveCustomersByUserId(): Promise<any | null> {
    const session = await verifySession();
    if (!session) {
        console.log('No session found');
        return null;
    }

    try {
        const query = session.role === 'admin'
            ? db.select().from(customers).where(eq(customers.status, 'active'))
            : db.select().from(customers).where(and(eq(customers.userId, session.id as string), eq(customers.status, 'active')));

        const data = await query.execute();
        return { data: { status: 200, description: "Aktif müşteriler başarıyla getirildi.", result: data } };
    } catch (error) {
        console.error('Failed to fetch active customers:', error);
        return null;
    }
}

export async function getInactiveCustomersByUserId(): Promise<any | null> {
    const session = await verifySession();
    if (!session) {
        console.log('No session found');
        return null;
    }

    try {
        const query = session.role === 'admin'
            ? db.select().from(customers).where(eq(customers.status, 'inactive'))
            : db.select().from(customers).where(and(eq(customers.userId, session.id as string), eq(customers.status, 'inactive')));

        const data = await query.execute();
        return { data: { status: 200, description: "Pasif müşteriler başarıyla getirildi.", result: data } };
    } catch (error) {
        console.error('Failed to fetch inactive customers:', error);
        return null;
    }
}

export async function getPendingCustomersByUserId(): Promise<any | null> {
    const session = await verifySession();
    if (!session) {
        console.log('No session found');
        return null;
    }

    try {
        const query = session.role === 'admin'
            ? db.select().from(customers).where(eq(customers.status, 'pending'))
            : db.select().from(customers).where(and(eq(customers.userId, session.id as string), eq(customers.status, 'pending')));

        const data = await query.execute();
        return { data: { status: 200, description: "Bekleyen müşteriler başarıyla getirildi.", result: data } };
    } catch (error) {
        console.error('Failed to fetch pending customers:', error);
        return null;
    }
}
