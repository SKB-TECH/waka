import Link from "next/link";
import { CirclePlus, PieChart } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { AssetChart } from "@/components/dashboard/charts";
import { AccountsHeader } from "./accounts-header";
import { CountryFlag } from "@/components/ui/country-flag";
import { credits, deposits, paymentAccounts } from "./accounts-data";

export function AccountReport() {
  return <div className="min-h-screen bg-[#f4f7f7] lg:pl-[210px] lg:bg-white"><Sidebar/><AccountsHeader/>
    <main className="px-5 pb-24 pt-6 lg:px-8 xl:px-12"><div className="flex items-center justify-between"><div><h2 className="text-[30px] font-bold lg:text-[36px]">$120,420.50</h2><p className="mt-1 text-xs text-muted">Total balance from all accounts <b className="text-blue">USD</b></p></div><Link href="/accounts/open" className="hidden items-center gap-2 text-xs font-bold lg:flex"><CirclePlus size={16}/>Open an account or deposit</Link></div>
      <div className="mt-7 lg:grid lg:grid-cols-2 lg:gap-5">
        <section className="overflow-hidden rounded-xl lg:border lg:border-line lg:bg-white"><h3 className="hidden border-b border-line p-5 text-sm font-bold lg:block">Payment accounts</h3><div className="-mx-5 lg:mx-0 lg:p-5"><AssetChart compact/></div><div className="mt-4 space-y-2 lg:mt-0 lg:px-5">{paymentAccounts.map(a=><Link href={`/accounts/${a.id}`} key={a.id} className="flex items-center rounded-lg bg-white px-5 py-4 lg:px-0"><CountryFlag code={a.countryCode} className="mr-4"/><div className="flex-1"><b className="text-xs">{a.short}</b><p className="mt-1 text-xs text-muted">Account</p></div><b className="text-xs">{a.amount}</b></Link>)}</div><Link href="/accounts" className="m-5 flex h-11 items-center justify-center rounded-lg border border-line text-xs font-bold"><PieChart size={15} className="mr-2"/>See detailed report</Link></section>
        <section className="mt-5 rounded-xl lg:mt-0 lg:border lg:border-line lg:bg-white"><h3 className="hidden border-b border-line p-5 text-sm font-bold lg:block">Deposits and credits</h3><div className="lg:p-5"><p className="mb-2 text-xs text-muted">Open deposits</p>{deposits.map((d,i)=><Link href={i===0?'/accounts/deposits/cumulative':'#'} key={d.title} className="flex items-center rounded-lg bg-white px-4 py-3"><span className="mr-4 text-muted">{d.icon}</span><div className="flex-1"><b className="text-xs">{d.title}</b><p className="mt-1 text-[10px] text-muted">{d.rate}</p></div><div className="text-right"><b className="text-xs">{d.amount}</b><p className="mt-1 text-[10px] text-muted">{d.note}</p></div></Link>)}<p className="mb-2 mt-6 text-xs text-muted">Your credits</p>{credits.map(c=><div key={`${c.title}-${c.amount}`} className="flex items-center rounded-lg bg-white px-4 py-3"><span className="mr-4 text-muted">{c.icon}</span><div className="flex-1"><b className="text-xs">{c.title}</b><p className="mt-1 text-[10px] text-muted">{c.rate}</p></div><div className="text-right"><b className="text-xs">{c.amount}</b><p className="mt-1 text-[10px] text-muted">{c.note}</p></div></div>)}</div></section>
      </div>
    </main><MobileNav/></div>;
}
