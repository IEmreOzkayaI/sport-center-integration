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
        const data = await db.select().from(users);
        return data;
    } catch (error) {
        console.log('Failed to fetch users');
        return null;
    }
}
