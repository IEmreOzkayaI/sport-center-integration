import 'server-only';
import { eq } from 'drizzle-orm';
import { verifySession } from '../lib/auth/session.auth';
import db from '../lib/db';
import { users } from '../lib/drizzle/schema';

export async function getAllUsers() {
    const session = await verifySession();
    if (!session) return null;

    try {
      const data = await db.select().from(users);
      const users = data;

      return users;
    } catch (error) {
      console.log('Failed to fetch users');
      return null;
    }
}


export const getUser = async () => {
    const session = await verifySession();
    if (!session) return null;

    try {
      const data = await db.select().from(users).where(eq(users.id, session.id.toString()));
      const user = data[0];

      return user;
    } catch (error) {
      console.log('Failed to fetch user');
      return null;
    }
  };
