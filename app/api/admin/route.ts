import { CreateCustomerFormSchema, SignupFormSchema } from "@/definitions";
import { users } from "@/lib/drizzle/schema";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import db from "@/lib/db";
import { eq } from "drizzle-orm";

export async function POST(req: Request, res: Response) {
    const { username, password, phone } = await req.json();
    // 4. Check if the request has the required headers
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // 5. Extract the client credentials from the Authorization header
    const encodedCredentials = authHeader.split(' ')[1];
    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
    const [clientId, clientSecret] = decodedCredentials.split(':');

    // 6. Check if the client credentials are valid
    const validClientId = process.env.BASIC_AUTH_CLIENT_ID;
    const validClientSecret = process.env.BASIC_AUTH_CLIENT_SECRET;
    if (clientId !== validClientId || clientSecret !== validClientSecret) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Continue with the rest of the code
    if (!username || !password || !phone) {
        return NextResponse.json({ message: 'Please fill in all fields.' }, { status: 400 });
    }

    // 1. Validate form fields
    const validatedFields = SignupFormSchema.safeParse({ username, password, phone });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return NextResponse.json({ errors: validatedFields.error.flatten().fieldErrors as { username: string[], password: string[], phone: string[] } }, { status: 400 });
    }

    // 2. Prepare data for insertion into database
    const { username: validatedUsername, password: validatedPassword, phone: validatedPhone } = validatedFields.data;

    // 3. Check if the user's email already exists
    const existingUser = await db.select().from(users).where(eq(users.username, validatedUsername));
    if (existingUser.length > 0) return NextResponse.json({ message: 'Username already exists, please use a different username or login.' }, { status: 400 });

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(validatedPassword, 10);
    // 3. Insert the user into the database or call an Auth Provider's API
    const data = await db
        .insert(users)
        .values({
            username: validatedUsername,
            password: hashedPassword,
            phone: validatedPhone,
            role: 'admin'
        })
        .returning({ id: users.id });

    const user = data[0];

    if (!user) return NextResponse.json({ message: 'An error occurred while creating your account.' }, { status: 500 });


    return NextResponse.json({ message: 'Account created successfully.' });
}
