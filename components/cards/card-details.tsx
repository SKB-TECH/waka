"use client";
import { useState } from "react";
import { Download, Edit3, Lock, Search } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { AccountsHeader } from "@/components/accounts/accounts-header";
import { TransactionList } from "@/components/dashboard/lists";
import { AssetChart } from "@/components/dashboard/charts";
import { BankCard } from "./bank-card";

type Tab =
  "Transactions" | "Card Requisites" | "Limits" | "Spendings" | "Settings";
export function CardDetails() {
  const [tab, setTab] = useState<Tab>("Transactions");
  const [mobileView, setMobileView] = useState<"home" | "details" | "spendings">("home");
  return (
    <div className="min-h-screen bg-[#f4f7f7] lg:pl-[210px] lg:bg-white">
      <Sidebar />
      <AccountsHeader title="Card Details" back="/cards" />
      <main className="pb-24">
        <div className="hidden px-16 pt-3 lg:block">
          <div className="flex items-center">
            <span className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-sky-700 text-xl font-bold text-white">
              V
            </span>
            <div>
              <h2 className="text-2xl font-bold">$120,420.50</h2>
              <p className="mt-1 text-xs text-muted">
                Card **** 4550 &nbsp;|&nbsp; 03/25
              </p>
            </div>
          </div>
          <div className="mt-8 flex items-center">
            <div className="flex rounded-lg bg-[#f2f5f5] p-1">
              {(
                [
                  "Transactions",
                  "Card Requisites",
                  "Limits",
                  "Spendings",
                  "Settings",
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
            <b className="ml-auto text-xs">↘ &nbsp; Make a transfer</b>
          </div>
        </div>
        <div className="lg:hidden">
          <div className="mx-5 mt-4 flex rounded-lg bg-white p-1">
            {(["home", "details", "spendings"] as const).map((view) => <button key={view} onClick={() => setMobileView(view)} className={`flex-1 rounded-md py-2 text-[10px] font-bold capitalize ${mobileView === view ? "bg-black text-white" : ""}`}>{view === "home" ? "Transactions" : view}</button>)}
          </div>
          {mobileView === "details" ? (
            <MobileRequisites />
          ) : mobileView === "spendings" ? (
            <div className="mt-4 rounded-t-3xl bg-white px-1 pb-8 pt-2"><div className="mx-auto mb-4 h-1 w-8 rounded bg-slate-200"/><h2 className="px-5 text-xl font-bold">Breakdown</h2><Breakdown/></div>
          ) : (
            <MobileCardHome onDetails={() => setMobileView("details")} />
          )}
        </div>
        <div className="hidden px-16 pt-6 lg:block">
          {tab === "Transactions" ? (
            <Transactions />
          ) : tab === "Card Requisites" ? (
            <Requisites />
          ) : tab === "Spendings" ? (
            <Spendings />
          ) : (
            <Management />
          )}
        </div>
      </main>
      <MobileNav />
    </div>
  );
}

function MobileCardHome({ onDetails }: { onDetails: () => void }) {
  return (
    <div className="px-5 pt-6">
      <BankCard />
      <div className="my-4 flex justify-center gap-1">
        <i className="h-1 w-4 rounded bg-blue" />
        <i className="h-1 w-1 rounded bg-blue/30" />
        <i className="h-1 w-1 rounded bg-blue/30" />
      </div>
      <button
        onClick={onDetails}
        className="h-11 w-full rounded-lg border border-line text-xs font-bold"
      >
        ◴ &nbsp; See card details
      </button>
      <h3 className="mb-3 mt-7 text-xl font-bold">Latest transactions</h3>
      <p className="mb-2 text-xs text-muted">28 August</p>
      <div className="rounded-lg bg-white px-4">
        <TransactionList short />
      </div>
      <p className="mb-2 mt-4 text-xs text-muted">24 August</p>
      <div className="rounded-lg bg-white px-4">
        <TransactionList short />
      </div>
    </div>
  );
}
function MobileRequisites() {
  return (
    <div className="px-6 pt-7">
      <BankCard />
      <div className="mt-10">
        <DetailRows />
      </div>
    </div>
  );
}
function Transactions() {
  return (
    <div>
      <div className="mb-5 flex justify-end gap-7 text-xs font-bold">
        <span>
          <Search className="inline" size={14} /> Search
        </span>
        <span>▣ &nbsp; August 2022</span>
      </div>
      <TransactionList />
    </div>
  );
}
function Requisites() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <section className="rounded-xl border border-line">
        <h3 className="border-b border-line p-5 text-sm font-bold">
          Card Details
        </h3>
        <div className="flex justify-center py-7">
          <BankCard className="h-[165px] max-w-[270px] p-5" />
        </div>
        <div className="px-5 pb-5">
          <DetailRows />
        </div>
      </section>
      <section className="rounded-xl border border-line">
        <h3 className="border-b border-line p-5 text-sm font-bold">
          Your Documents
        </h3>
        <div className="p-5">
          {[
            "Term Deposit",
            "Accumulative Deposit",
            "Digital Visa Opening",
            "Accumulative Deposit",
            "Digital Visa Opening",
            "Term Change",
            "Personal Details Update",
          ].map((x, i) => (
            <div key={`${x}-${i}`} className="flex items-center py-3 text-xs">
              <span className="w-28 text-muted">
                {15 - i} Aug {i ? "4:30 PM" : "3:00 PM"}
              </span>
              <span className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                ▣
              </span>
              <b>{x}</b>
              {i === 1 && <Download size={14} className="ml-auto" />}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
function DetailRows() {
  return (
    <div>
      {[
        ["Card name", "Visa Classic Paywave"],
        ["Account number", "UK64CT000000000010034567"],
        ["Cardholder", "Barry Armstrong"],
        ["Expiration date", "20.06.2022"],
        ["Pin code", "****"],
        ["3D Security", "Enable"],
      ].map(([a, b]) => (
        <div
          key={a}
          className="flex justify-between border-b border-line py-3 text-sm last:border-0"
        >
          <span>{a}</span>
          <b className="max-w-[60%] truncate">{b}</b>
        </div>
      ))}
    </div>
  );
}
function Spendings() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <section className="rounded-xl border border-line">
        <h3 className="border-b border-line p-5 text-sm font-bold">
          Breakdown
        </h3>
        <Breakdown />
      </section>
      <section className="rounded-xl border border-line">
        <h3 className="border-b border-line p-5 text-sm font-bold">
          Income and Expenses
        </h3>
        <div className="p-5">
          <AssetChart dual />
          <div className="mt-2 space-y-3 text-xs">
            {[
              ["Income", "$33,650.00"],
              ["Expenses", "$17,349.30"],
              ["Difference", "$16,300.70"],
            ].map(([a, b]) => (
              <div
                key={a}
                className="flex justify-between border-b border-line pb-3"
              >
                <span>{a}</span>
                <b>{b}</b>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
function Breakdown() {
  const rows = [
    ["Grocery", "-$3,490.00", "bg-blue"],
    ["Shopping", "-$1,250.30", "bg-green-500"],
    ["Car & Transport", "-$680.00", "bg-amber-400"],
    ["Health", "-$524.50", "bg-purple-500"],
    ["Utilities", "-$250.30", "bg-pink-500"],
  ];
  return (
    <div className="p-5">
      <div
        className="mx-auto my-2 flex h-56 w-56 items-center justify-center rounded-full"
        style={{
          background:
            "conic-gradient(#075cff 0 36%,#9333ea 36% 45%,#ec268f 45% 51%,#ffb800 51% 72%,#12dc45 72% 100%)",
        }}
      >
        <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white">
          <b className="text-2xl">$6,195.80</b>
          <span className="mt-1 text-xs text-muted">Spent in August</span>
        </div>
      </div>
      <div className="mt-6">
        {rows.map(([a, b, c]) => (
          <div
            key={a}
            className="flex items-center border-b border-line py-3 text-xs"
          >
            <i className={`mr-4 h-2 w-2 rounded-full ${c}`} />
            <span className="flex-1">{a}</span>
            <b>{b}</b>
          </div>
        ))}
      </div>
    </div>
  );
}
function Management() {
  return (
    <div className="grid grid-cols-[320px_1fr] gap-5">
      <section className="rounded-xl border border-line">
        <h3 className="border-b border-line p-5 text-sm font-bold">
          Card management
        </h3>
        <div className="space-y-6 p-5 text-xs font-bold">
          <p>◉ &nbsp; Card Details</p>
          <p>
            <Download className="inline" size={14} /> &nbsp; Download Statement
          </p>
          <p>
            <Edit3 className="inline" size={14} /> &nbsp; Change Pin
          </p>
          <p>
            <Lock className="inline" size={14} /> &nbsp; Block Card
          </p>
          <hr />
          <span className="text-muted">ATM Withdrawals</span>
          <b className="block text-xl">$6,900.00</b>
          <div className="h-1 bg-amber-100">
            <div className="h-full w-1/2 bg-amber-400" />
          </div>
          <div className="flex justify-between">
            <b>$5,100.00</b>
            <b>$1,800.00</b>
          </div>
        </div>
      </section>
      <div className="rounded-xl border border-line p-6">
        <h3 className="text-sm font-bold">Latest transactions</h3>
        <TransactionList />
      </div>
    </div>
  );
}
