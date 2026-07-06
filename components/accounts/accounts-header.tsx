"use client";
import Link from "next/link";
import { ArrowLeft, Bell, CirclePlus, Search } from "lucide-react";
import { PreferencesControls } from "@/components/dashboard/preferences-controls";

export function AccountsHeader({ title = "Accounts", back }: { title?: string; back?: string }) {
  return <header className="h-[72px] border-b border-line bg-white lg:border-0">
    <div className="flex h-full items-center justify-between px-5 lg:px-16">
      <div className="flex items-center gap-4">{back ? <Link href={back} className="flex h-9 w-9 items-center justify-center rounded-lg lg:border lg:border-line"><ArrowLeft size={18}/></Link> : <><CirclePlus size={18} className="lg:hidden"/><Search size={18} className="hidden lg:block"/></>}<h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold lg:static lg:translate-x-0 lg:text-base">{title}</h1></div>
      <div className="flex items-center gap-2"><PreferencesControls/><label className="hidden h-9 w-64 items-center gap-3 rounded-lg border border-line px-3 lg:flex"><Search size={15}/><input className="w-full text-xs outline-none" placeholder="Type to search ..."/></label><button className="hidden h-9 w-9 items-center justify-center rounded-lg border border-line lg:flex"><Bell size={15}/></button><div className="h-8 w-8 rounded-full bg-gradient-to-br from-stone-800 via-stone-400 to-stone-100 ring-2 ring-slate-200"/></div>
    </div>
  </header>;
}
