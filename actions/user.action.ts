"use server"
import { eq } from 'drizzle-orm';
import { verifySession } from './session.action';
import db from '../lib/db';
import { users } from '../lib/drizzle/schema';
import { User } from '@/definitions';

export async function getAllUsers(): Promise<any> {
    const session = await verifySession();
    if (!session) return null;

    try {
        const data = await db.select().from(users).where(eq(users.role, 'sport_center'));
        return data;
    } catch (error) {
        console.log('Failed to fetch users');
        return null;
    }
}


export const getUser = async (): Promise<User | null> => {
    const session = await verifySession();
    if (!session) return null;

    try {
        const data: any = await db.select().from(users).where(eq(users.id, session.id.toString()));
        const user = data[0];

        const formattedUser: User = {
            id: user.id,
            username: user.username,
            role: user.role,
            status: user.status,
            phone: user.phone,
        };

        return formattedUser;
    } catch (error) {
        console.log('Failed to fetch user', error);
        return null;
    }
};
