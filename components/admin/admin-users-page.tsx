"use client";

import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2, Search, ShieldCheck, Store, UserPlus, UsersRound, X } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";

type User={id:number;name:string;email:string;role:"Administrateur"|"Superviseur"|"Caissier";outlet:string;active:boolean};
const outlets=["Gombe — Boulevard du 30 Juin","Limete — 7e Rue","Ngaliema — Ma Campagne","Lubumbashi — Centre-ville"];
const initialUsers:User[]=[
  {id:1,name:"Grâce Mbala",email:"grace.mbala@payboard.cd",role:"Administrateur",outlet:"Tous les points de vente",active:true},
  {id:2,name:"Patrick Ilunga",email:"patrick.ilunga@payboard.cd",role:"Superviseur",outlet:outlets[0],active:true},
  {id:3,name:"Sarah Mukendi",email:"sarah.mukendi@payboard.cd",role:"Caissier",outlet:outlets[1],active:true},
  {id:4,name:"Junior Kalala",email:"junior.kalala@payboard.cd",role:"Caissier",outlet:outlets[2],active:false},
];

export function AdminUsersPage(){
  const [users,setUsers]=useState(initialUsers);const [query,setQuery]=useState("");const [open,setOpen]=useState(false);
  const filtered=useMemo(()=>users.filter(u=>`${u.name} ${u.email} ${u.outlet}`.toLowerCase().includes(query.toLowerCase())),[users,query]);
  const update=(id:number,patch:Partial<User>)=>setUsers(list=>list.map(u=>u.id===id?{...u,...patch}:u));
  const submit=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();const data=new FormData(e.currentTarget);setUsers(list=>[...list,{id:Date.now(),name:String(data.get("name")),email:String(data.get("email")),role:data.get("role") as User["role"],outlet:String(data.get("outlet")),active:true}]);setOpen(false)};
  return <div className="min-h-screen bg-[#f4f7f7] pb-24 lg:pl-[210px] lg:pb-0 lg:bg-white"><Sidebar/>
    <header className="border-b border-line bg-white px-5 py-5 lg:flex lg:h-[76px] lg:items-center lg:justify-between lg:px-12 lg:py-0"><div><h1 className="text-xl font-bold">Administration</h1><p className="mt-1 text-xs text-muted">Utilisateurs et points de vente</p></div><button onClick={()=>setOpen(true)} className="mt-4 flex h-10 items-center gap-2 rounded-lg bg-blue px-4 text-xs font-bold text-white lg:mt-0"><UserPlus size={16}/>Créer un utilisateur</button></header>
    <main className="px-5 py-7 lg:px-12"><div className="grid gap-4 sm:grid-cols-3"><Stat icon={<UsersRound size={18}/>} value={users.length} label="Utilisateurs"/><Stat icon={<Store size={18}/>} value={outlets.length} label="Points de vente"/><Stat icon={<CheckCircle2 size={18}/>} value={users.filter(u=>u.active).length} label="Comptes actifs"/></div>
      <section className="mt-6 overflow-hidden rounded-xl border border-line bg-white"><div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-bold">Équipe</h2><p className="text-xs text-muted">Créez les accès et affectez chaque agent à son point de vente.</p></div><label className="flex h-10 items-center gap-2 rounded-lg border border-line px-3"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Rechercher..." className="w-48 bg-transparent text-xs outline-none"/></label></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[780px] text-left text-xs"><thead className="bg-[#f4f7f7] text-muted"><tr><th className="p-4">Utilisateur</th><th>Rôle</th><th>Point de vente</th><th>Statut</th></tr></thead><tbody>{filtered.map(u=><tr key={u.id} className="border-t border-line"><td className="p-4"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue/10 font-bold text-blue">{u.name.split(" ").map(v=>v[0]).join("")}</span><div><b>{u.name}</b><p className="mt-1 text-muted">{u.email}</p></div></div></td><td><select value={u.role} onChange={e=>update(u.id,{role:e.target.value as User["role"]})} className="admin-select"><option>Administrateur</option><option>Superviseur</option><option>Caissier</option></select></td><td><select value={u.outlet} onChange={e=>update(u.id,{outlet:e.target.value})} className="admin-select"><option>Tous les points de vente</option>{outlets.map(o=><option key={o}>{o}</option>)}</select></td><td><button onClick={()=>update(u.id,{active:!u.active})} className={`rounded-full px-3 py-1.5 font-bold ${u.active?"bg-green-100 text-green-700":"bg-slate-100 text-slate-500"}`}>{u.active?"Actif":"Inactif"}</button></td></tr>)}</tbody></table></div>
      </section></main><MobileNav/>
    {open&&<div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center"><form onSubmit={submit} className="w-full rounded-t-2xl bg-white p-6 sm:max-w-md sm:rounded-2xl"><div className="flex items-center justify-between"><div><h2 className="text-lg font-bold">Nouvel utilisateur</h2><p className="text-xs text-muted">Créez son accès et choisissez son affectation.</p></div><button type="button" onClick={()=>setOpen(false)}><X size={20}/></button></div><div className="mt-6 space-y-4"><Field label="Nom complet" name="name"/><Field label="Adresse e-mail" name="email" type="email"/><SelectField label="Rôle" name="role" options={["Administrateur","Superviseur","Caissier"]}/><SelectField label="Point de vente" name="outlet" options={["Tous les points de vente",...outlets]}/></div><button className="mt-6 h-11 w-full rounded-lg bg-blue text-sm font-bold text-white">Créer l’utilisateur</button></form></div>}
  </div>;
}
function Stat({icon,value,label}:{icon:React.ReactNode;value:number;label:string}){return <div className="flex items-center gap-4 rounded-xl border border-line bg-white p-4"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue/10 text-blue">{icon}</span><div><b className="text-xl">{value}</b><p className="text-xs text-muted">{label}</p></div></div>}
function Field({label,name,type="text"}:{label:string;name:string;type?:string}){return <label className="block text-xs font-bold">{label}<input required name={name} type={type} className="mt-2 h-11 w-full rounded-lg border border-line bg-transparent px-3 font-normal outline-none focus:border-blue"/></label>}
function SelectField({label,name,options}:{label:string;name:string;options:string[]}){return <label className="block text-xs font-bold">{label}<select name={name} className="mt-2 h-11 w-full rounded-lg border border-line bg-transparent px-3 font-normal outline-none">{options.map(o=><option key={o}>{o}</option>)}</select></label>}
