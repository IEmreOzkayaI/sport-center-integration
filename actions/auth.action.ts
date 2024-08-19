'use server';

import { FormState, FormStateLogIn, LoginFormSchema, SignupFormSchema } from '@/definitions';
import db from '@/lib/db';
import { users } from '@/lib/drizzle/schema';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { createSession, deleteSession } from './session.action';
export async function signup(state: FormState, formData: FormData): Promise<FormState | any> {
    console.log('Signup form data:', formData);
    // 1. Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
        phone: formData.get('phone'),
    });

    console.log('Validated fields:', validatedFields);

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors as { username: string[], password: string[], phone: string[] } };
    }

    // 2. Prepare data for insertion into database
    const { username, password, phone } = validatedFields.data;
    console.log('Username:', username, 'Password:', password, 'Phone:', phone);
    // 3. Check if the user's email already exists
    const existingUser = await db.select().from(users).where(eq(users.username, username));

    console.log('Existing user:', existingUser);

    if (existingUser.length > 0) return { data: { status: 400, description: 'Bu Kullanıcı adı zaten kullanımda', result: null } };

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);
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

    console.log('Inserted user:', data[0]);

    const user = data[0];

    if (!user) return { data: { status: 400, description: 'Kullanıcı oluşturulamadı', result: null } };

    // 4. Create a session for the user
    const id = user.id.toString();
    const role = 'sport_center';
    await createSession({ id, username, role });
    return { data: { status: 201, description: 'Kullanıcı başarıyla oluşturuldu', result: null } };
}

export async function login(state: FormStateLogIn, formData: FormData,): Promise<FormStateLogIn | any> {
    console.log('Login form data:', formData);

    // 1. Validate form fields
    const validatedFields = LoginFormSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
    });

    console.log('Validated fields:', validatedFields);

    // If any form fields are invalid, return early
    if (!validatedFields.success) return { errors: validatedFields.error.flatten().fieldErrors };

    // 2. Query the database for the user with the given email
    const userData = await db.select().from(users).where(eq(users.username, validatedFields.data.username));
    const user = userData[0];
    console.log('User data:', userData);

    // If user is not found, return early
    if (!user) return { data: { status: 400, description: 'Kullanıcı bulunamadı', result: null } };

    // 3. Compare the user's password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(
        validatedFields.data.password,
        user.password as string,
    );

    console.log('Password match:', passwordMatch);

    // If the password does not match, return early
    if (!passwordMatch) return { data: { status: 400, description: 'Şifre yanlış', result: null } };

    // 4. If login successful, create a session for the user and redirect
    const id = user.id?.toString() ?? '';
    const role = user.role ?? '';
    const username = user.username ?? '';
    await createSession({ id, username, role });

    return { data: { status: 200, description: 'Giriş başarılı', result: null } };
}

export async function logout() {
    deleteSession();
}
