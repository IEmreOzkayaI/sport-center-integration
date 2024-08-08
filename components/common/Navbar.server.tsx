'use server'
import { getSession } from "@/lib/auth/session.auth";
import NavbarClient from "./Navbar.client";

export default async function Navbar() {
    const session = await getSession();
    return <NavbarClient session={session} />;
}
