"use client";
import { useMemo, useState } from "react";
import { CalendarDays, Download, Search, Send, Shuffle } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { AccountsHeader } from "@/components/accounts/accounts-header";
import { CountryFlag } from "@/components/ui/country-flag";
import { transactionRows } from "./transactions-data";
import { TransactionModal } from "./transaction-modal";

export function TransactionsPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [empty, setEmpty] = useState(false);
  const [account, setAccount] = useState<"US" | "EU">("US");
  const [desktopView, setDesktopView] = useState<"table" | "grouped">("table");
  const [showFees, setShowFees] = useState(false);
  const rows = useMemo(
    () =>
      transactionRows.filter((x) =>
        (x.title + x.mobile + x.type)
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );
  const exportCsv = () => {
    const csv = ["Date,Payment to,Type,Fee,Amount", ...rows.map(r => [r.date,r.title,r.type,r.fee,r.amount].join(","))].join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    link.download = "transactions-august-2022.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };
  return (
    <div className="min-h-screen bg-[#f4f7f7] lg:pl-[210px] lg:bg-white">
      <Sidebar />
      <AccountsHeader title="Transactions" />
      <main className="pb-24">
        <section className="border-b border-line px-5 pb-4 pt-4 lg:px-16">
          <div className="flex items-center">
            <button onClick={() => setAccount(account === "US" ? "EU" : "US")} aria-label="Switch account"><CountryFlag code={account} className="mr-4 h-10 w-10" /></button>
            <div>
              <p className="text-xs text-muted">Account **** {account === "US" ? "7890" : "5400"}</p>
              <h2 className="mt-1 text-2xl font-bold">{account === "US" ? "$120,420.50" : "€114.158,63"}</h2>
            </div>
            <CalendarDays className="ml-auto lg:hidden" size={18} />
          </div>
          <div className="mt-7 hidden items-center gap-8 text-xs font-bold lg:flex">
            <button onClick={() => setEmpty(!empty)} className="flex gap-2">
              <Shuffle size={15} />
              Transfer
            </button>
            <button className="flex gap-2">▣ Make a Payment</button>
            <button>◌ Convert</button>
            <button className="flex gap-2">
              <Send size={15} />
              Request
            </button>
            <span className="ml-auto">
              <Search className="mr-2 inline" size={15} />
              Search
            </span>
            <span>
              <CalendarDays className="mr-2 inline" size={15} />
              August 2022
            </span>
            <button onClick={exportCsv} className="flex items-center gap-2"><Download size={14}/>Export CSV</button>
          </div>
        </section>
        {empty ? (
          <EmptyState onRestore={() => setEmpty(false)} />
        ) : (
          <>
            <div className="px-5 pt-6 lg:hidden">
              <div className="mb-3 flex justify-end"><button onClick={() => setShowFees(!showFees)} className="rounded-lg border border-line bg-white px-3 py-2 text-[10px] font-bold">{showFees ? "Hide fees" : "Show fees"}</button></div>
              <label className="flex h-11 items-center gap-3 rounded-lg bg-white px-4 shadow">
                <Search size={16} className="text-muted" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="Type to search"
                />
              </label>
              <MobileRows rows={rows} onSelect={setSelected} showFees={showFees} />
            </div>
            <div className="hidden px-16 pt-6 lg:block">
              <div className="mb-5 flex justify-end gap-2"><button onClick={() => setDesktopView("table")} className={`rounded-lg px-4 py-2 text-xs font-bold ${desktopView === "table" ? "bg-black text-white" : "bg-slate-100"}`}>Table</button><button onClick={() => setDesktopView("grouped")} className={`rounded-lg px-4 py-2 text-xs font-bold ${desktopView === "grouped" ? "bg-black text-white" : "bg-slate-100"}`}>Grouped list</button></div>
              {desktopView === "table" ? <DesktopRows rows={rows} onSelect={setSelected} /> : <DesktopGroupedRows rows={rows} onSelect={setSelected}/>} 
            </div>
          </>
        )}
      </main>
      <MobileNav />
      {selected !== null && (
        <TransactionModal
          transfer={selected === 1}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

type Row = (typeof transactionRows)[number];
function Brand({ row }: { row: Row }) {
  return (
    <span
      className={`mr-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${row.color}`}
    >
      {row.brand}
    </span>
  );
}
function MobileRows({
  rows,
  onSelect,
  showFees = false,
}: {
  rows: Row[];
  onSelect: (id: number) => void;
  showFees?: boolean;
}) {
  let group = "";
  return (
    <div className="mt-6">
      {rows.map((row) => {
        const show = row.group !== group;
        group = row.group;
        return (
          <div key={row.id}>
            {show && (
              <p className="mb-2 mt-5 text-xs text-muted">{row.group}</p>
            )}
            <button
              onClick={() => onSelect(row.id)}
              className="mb-1 flex w-full items-center rounded-lg bg-white px-5 py-4 text-left"
            >
              <Brand row={row} />
              <div className="min-w-0 flex-1">
                <b className="block truncate text-xs">{row.mobile}</b>
                <p className="mt-1 text-[10px] text-muted">{row.type}</p>
              </div>
              <div className="text-right">
                <b className="text-xs">{row.amount}</b>
                <p className="mt-1 text-[10px] text-muted">{showFees ? row.fee : row.date}</p>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}
function DesktopGroupedRows({rows,onSelect}:{rows:Row[];onSelect:(id:number)=>void}) {
  let group = "";
  return <div>{rows.map(row => { const show = row.group !== group; group = row.group; return <div key={row.id}>{show && <p className="mb-2 mt-6 text-xs text-muted">{row.group}</p>}<button onClick={() => onSelect(row.id)} className="mb-1 flex min-h-[54px] w-full items-center rounded-lg border border-line px-5 text-left"><Brand row={row}/><div className="flex-1"><b className="text-xs">{row.title}</b><p className="mt-1 text-[10px] text-muted">{row.type}</p></div><div className="text-right"><b className="text-xs">{row.amount}</b><p className="mt-1 text-[10px] text-muted">{row.date}</p></div></button></div>})}</div>;
}
function DesktopRows({
  rows,
  onSelect,
}: {
  rows: Row[];
  onSelect: (id: number) => void;
}) {
  return (
    <div>
      <div className="grid grid-cols-[150px_1.5fr_1fr_100px_130px] border-b border-line pb-3 text-[11px] font-bold text-muted">
        <span>Date</span>
        <span>Payment to</span>
        <span>Type</span>
        <span>Fee</span>
        <span className="text-right">Amount</span>
      </div>
      {rows.map((row) => (
        <button
          key={row.id}
          onClick={() => onSelect(row.id)}
          className="grid min-h-[54px] w-full grid-cols-[150px_1.5fr_1fr_100px_130px] items-center border-b border-line text-left text-xs"
        >
          <span className="text-muted">{row.date}</span>
          <span className="flex items-center font-bold">
            <Brand row={row} />
            {row.title}
          </span>
          <span className="text-muted">{row.type}</span>
          <span>{row.fee}</span>
          <b className="text-right">{row.amount}</b>
        </button>
      ))}
    </div>
  );
}
function EmptyState({ onRestore }: { onRestore: () => void }) {
  return (
    <div className="flex min-h-[560px] flex-col items-center justify-center px-5 text-center">
      <div className="relative h-44 w-56">
        <div className="absolute bottom-4 left-5 h-1 w-48 bg-blue" />
        <div className="absolute bottom-4 left-5 h-32 w-1 bg-blue" />
        <div className="absolute bottom-10 left-14 h-24 w-20 rounded-full border border-slate-200" />
        <div className="absolute left-12 top-14 h-2 w-2 rounded-full bg-slate-700 shadow-[35px_30px_0_#ff6680,70px_-5px_0_#303045,100px_20px_0_#ff6680]" />
      </div>
      <h2 className="mt-5 text-3xl font-bold lg:text-4xl">Make a payment</h2>
      <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
        Start spending your funds and get detailed
        <br />
        list of transactions for each account
      </p>
      <button onClick={onRestore} className="mt-9 text-sm font-bold text-blue">
        ⊕ &nbsp; Transfer your funds
      </button>
    </div>
  );
}
