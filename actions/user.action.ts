"use server"
import { and, eq, or } from 'drizzle-orm';
import { verifySession } from './session.action';
import db from '../lib/db';
import { customers, invoices, users } from '../lib/drizzle/schema';
import { Response, User } from '@/definitions';

export async function getAllUsers(): Promise<Response | null> {
    const session = await verifySession();
    if (!session) return null;

    try {
        const response = await db.select().from(users).where(eq(users.role, 'sport_center'));
        return { data: { status: 200, description: 'Kullanıcılar başarıyla çekildi. ', result: response } };
    } catch (error) {
        console.log('Failed to fetch users');
        return null;
    }
}


export const getUser = async (): Promise<User | null> => {
    const session = await verifySession();
    if (!session) return null;

    try {
        const data: any = await db.select().from(users).where(eq(users.id, (session.id as string).toString()));
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

export async function getTotalProfitById(): Promise<Response | null> {
    const session = await verifySession();
    if (!session) return null;
    try {
        const query = session.role === 'admin' ?
            db.select().from(invoices).leftJoin(customers, eq(customers.id, invoices.customerId)).where(or(eq(customers.status, 'active'), eq(customers.status, 'inactive'))) :
            db.select().from(invoices).leftJoin(customers, eq(customers.id, invoices.customerId)).where(and(eq(customers.userId, session.id as string), or(eq(customers.status, 'active'), eq(customers.status, 'inactive'))));
        const response = await query.execute();
        let profit;
        if (session.role === 'admin') {
            profit = response.map((item: any) => item.invoices.adminPrice - (item.invoices.sportCenterPrice * item.invoices.commissionPercentage / 100));
        } else {
            profit = response.map((item: any) => Number(item.invoices.sportCenterPrice) * Number(item.invoices.commissionPercentage) / 100);
        }
        let totalProfit = profit.reduce((a: any, b: any) => a + b, 0);
        const activeUsers = response.filter((item: any) => item.customers.status === 'active');

        let totalActiveProfit;
        if (session.role === 'admin') {
            totalActiveProfit = activeUsers.reduce((total: number, item: any) => {
                const userProfit = item.invoices.adminPrice - (item.invoices.sportCenterPrice * item.invoices.commissionPercentage / 100);
                return total + userProfit;
            }, 0);
        } else {
              totalActiveProfit = activeUsers.reduce((total: number, item: any) => {
                const userProfit = item.invoices.sportCenterPrice * item.invoices.commissionPercentage / 100;
                return total + userProfit;
            }, 0);
        }

        return { data: { status: 200, description: 'Kullanıcılar başarıyla çekildi. ', result: { totalActiveProfit, totalProfit } } };
    } catch (error) {
        console.log('Failed to fetch users');
        return null;
    }

}
