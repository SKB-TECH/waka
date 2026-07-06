"use client";

import { useState } from "react";
import { Bell, CalendarDays, Car, Dumbbell, Search, Settings, ShoppingBasket, UsersRound, Wrench } from "lucide-react";
import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { CountryFlag } from "@/components/ui/country-flag";
import { usePreferences } from "@/app/providers";
import { PreferencesControls } from "@/components/dashboard/preferences-controls";

const money = (usd:number,currency:"CDF"|"USD") => currency === "CDF" ? `${Math.round(usd * 2800).toLocaleString("fr-FR")} FC` : `$${usd.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`;

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const overviewData = months.map((month,i)=>({month, balance:[5.1,4.6,4.1,4.5,5.2,4.4,2.6,4.7,3.8,4.9,3.7,5.5][i], moneyIn:[4.4,2.8,.9,3.1,4.4,2.8,.8,3.2,1.4,4.3,3.2,2.8][i],moneyOut:[2.7,.9,1.2,3.8,2.9,1.6,.7,1.2,.8,2.5,1.2,1.6][i]}));
const markets = [{flag:"US",name:"U.S. Dollar Index",code:"DXY",value:"108.75",change:"+0.73%",up:true,points:[7,6,6,5,8,4,8,9,6,2,3,6]},{flag:"EU",name:"Euro Stoxx 50 Index",code:"STOXX",value:"3,396.61",change:"-1.66%",up:false,points:[4,4,7,6,8,3,3,8,10,9,9,8]},{flag:"AU",name:"All Ordinaries Index",code:"ASX",value:"6,848.6",change:"+0.60%",up:true,points:[6,2,2,5,7,6,6,5,7,4,8,8]}];
const categories = [{Icon:ShoppingBasket,name:"Grocery",rate:"20.3%",amount:99500,color:"#075cff",width:"100%"},{Icon:UsersRound,name:"Clothing",rate:"18.5%",amount:64200,color:"#20d85a",width:"83%"},{Icon:Car,name:"Car & Transport",rate:"12.8%",amount:50300,color:"#f5be32",width:"50%"},{Icon:Dumbbell,name:"Health",rate:"8.5%",amount:39500,color:"#ff2b89",width:"22%"},{Icon:Wrench,name:"Utilities",rate:"7.3%",amount:19200,color:"#ff2b89",width:"22%"}];

