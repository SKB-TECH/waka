import Link from "next/link";
import { CalendarDays, CreditCard, Search, Send, Shuffle } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { TransactionList } from "@/components/dashboard/lists";
import { AccountsHeader } from "./accounts-header";

export function AccountDetails({ id }: { id: string }) {
  return <div className="min-h-screen bg-[#f4f7f7] lg:pl-[210px] lg:bg-white"><Sidebar/><AccountsHeader title="Account Details" back="/accounts"/>
    <main className="pb-24 lg:pb-20"><section className="px-5 pt-5 lg:border-b lg:border-line lg:px-16 lg:pb-4"><h2 className="text-[30px] font-bold lg:text-[36px]">$120,420.50</h2><p className="mt-1 text-xs text-muted">Account **** 4567</p><div className="mt-8 hidden items-center gap-8 text-xs font-bold lg:flex"><button className="flex gap-2"><Shuffle size={15}/>Transfer</button><button className="flex gap-2"><CreditCard size={15}/>Make a Payment</button><button className="flex gap-2">◌ Convert</button><button className="flex gap-2"><Send size={15}/>Request</button><span className="ml-auto flex gap-2"><Search size={15}/>Search</span><span className="flex gap-2"><CalendarDays size={15}/>August 2022</span></div></section>
      <div className="px-5 lg:grid lg:grid-cols-[1.25fr_1fr] lg:gap-20 lg:px-16 lg:pt-7">
        <aside className="mt-6 rounded-lg bg-white lg:order-2 lg:mt-0 lg:bg-transparent"><p className="hidden text-xs text-muted lg:block">Linked Card</p><div className="flex items-center p-5 lg:mt-4 lg:rounded-lg lg:bg-[#f2f5f5]"><div className="mr-4 flex h-12 w-16 items-start justify-end rounded-md bg-gradient-to-br from-blue to-teal-300 p-1 text-[9px] font-bold text-white">VISA</div><div className="flex-1"><b className="text-sm">Visa Gold Paywave</b><p className="mt-2 text-xs text-muted">**** 8790</p></div><span className="hidden text-xs text-muted lg:block">03/22</span></div><Link href="#details" className="block border-t border-line py-4 text-center text-xs font-bold lg:hidden">▣ &nbsp; See account details</Link><div id="details" className="mt-7 hidden lg:block"><p className="mb-4 text-xs text-muted">Account Details</p><div className="rounded-lg border border-line p-5 text-xs">{[["Account name","Premium Account"],["Account number","UK64CT0000010034567"],["Account type","Single Currency"],["Bonus programm","Premium"],["Insurance","Enabled"]].map(([a,b])=><div key={a} className="flex justify-between border-b border-line py-4 last:border-0"><span>{a}</span><b>{b}</b></div>)}</div></div></aside>
        <section className="mt-6 lg:mt-0"><h3 className="text-xl font-bold lg:hidden">Latest transactions</h3><p className="mb-2 mt-6 text-xs text-muted">28 August</p><div className="rounded-lg bg-white px-4 lg:px-0"><TransactionList short/></div><p className="mb-2 mt-6 text-xs text-muted">24 August</p><div className="rounded-lg bg-white px-4 lg:px-0"><TransactionList/></div></section>
      </div>
    </main><MobileNav/></div>;
}
