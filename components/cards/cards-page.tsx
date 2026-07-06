"use client";
import Link from "next/link";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { AccountsHeader } from "@/components/accounts/accounts-header";
import { bankCards, virtualCards } from "./cards-data";

export function CardsPage() {
  const [kind, setKind] = useState<"physical" | "virtual">("physical");
  const cards = kind === "physical" ? bankCards : virtualCards;
  return (
    <div className="min-h-screen bg-[#f4f7f7] lg:pl-[210px] lg:bg-white">
      <Sidebar />
      <AccountsHeader title="Cards" />
      <main className="px-5 pb-24 pt-6 lg:px-8 xl:px-16">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[30px] font-bold lg:text-[36px]">
              $120,420.50
            </h2>
            <p className="mt-1 text-xs text-muted lg:text-sm">
              Total balance from all accounts <b className="text-blue">USD</b>
            </p>
          </div>
          <button className="hidden items-center gap-2 text-xs font-bold lg:flex">
            <CirclePlus size={16} />
            Add new card
          </button>
        </div>
        <div className="mt-8 flex rounded-xl border border-line bg-white p-1 lg:w-fit lg:bg-[#f2f5f5]">
          <button
            onClick={() => setKind("physical")}
            className={`h-10 flex-1 rounded-lg px-14 text-xs font-bold ${kind === "physical" ? "bg-black text-white" : ""}`}
          >
            Physical cards
          </button>
          <button
            onClick={() => setKind("virtual")}
            className={`h-10 flex-1 rounded-lg px-14 text-xs font-bold ${kind === "virtual" ? "bg-black text-white" : ""}`}
          >
            Virtual cards
          </button>
        </div>
        <p className="mb-3 mt-6 hidden text-xs text-muted lg:block">
          {kind === "physical" ? "Physical" : "Virtual"} cards
        </p>
        <div className="space-y-2 lg:space-y-3">
          {cards.map((c) => (
            <Link
              href={`/cards/${c.id}`}
              key={c.id}
              className="flex items-center rounded-lg border-line bg-white px-5 py-4 lg:min-h-[66px] lg:border"
            >
              <span
                className={`mr-5 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white ${c.color === "red" ? "bg-gradient-to-r from-red-500 to-orange-400" : c.color === "sky" ? "bg-sky-600" : "bg-sky-700"}`}
              >
                {c.logo}
              </span>
              <div className="min-w-0 flex-1">
                <b className="text-xs lg:hidden">{c.short}</b>
                <b className="hidden text-xs lg:block">{c.number}</b>
                <p className="mt-1 text-xs text-muted">Card number</p>
              </div>
              <div className="w-28 text-right lg:order-3">
                <b className="text-xs">{c.balance}</b>
                <p className="mt-1 text-xs text-muted lg:hidden">{c.valid}</p>
                <p className="mt-1 hidden text-xs text-muted lg:block">
                  Card balance
                </p>
              </div>
              <div className="hidden w-24 text-center lg:block">
                <b className="text-xs">{c.valid}</b>
                <p className="mt-1 text-xs text-muted">Valid</p>
              </div>
              <div className="hidden w-28 text-right lg:block">
                <b className="text-xs">{c.blocked}</b>
                <p className="mt-1 text-xs text-muted">Blocked amount</p>
              </div>
              <span
                className={`ml-8 hidden w-20 rounded-md py-2 text-center text-[10px] font-bold lg:block ${c.status === "Active" ? "bg-green-50 text-green-500" : c.status === "Expired" ? "bg-pink-100 text-pink-500" : "bg-amber-50 text-amber-500"}`}
              >
                {c.status}
              </span>
              <span className="ml-5 hidden lg:block">•••</span>
            </Link>
          ))}
        </div>
        {kind === "virtual" && (
          <button className="mt-5 text-xs font-bold">
            ✓ &nbsp; Apply for a virtual card
          </button>
        )}
      </main>
      <MobileNav />
    </div>
  );
}