function Header({fr}:{fr:boolean}){return <header className="hidden h-[72px] items-center justify-between px-14 md:flex"><h1 className="text-base font-bold">{fr?"Rapports":"Reports"}</h1><div className="flex items-center gap-2"><PreferencesControls/><label className="flex h-10 w-64 items-center gap-3 rounded-lg border border-line px-3"><Search size={15}/><input className="w-full text-xs outline-none" placeholder={fr?"Rechercher ...":"Type to search ..."}/></label><button className="flex h-10 w-10 items-center justify-center rounded-lg border border-line"><Bell size={15}/></button><span className="h-9 w-9 rounded-full bg-gradient-to-br from-slate-800 via-stone-400 to-stone-100"/></div></header>}
function Card({title,action,children,className=""}:{title:string;action?:React.ReactNode;children:React.ReactNode;className?:string}){return <section className={`overflow-hidden rounded-xl border border-line bg-white ${className}`}><div className="flex h-[54px] items-center justify-between border-b border-line px-5"><h2 className="text-sm font-bold">{title}</h2>{action}</div>{children}</section>}
function Sparkline({points}:{points:number[]}){const coords=points.map((p,i)=>`${i*10},${12-p}`).join(" ");return <svg viewBox="0 0 110 18" className="h-9 w-32"><polyline points={coords} fill="none" stroke="#075cff" strokeWidth="1.5"/></svg>}
function Watchlist(){return <Card title="Watchlist" action={<Settings size={15}/>}><div className="grid md:grid-cols-3">{markets.map((m,i)=><div key={m.name} className={`p-5 ${i?"border-t border-line md:border-l md:border-t-0":""}`}><div className="flex items-center gap-2"><CountryFlag code={m.flag} className="h-5 w-5"/><b className="text-xs">{m.name}</b><span className="text-[10px] text-muted">{m.code}</span></div><div className="mt-5 flex items-end justify-between"><div><b className="text-2xl">{m.value}</b><p className={`mt-1 text-xs ${m.up?"text-green-500":"text-pink-500"}`}>{m.change} {m.up?"↗":"↙"}</p></div><Sparkline points={m.points}/></div></div>)}</div></Card>}
function Rings(){const {currency,locale}=usePreferences();return <div className="relative mx-auto h-[230px] w-[230px]"><svg viewBox="0 0 240 240" className="-rotate-90"><circle cx="120" cy="120" r="105" fill="none" stroke="#e8eded" strokeWidth="4"/><circle cx="120" cy="120" r="105" fill="none" stroke="#075cff" strokeWidth="4" strokeDasharray="520 660" strokeLinecap="round"/><circle cx="120" cy="120" r="91" fill="none" stroke="#e8eded" strokeWidth="4"/><circle cx="120" cy="120" r="91" fill="none" stroke="#20d85a" strokeWidth="4" strokeDasharray="440 572" strokeLinecap="round"/><circle cx="120" cy="120" r="77" fill="none" stroke="#e8eded" strokeWidth="4"/><circle cx="120" cy="120" r="77" fill="none" stroke="#f6b900" strokeWidth="4" strokeDasharray="330 484" strokeLinecap="round"/></svg><div className="absolute inset-0 flex flex-col items-center justify-center"><b className="text-xl">{money(80720.5,currency)}</b><span className="text-[10px] text-muted">{locale==="fr"?"tous les comptes":"from all accounts"}</span></div></div>}
function Breakdown(){return <Card title="Breakdown" action={<CalendarDays size={14}/>}><div className="px-4 py-5"><Rings/><div className="mt-2 flex justify-center gap-2">{[["#075cff","Stocks"],["#20d85a","Cash"],["#f6b900","Crypto"]].map(([color,label])=><span key={label} className="rounded-lg border border-line px-4 py-2 text-[10px] font-bold"><i className="mr-2 inline-block h-2 w-2 rounded-full" style={{background:color}}/>{label}</span>)}</div></div></Card>}
function Categories(){const {currency}=usePreferences();return <Card title="Categories" action={<CalendarDays size={14}/>}><div className="space-y-4 p-5">{categories.map(({Icon,name,rate,amount,color,width})=><div key={name} className="flex gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line"><Icon size={14}/></span><div className="flex-1"><div className="flex items-center text-xs"><b className="flex-1">{name}</b><span className="text-muted">{rate}</span><b className="ml-2">{money(amount,currency)}</b></div><div className="mt-3 h-1 bg-pink-100"><div className="h-full" style={{width,background:color}}/></div></div></div>)}</div></Card>}
function Summary(){const {currency,locale}=usePreferences();const fr=locale==="fr";return <div className="grid bg-[#f1f5f4] md:grid-cols-3">{[[fr?"Solde":"Balance",80470.5,fr?"Solde total restant":"Total remaining balance","+10%",true],[fr?"Entrées":"Money in",60930.5,fr?"Montant total reçu":"Total amount you gained","-2%",false],[fr?"Sorties":"Money out",42890.3,fr?"Montant total dépensé":"Total amount you spent","+10%",true]].map(([label,value,note,rate,up],i)=><div key={String(label)} className={`p-5 ${i?"md:border-l md:border-line":""} ${i?"hidden md:block":""}`}><div className="flex justify-between"><p className="text-xs text-muted">{String(label)}</p><span className={up?"text-green-500":"text-pink-500"}>{up?"↗":"↙"}</span></div><b className="mt-3 block text-xl">{money(Number(value),currency)}</b><div className="flex justify-between text-[10px]"><b>{String(note)}</b><b className={up?"text-green-500":"text-pink-500"}>{String(rate)}</b></div>{i===0&&<div className="mt-5 flex gap-1 md:hidden"><i className="h-1 w-5 rounded bg-blue"/><i className="h-1 w-1 rounded bg-blue/20"/><i className="h-1 w-1 rounded bg-blue/20"/></div>}</div>)}</div>}
function Overview(){return <Card title="Accounts Overview" action={<span className="flex items-center gap-2 text-xs font-bold"><CalendarDays size={14}/>2022</span>}><Summary/><div className="h-[340px] p-4 md:h-[385px]"><ResponsiveContainer><ComposedChart data={overviewData} margin={{left:-18,right:0,top:15,bottom:10}}><CartesianGrid vertical={false} strokeDasharray="3 3"/><XAxis dataKey="month" tickLine={false} axisLine={false} tick={{fontSize:11}} dy={12}/><YAxis domain={[0,7]} tickFormatter={v=>v?`${v}k`:"0"} tickLine={false} axisLine={false} tick={{fontSize:10,fill:"#858b91"}}/><Bar dataKey="moneyIn" fill="#075cff" barSize={4}/><Bar dataKey="moneyOut" fill="#20d85a" barSize={4}/><Line dataKey="balance" stroke="#ffb400" strokeWidth={1.5} dot={false}/></ComposedChart></ResponsiveContainer></div></Card>}
export function ReportsPage(){
  const [view,setView]=useState<"assets"|"overview">("assets");
  const {currency,locale}=usePreferences();
  const fr=locale==="fr";
  const switcher = <div className="flex items-center justify-center gap-2" aria-label="Report view">
    <button aria-label="Assets report" onClick={()=>setView("assets")} className={`h-1.5 rounded-full ${view==="assets"?"w-6 bg-blue":"w-1.5 bg-slate-300"}`}/>
    <button aria-label="Accounts overview" onClick={()=>setView("overview")} className={`h-1.5 rounded-full ${view==="overview"?"w-6 bg-blue":"w-1.5 bg-slate-300"}`}/>
  </div>;
  return <div className="reports-shell min-h-screen bg-[#f4f7f7] md:pl-[210px] md:bg-white">
    <Sidebar/>

    <div className="hidden md:block">
      <Header fr={fr}/>
      <main className="mx-6 pb-8 pt-5 lg:mx-16">
        <div className="mb-8 flex items-end justify-between">
          <div><h1 className="text-[38px] font-bold leading-none">{money(120420.5,currency)}</h1><p className="mt-2 text-xs text-muted">{fr?"Solde total de tous les comptes":"Total balance from all accounts"} <b className="text-blue">{currency==="CDF"?"FC":"USD"}</b></p></div>
          {switcher}
        </div>
        {view==="overview"?<Overview/>:<><Watchlist/><div className="mt-5 grid grid-cols-2 gap-5"><Breakdown/><Categories/></div></>}
      </main>
    </div>

    <div className="md:hidden">
      <main className="px-4 pb-24 pt-7">
        <div className="mb-8 flex items-start justify-between"><div><p className="text-xs text-blue">{fr?"Solde total de tous les comptes":"Total balance from all accounts"}</p><h1 className="mt-1 text-[30px] font-bold leading-none">{money(120420.5,currency)}</h1></div><span className="h-9 w-9 rounded-full bg-gradient-to-br from-slate-800 via-stone-400 to-stone-100"/></div>
        <div className="mb-4">{switcher}</div>
        {view==="overview"?<Overview/>:<><Watchlist/><div className="mt-5 grid gap-5"><Breakdown/><Categories/></div></>}
      </main>
      <MobileNav/>
    </div>
  </div>
}
