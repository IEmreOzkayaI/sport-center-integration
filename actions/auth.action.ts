'use server';

import { FormState, LoginFormSchema, SignupFormSchema } from '@/definitions';
import db from '@/lib/db';
import { users } from '@/lib/drizzle/schema';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { createSession, deleteSession } from './session.action';
export async function signup(state: FormState, formData: FormData): Promise<FormState> {
    // 1. Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
        phone: formData.get('phone'),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors as { username: string[], password: string[], phone: string[] } };
    }

    // 2. Prepare data for insertion into database
    const { username, password, phone } = validatedFields.data;
    // 3. Check if the user's email already exists
    const existingUser = await db.select().from(users).where(eq(users.username, username));

    if (existingUser.length > 0) return { message: 'Username already exists, please use a different username or login.' };

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);
    // 3. Insert the user into the database or call an Auth Provider's API
    const data = await db
        .insert(users)
        .values({
            username,
            password: hashedPassword,
            phone,
            role: 'sport_center'
        })
        .returning({ id: users.id });

    const user = data[0];

    if (!user) return { message: 'An error occurred while creating your account.' };

    // 4. Create a session for the user
    const id = user.id.toString();
    const role = 'sport_center';
    await createSession({ id, username, role });

    return {};
}

export async function login(state: FormState, formData: FormData,): Promise<FormState | { message: string }> {
    // 1. Validate form fields
    const validatedFields = LoginFormSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
    });
    const errorMessage = { message: 'Invalid login credentials.' };

    // If any form fields are invalid, return early
    if (!validatedFields.success) return { errors: validatedFields.error.flatten().fieldErrors };

    // 2. Query the database for the user with the given email
    const userData = await db.select().from(users).where(eq(users.username, validatedFields.data.username));
    const user = userData[0];
    // If user is not found, return early
    if (!user) return errorMessage;

    // 3. Compare the user's password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(
        validatedFields.data.password,
        user.password as string,
    );

    // If the password does not match, return early
    if (!passwordMatch) return errorMessage;

    // 4. If login successful, create a session for the user and redirect
    const id = user.id?.toString() ?? '';
    const role = user.role ?? '';
    const username = user.username ?? '';
    await createSession({ id, username, role });

    return { message: 'Login successful' };
}

export async function logout() {
    deleteSession();
}
