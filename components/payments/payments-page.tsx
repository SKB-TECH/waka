"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRightLeft,
  CirclePlus,
  Landmark,
  Plane,
  Search,
  Smartphone,
  Tv,
  Wifi,
} from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { AccountsHeader } from "@/components/accounts/accounts-header";
import { congoProviders } from "./providers";
import { ProviderLogo } from "./provider-logo";
import { TransferHub } from "./transfers";

export function PaymentsPage() {
  const [tab, setTab] = useState<"payment" | "transfer" | "exchange">(
    "payment",
  );
  const [query, setQuery] = useState("");
  const providers = congoProviders.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="min-h-screen bg-[#f4f7f7] lg:pl-[210px] lg:bg-white">
      <Sidebar />
      <AccountsHeader title="Payment" />
      <main className="px-5 pb-24 pt-6 lg:px-8 xl:px-16">
        <div className="flex rounded-xl border border-line bg-white p-1 lg:w-[330px] lg:bg-[#f2f5f5]">
          {(["payment", "transfer", "exchange"] as const).map((t) => (
            <button
              onClick={() => setTab(t)}
              key={t}
              className={`h-10 flex-1 rounded-lg text-xs font-bold capitalize ${tab === t ? "bg-black text-white" : ""}`}
            >
              {t}
            </button>
          ))}
        </div>
        {tab === "exchange" ? (
          <Exchange />
        ) : tab === "transfer" ? (
          <TransferHub />
        ) : (
          <>
            <div className="mt-7 lg:grid lg:grid-cols-[1fr_320px] lg:gap-10">
              <section>
                <h2 className="hidden text-xl font-bold lg:block">
                  Payment options
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Feature
                    icon={<ArrowRightLeft />}
                    title="Transfer to someone"
                    sub="Mobile money wallets"
                  />
                  <Feature
                    icon={<Landmark />}
                    title="Pay for services"
                    sub="7 local providers"
                  />
                </div>
                <h2 className="mb-4 mt-7 text-xl font-bold">
                  Service providers
                </h2>
                <label className="mb-4 flex h-11 items-center gap-3 rounded-lg border border-line bg-white px-4">
                  <Search size={16} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full outline-none"
                    placeholder="Search providers"
                  />
                </label>
                <div className="grid gap-3 md:grid-cols-2">
                  {providers.map((p) => (
                    <Link
                      href={`/payments/${p.slug}`}
                      key={p.slug}
                      className="flex items-center rounded-xl border border-line bg-white p-5"
                    >
                      <ProviderLogo provider={p} />
                      <div className="ml-4">
                        <b className="text-sm">{p.name}</b>
                        <p className="mt-1 text-xs text-muted">
                          {p.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
              <aside className="mt-8 border-l border-line lg:mt-0 lg:pl-10">
                <h2 className="mb-4 text-xl font-bold">Recent payments</h2>
                {congoProviders.slice(0, 6).map((p, i) => (
                  <Link
                    href={`/payments/${p.slug}`}
                    key={p.slug}
                    className="mb-2 flex items-center rounded-lg border border-line bg-white p-3"
                  >
                    <ProviderLogo provider={p} className="h-8 w-8" />
                    <div className="ml-3 flex-1">
                      <b className="text-xs">{p.name}</b>
                      <p className="mt-1 text-[10px]">
                        -{[15.29, 42, 10.48, 20, 35, 114][i].toFixed(2)} USD
                      </p>
                    </div>
                  </Link>
                ))}
              </aside>
            </div>
          </>
        )}
      </main>
      <MobileNav />
    </div>
  );
}
function Feature({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-center rounded-xl border border-line bg-white p-4">
      <span className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue/10 text-blue">
        {icon}
      </span>
      <div>
        <b className="text-xs">{title}</b>
        <p className="mt-1 text-[10px] text-muted">{sub}</p>
      </div>
    </div>
  );
}
function TransferProviders() {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">Mobile money</h2>
      <p className="mt-2 text-sm text-muted">
        Choose the recipient’s wallet provider.
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {congoProviders
          .filter((p) => p.type === "mobile-money")
          .map((p) => (
            <Link
              href={`/payments/${p.slug}`}
              key={p.slug}
              className="flex items-center rounded-xl bg-white p-5 shadow-soft"
            >
              <ProviderLogo provider={p} />
              <b className="ml-4">{p.name}</b>
            </Link>
          ))}
      </div>
    </div>
  );
}
function Exchange() {
  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-2">
      <section className="flex min-h-[480px] flex-col items-center justify-center rounded-xl border border-line bg-white p-6">
        <b className="text-5xl">$148.50</b>
        <b className="mt-4 text-2xl">€140,30</b>
        <span className="mt-7 text-sm text-muted">
          0.95635624 <i className="text-green-500">▲</i>
        </span>
        <div className="mt-12 w-full max-w-sm rounded-xl bg-[#f4f7f7] p-5">
          <p className="border-b border-line py-4">
            🇺🇸 &nbsp; <b>USD Account</b>
          </p>
          <p className="py-4">
            🇪🇺 &nbsp; <b>EUR Account</b>
          </p>
        </div>
        <button className="mt-6 h-12 w-full max-w-sm rounded-lg bg-blue font-bold text-white">
          Continue Exchange
        </button>
      </section>
      <section className="hidden rounded-xl border border-line bg-white p-6 lg:block">
        <h2 className="text-lg font-bold">USD to EUR Chart</h2>
        <div className="mt-6 flex justify-between rounded-lg bg-slate-100 p-1 text-xs font-bold">
          {["1H", "24H", "1W", "1M", "3M", "1Y"].map((x, i) => (
            <span
              className={`rounded px-3 py-2 ${i === 0 ? "bg-black text-white" : ""}`}
              key={x}
            >
              {x}
            </span>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">Jul 4, 2022, 14:03 UTC</p>
        <b className="mt-2 block text-2xl">1 USD = 0.957397 EUR</b>
        <div
          className="mt-10 h-48 border-b border-line"
          style={{
            background:
              "linear-gradient(170deg,transparent 48%,#075cff 49% 50%,transparent 51%)",
          }}
        />
      </section>
    </div>
  );
}
