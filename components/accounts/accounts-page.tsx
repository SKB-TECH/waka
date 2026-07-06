"use client";
import Link from "next/link";
import { useState } from "react";
import { CirclePlus, LayoutGrid, List, PieChart } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { AssetChart } from "@/components/dashboard/charts";
import { AccountsHeader } from "./accounts-header";
import { credits, deposits, paymentAccounts } from "./accounts-data";
import { CountryFlag } from "@/components/ui/country-flag";

type Tab =
  | "Payment accounts"
  | "Cards"
  | "Open Deposits"
  | "Your Credits"
  | "Crypto Assets"
  | "Transactions";

export function AccountsPage() {
  const [tab, setTab] = useState<Tab>("Payment accounts");
  const [grid, setGrid] = useState(true);
  return (
    <div className="min-h-screen bg-[#f4f7f7] lg:pl-[210px] lg:bg-white">
      <Sidebar />
      <AccountsHeader />
      <main className="mx-auto w-full px-5 pb-24 pt-6 md:px-8 lg:pb-24 xl:w-[calc(100%-64px)] xl:px-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[30px] font-bold tracking-tight lg:text-[36px]">
              €114.158,63
            </h2>
            <p className="mt-1 text-xs text-muted lg:text-sm">
              Total balance from all accounts{" "}
              <b className="ml-1 text-blue">EUR</b>
            </p>
          </div>
          <button className="hidden items-center gap-2 text-xs font-bold lg:flex">
            <CirclePlus size={16} />
            Open an account or deposit
          </button>
        </div>
        <div className="mt-6 lg:hidden">
          <MobileAccounts />
        </div>
        <div className="mt-9 hidden lg:block">
          <div className="flex items-center justify-between">
            <div className="flex rounded-lg bg-[#f2f5f5] p-1">
              {(
                [
                  "Payment accounts",
                  "Cards",
                  "Open Deposits",
                  "Your Credits",
                  "Crypto Assets",
                  "Transactions",
                ] as Tab[]
              ).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-md px-4 py-2 text-[11px] font-bold ${tab === t ? "bg-black text-white" : ""}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex rounded-lg bg-[#f2f5f5] p-1">
              <button
                onClick={() => setGrid(false)}
                className={`flex gap-2 rounded-md px-4 py-2 text-[11px] font-bold ${!grid ? "bg-black text-white" : ""}`}
              >
                <List size={14} />
                List
              </button>
              <button
                onClick={() => setGrid(true)}
                className={`flex gap-2 rounded-md px-4 py-2 text-[11px] font-bold ${grid ? "bg-black text-white" : ""}`}
              >
                <LayoutGrid size={14} />
                Grid
              </button>
            </div>
          </div>
          {tab === "Payment accounts" ? (
            <DesktopAccounts grid={grid} />
          ) : tab === "Transactions" ? (
            <div className="mt-7 rounded-xl border border-line p-8 text-center"><h3 className="text-xl font-bold">All account transactions</h3><p className="mt-2 text-sm text-muted">Review, search and export every payment from your accounts.</p><Link href="/transactions" className="mt-6 inline-flex rounded-lg bg-black px-6 py-3 text-xs font-bold text-white">Open transactions</Link></div>
          ) : (
            <EmptyTab title={tab} />
          )}
        </div>
      </main>
      <MobileNav />
    </div>
  );
}

function DesktopAccounts({ grid }: { grid: boolean }) {
  return (
    <div className={`mt-7 ${grid ? "grid grid-cols-2 gap-5" : "space-y-3"}`}>
      {paymentAccounts
        .concat([
          {
            id: "chf",
            countryCode: "CH",
            currency: "CHF",
            number: "8210 **** **** 9490",
            short: "**** 9490",
            amount: "₺1.560,00",
            blocked: "₺0.00",
            status: "Active",
          },
        ])
        .map((a) => (
          <Link
            href={`/accounts/${a.id}`}
            key={a.id}
            className="flex min-h-[145px] flex-col justify-between rounded-xl border border-line bg-white p-5 shadow-soft"
          >
            <div className="flex justify-between">
              <div>
                <b className="text-xs">{a.currency}</b>
                <p className="mt-2 text-xs text-muted">{a.number}</p>
              </div>
              <CountryFlag code={a.countryCode} />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold">{a.amount}</p>
                <p className="mt-1 text-xs text-muted">
                  Blocked amount {a.blocked}
                </p>
              </div>
              <span
                className={`text-[10px] font-bold ${a.status === "Active" ? "text-green-500" : "text-amber-500"}`}
              >
                {a.status}
              </span>
            </div>
          </Link>
        ))}
    </div>
  );
}

function MobileAccounts() {
  return (
    <>
      <div className="mb-5 flex gap-2 overflow-x-auto rounded-xl border border-line bg-white p-1">
        <span className="whitespace-nowrap rounded-lg bg-black px-4 py-2 text-[10px] font-bold text-white">All accounts</span>
        <Link href="/cards" className="whitespace-nowrap px-3 py-2 text-[10px] font-bold">Cards</Link>
        <Link href="/accounts/report" className="whitespace-nowrap px-3 py-2 text-[10px] font-bold">Overview</Link>
        <Link href="/accounts/open" className="whitespace-nowrap px-3 py-2 text-[10px] font-bold">Open account</Link>
      </div>
      <p className="mb-3 text-xs text-muted">Payment accounts</p>
      <div className="space-y-2">
        {paymentAccounts.map((a) => (
          <Link
            href={`/accounts/${a.id}`}
            key={a.id}
            className="flex items-center rounded-lg bg-white px-5 py-4"
          >
            <CountryFlag code={a.countryCode} className="mr-4" />
            <div className="flex-1">
              <b className="text-xs">{a.short}</b>
              <p className="mt-2 text-xs text-muted">{a.currency}</p>
            </div>
            <div className="text-right">
              <b className="text-xs">{a.amount}</b>
              <p className="mt-2 text-xs text-muted">{a.blocked} Blocked</p>
            </div>
          </Link>
        ))}
      </div>
      <p className="mb-3 mt-6 text-xs text-muted">Open deposits</p>
      <Link
        href="/accounts/deposits/cumulative"
        className="flex items-center rounded-lg bg-white px-5 py-4"
      >
        <span className="mr-5 text-muted">▣</span>
        <div className="flex-1">
          <b className="text-xs">Deposit</b>
          <p className="mt-2 text-xs text-muted">Rate 1.50%</p>
        </div>
        <div className="text-right">
          <b className="text-xs">$48.140,00</b>
          <p className="mt-2 text-xs text-muted">11 Oct 2022</p>
        </div>
      </Link>
      <p className="mb-3 mt-6 text-xs text-muted">Your credits</p>
      {credits.slice(0, 2).map((c) => (
        <div
          key={c.title}
          className="mb-2 flex items-center rounded-lg bg-white px-5 py-4"
        >
          <span className="mr-5 text-muted">{c.icon}</span>
          <div className="flex-1">
            <b className="text-xs">{c.title}</b>
            <p className="mt-2 text-xs text-muted">
              {c.rate.replace("Rate: ", "")}
            </p>
          </div>
          <div className="text-right">
            <b className="text-xs">{c.amount}</b>
            <p className="mt-2 text-xs text-muted">$24.800,00</p>
          </div>
        </div>
      ))}
      <Link href="/accounts/report" className="mt-4 flex h-12 w-full items-center justify-center rounded-lg border border-line text-xs font-bold">◴ &nbsp; See detailed report</Link>
    </>
  );
}

function EmptyTab({ title }: { title: string }) {
  return (
    <div className="flex min-h-[430px] flex-col items-center justify-center">
      <div className="relative mb-8 h-40 w-56">
        <div className="absolute bottom-3 left-5 h-px w-44 bg-slate-400" />
        <div className="absolute bottom-4 left-24 h-28 w-14 rounded-t-full bg-slate-700" />
        <div className="absolute right-7 top-8 h-16 w-16 rounded-full bg-rose-400" />
        <div className="absolute left-7 top-12 flex items-end gap-1">
          <i className="h-5 w-2 bg-blue" />
          <i className="h-9 w-2 bg-blue" />
          <i className="h-14 w-2 bg-blue" />
        </div>
      </div>
      <h3 className="text-3xl font-bold">No {title.toLowerCase()} yet</h3>
      <p className="mt-3 text-sm text-muted">
        Everything you add will appear here.
      </p>
      <button className="mt-8 flex items-center gap-2 text-sm font-bold text-blue">
        <CirclePlus size={16} />
        Open an account or deposit
      </button>
    </div>
  );
}

export function AccountsOverviewPanel() {
  return (
    <div className="rounded-xl border border-line">
      <div className="border-b border-line p-5 text-sm font-bold">
        Payment accounts
      </div>
      <div className="p-5">
        <AssetChart compact />
        {paymentAccounts.map((a) => (
          <div key={a.id} className="flex items-center py-3">
            <CountryFlag code={a.countryCode} className="mr-4" />
            <div className="flex-1">
              <b className="text-xs">{a.number}</b>
              <p className="mt-1 text-xs text-muted">Account number</p>
            </div>
            <div className="text-right">
              <b className="text-xs">{a.amount}</b>
              <p className="mt-1 text-xs text-muted">Account balance</p>
            </div>
          </div>
        ))}
        <button className="mt-4 h-11 w-full rounded-lg border border-line text-xs font-bold">
          <PieChart size={15} className="mr-2 inline" />
          See detailed report
        </button>
      </div>
    </div>
  );
}
