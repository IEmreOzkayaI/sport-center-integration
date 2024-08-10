import 'server-only';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SessionPayload } from '../definitions';

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

const auth = {
    cookie_name: 'session',
    cookie_options: { httpOnly: true, secure: true, path: '/' },
    cookie_expire_time: 24 * 60 * 60 * 1000, // 24 hours
    jwt_expire_time: '24h',
}

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(auth.jwt_expire_time)
        .sign(key);
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        return null;
    }
}

export async function createSession({ id, username, role }: SessionPayload) {
    const session = await encrypt({ id, username, role });

    cookies().set(auth.cookie_name, session, { ...auth.cookie_options, sameSite: 'lax', expires: new Date(Date.now() + auth.cookie_expire_time) });
    redirect('/dashboard');
}

export async function verifySession() {
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);

    if (!session) {
        return null;
    }
    return { id: session.id, username: session.username, role: session.role };
}

export function deleteSession() {
    cookies().delete('session');
    redirect('/home');
}


// export async function verifySession() {
//     const cookie = cookies().get('session')?.value;
//     const session = await decrypt(cookie);

//     if (!session?.id) {
//         redirect('/log-in');
//     }
//     return { isAuth: true, id: session.is, name: session.name, role: session.role };
// }

// export async function updateSession(payload: SessionPayload) {

//     if (!payload) {
//         return null;
//     }
//     const role = 'sport_center';
//     const userId = payload.userId as string;
//     const updatedSession = await encrypt({ userId, role });

//     cookies().set(auth.cookie_name, updatedSession, { ...auth.cookie_options, sameSite: 'lax', expires: new Date(Date.now() + auth.cookie_expire_time) });
// }
