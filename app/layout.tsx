import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
export const metadata: Metadata = { title: "Waka Cash — Simple, Rapide, Sécurisé", description: "Waka Cash, votre solution de paiement simple, rapide et sécurisée" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><Providers>{children}</Providers></body></html>; }
