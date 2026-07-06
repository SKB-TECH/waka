"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CountryFlag } from "@/components/ui/country-flag";
import { usePreferences } from "@/app/providers";
import {
  ArrowDownLeft,
  ArrowLeftRight,
  BarChart3,
  CircleGauge,
  CreditCard,
  FileText,
  Landmark,
  Settings,
  ShieldCheck,
} from "lucide-react";

const nav = [
  [CircleGauge, "Dashboard", "Tableau de bord", "/dashboard"],
  [Landmark, "Accounts", "Comptes", "/accounts"],
  [CreditCard, "Cards", "Cartes", "/cards"],
  [ArrowLeftRight, "Transactions", "Transactions", "/transactions"],
  [ArrowDownLeft, "Payment", "Paiements", "/payments"],
  [FileText, "Invoicing", "Facturation", "/invoices"],
  [BarChart3, "Reports", "Rapports", "/reports"],
  [ShieldCheck, "Administration", "Administration", "/admin/users"],
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const { locale } = usePreferences();
  const activeHref = nav
    .map(([, , , href]) => href)
    .filter((href) => pathname === href || pathname.startsWith(`${href}/`))
    .sort((a, b) => b.length - a.length)[0];

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-[210px] flex-col border-r border-line bg-[#f2f5f5] lg:flex">
      <Link
        href="/dashboard"
        className="mx-5 mt-3 flex h-16 items-center"
      >
        <Image src="/waka-cash-logo.png" alt="Waka Cash" width={165} height={64} className="h-14 w-auto object-contain" priority/>
      </Link>
      <p className="mx-7 mb-3 mt-4 text-xs text-muted">Navigation</p>
      <nav>
        {nav.map(([Icon, en, fr, href]) => {
          const label = locale === "fr" ? fr : en;
          const active = href === activeHref;
          return (
            <Link
              href={href}
              key={label}
              className={`relative flex w-full items-center gap-3 px-7 py-3 text-sm font-semibold ${active ? "text-ink" : "text-[#727a80]"}`}
            >
              {active && (
                <span className="absolute right-0 h-full w-0.5 bg-blue" />
              )}
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>
      <p className="mx-7 mb-3 mt-5 text-xs text-muted">{locale === "fr" ? "Soldes" : "Balances"}</p>
      <div className="space-y-4 px-7 text-xs font-semibold text-[#737b80]">
        <p className="flex items-center gap-3"><CountryFlag code="CD" className="h-5 w-5"/>280.142.100 FC</p>
        <p className="flex items-center gap-3"><CountryFlag code="EU" className="h-5 w-5"/>2310.40 EUR</p>
        <p className="flex items-center gap-3"><CountryFlag code="GB" className="h-5 w-5"/>9455.50 GBP</p>
        <p className="flex items-center gap-3">
          <span className="text-xl">⊕</span>{locale === "fr" ? "Ouvrir un solde" : "Open a balance"}
        </p>
      </div>
      <Link href="/settings" className={`mt-auto flex items-center gap-3 border-r-2 px-7 py-5 text-xs font-semibold ${pathname.startsWith("/settings") ? "border-blue bg-white text-ink" : "border-transparent text-[#737b80]"}`}>
        <Settings size={16} />
        {locale === "fr" ? "Paramètres du profil" : "Profile Settings"}
      </Link>
    </aside>
  );
}
