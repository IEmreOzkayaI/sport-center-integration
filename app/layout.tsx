import type { Metadata } from "next";
import "./globals.css";

import Outline from "@/components/common/Outline";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "sonner";
import { getUser } from "@/actions/user.action";
import Navbar from "@/components/common/Navbar";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata: Metadata = {
    title: "Spor Diyetisyenim",
    description: "Spor Diyetisyenim",
};

export const viewport = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const session = await getUser();

    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/logo.png" sizes="any" />
                <meta name="viewport" content={viewport} />
            </head>
            <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
                <Outline>
                    <Navbar session={session} />
                    {children}
                    <Toaster />
                </Outline>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
