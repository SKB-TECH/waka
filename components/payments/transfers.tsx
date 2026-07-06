"use client";
import Link from "next/link";
import { useState } from "react";
import { CirclePlus, X } from "lucide-react";
import { CountryFlag } from "@/components/ui/country-flag";

export const recipients = [
  {
    name: "Harrison Phillips",
    initials: "HP",
    code: "US",
    currency: "USD",
    account: "4008",
    color: "bg-amber-700",
  },
  {
    name: "Rustem Tolstobrov",
    initials: "RT",
    code: "GB",
    currency: "GBP",
    account: "3240",
    color: "bg-sky-700",
  },
  {
    name: "Alicia Puma",
    initials: "AP",
    code: "EU",
    currency: "EUR",
    account: "5600",
    color: "bg-slate-700",
  },
  {
    name: "Nonkosi Joyi",
    initials: "NJ",
    code: "US",
    currency: "USD",
    account: "8390",
    color: "bg-teal-700",
  },
  {
    name: "Evelyn Allen",
    initials: "EA",
    code: "CA",
    currency: "CAD",
    account: "3245",
    color: "bg-orange-700",
  },
  {
    name: "Justine Marshall",
    initials: "JM",
    code: "AU",
    currency: "AUD",
    account: "8009",
    color: "bg-rose-700",
  },
];

export function TransferHub() {
  const [contacts, setContacts] = useState(recipients);
  const [selected, setSelected] = useState<(typeof recipients)[number] | null>(
    null,
  );
  const [empty, setEmpty] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const addContact = (contact: (typeof recipients)[number]) => {
    setContacts((current) => [contact, ...current]);
    setEmpty(false);
    setAddOpen(false);
    setSelected(contact);
  };
  if (empty) return <><EmptyContacts onAdd={() => setAddOpen(true)} />{addOpen&&<AddContactModal onClose={()=>setAddOpen(false)} onSave={addContact}/>}</>;
  return (
    <div className="mt-7">
      <div className="mb-5 hidden justify-end gap-6 lg:flex">
        <button
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-2 text-xs font-bold"
        >
          <CirclePlus size={15} />
          Add new recipient
        </button>
        <button className="flex items-center gap-2 text-xs font-bold">
          <CirclePlus size={15} />
          Add your account
        </button>
      </div>
      <p className="mb-3 text-xs text-muted">Your payment accounts</p>
      <div className="space-y-2">
        <TransferRow
          icon="▣"
          title="Account ending in **** 4008"
          code="US"
          currency="USD"
          note="Chase Bank, U.S."
        />
        <TransferRow
          icon="▭"
          title="Card ending in **** 7356"
          code="EU"
          currency="EUR"
          note="Raiffeisen Bank, RO"
        />
      </div>
      <p className="mb-3 mt-6 text-xs text-muted">Your recipients</p>
      <div className="space-y-2">
        {contacts.map((r) => (
          <button
            onClick={() => setSelected(r)}
            key={r.name}
            className="flex min-h-[60px] w-full items-center rounded-lg border border-line bg-white px-5 text-left"
          >
            <Avatar initials={r.initials} color={r.color} />
            <b className="ml-4 flex-1 text-xs">{r.name}</b>
            <span className="hidden w-28 items-center gap-2 text-xs font-bold md:flex">
              <CountryFlag code={r.code} className="h-5 w-5" />
              {r.currency}
            </span>
            <span className="text-xs text-muted">
              Account ending in **** {r.account}
            </span>
            <span className="ml-8 hidden lg:block">•••</span>
          </button>
        ))}
      </div>
      <div className="mt-6 flex gap-3 lg:hidden">
        <button
          onClick={() => setAddOpen(true)}
          className="h-11 flex-1 rounded-lg border border-line bg-white text-xs font-bold"
        >
          Add contact
        </button>
        <Link
          href="/payments/send"
          className="flex h-11 flex-1 items-center justify-center rounded-lg bg-blue text-xs font-bold text-white"
        >
          Send money
        </Link>
      </div>
      {selected && (
        <RecipientModal
          recipient={selected}
          onClose={() => setSelected(null)}
        />
      )}
      {addOpen && <AddContactModal onClose={()=>setAddOpen(false)} onSave={addContact}/>} 
    </div>
  );
}
function TransferRow({
  icon,
  title,
  code,
  currency,
  note,
}: {
  icon: string;
  title: string;
  code: string;
  currency: string;
  note: string;
}) {
  return (
    <div className="flex min-h-[60px] items-center rounded-lg border border-line bg-white px-5">
      <span className="text-muted">{icon}</span>
      <b className="ml-5 flex-1 text-xs">{title}</b>
      <span className="flex w-28 items-center gap-2 text-xs font-bold">
        <CountryFlag code={code} className="h-5 w-5" />
        {currency}
      </span>
      <span className="hidden w-48 text-xs md:block">{note}</span>
      <span>•••</span>
    </div>
  );
}
export function Avatar({
  initials,
  color,
}: {
  initials: string;
  color: string;
}) {
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${color}`}
    >
      {initials}
    </span>
  );
}
function EmptyContacts({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex min-h-[560px] flex-col items-center justify-center text-center">
      <div className="relative h-44 w-56">
        <div className="absolute bottom-3 left-4 h-px w-48 bg-slate-500" />
        <div className="absolute bottom-4 left-24 h-28 w-14 rounded-t-full bg-slate-700" />
        <div className="absolute right-4 top-7 h-16 w-16 rounded-full bg-rose-400" />
        <div className="absolute left-5 top-12 flex items-end gap-1">
          <i className="h-5 w-2 bg-blue" />
          <i className="h-9 w-2 bg-blue" />
          <i className="h-14 w-2 bg-blue" />
        </div>
      </div>
      <h2 className="mt-8 text-3xl font-bold">Add new contact</h2>
      <p className="mt-3 text-sm leading-6 text-muted">
        Start spending your funds and get detailed
        <br />
        list of transactions for each account
      </p>
      <button onClick={onAdd} className="mt-8 text-sm font-bold text-blue">
        ⊕ &nbsp; Add new contact
      </button>
    </div>
  );
}
function AddContactModal({onClose,onSave}:{onClose:()=>void;onSave:(contact:(typeof recipients)[number])=>void}) {
  const [name,setName]=useState("");
  const [account,setAccount]=useState("");
  const [currency,setCurrency]=useState("USD");
  const [error,setError]=useState("");
  const submit=(event:React.FormEvent)=>{event.preventDefault();if(name.trim().length<3||account.replace(/\D/g,"").length<4){setError("Enter a valid name and account number.");return;}const words=name.trim().split(/\s+/);onSave({name:name.trim(),initials:words.slice(0,2).map(w=>w[0]?.toUpperCase()).join(""),code:currency==="EUR"?"EU":currency==="GBP"?"GB":"US",currency,account:account.replace(/\D/g,"").slice(-4),color:"bg-blue-700"});};
  return <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/80 lg:items-center" onClick={onClose}><form onSubmit={submit} onClick={e=>e.stopPropagation()} className="w-full rounded-t-2xl bg-white p-6 lg:w-[430px] lg:rounded-xl"><div className="flex items-center justify-between"><div><h2 className="text-xl font-bold">Add new contact</h2><p className="mt-1 text-xs text-muted">Enter the recipient banking details.</p></div><button type="button" onClick={onClose}><X size={18}/></button></div><div className="mt-6 space-y-4"><ContactField label="Full name" value={name} onChange={setName} placeholder="e.g. Jean Mbuyi"/><ContactField label="Account number / IBAN" value={account} onChange={setAccount} placeholder="Enter account number"/><label className="block text-xs font-bold">Currency<select value={currency} onChange={e=>setCurrency(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-line bg-white px-4 outline-none"><option>USD</option><option>EUR</option><option>GBP</option></select></label>{error&&<p className="rounded-lg bg-red-50 p-3 text-xs font-bold text-red-600">{error}</p>}<button type="submit" className="h-12 w-full rounded-lg bg-blue font-bold text-white">Save contact</button></div></form></div>;
}
function ContactField({label,value,onChange,placeholder}:{label:string;value:string;onChange:(value:string)=>void;placeholder:string}){return <label className="block text-xs font-bold">{label}<input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="mt-2 h-12 w-full rounded-lg border border-line px-4 font-normal outline-none focus:border-blue"/></label>}
function RecipientModal({
  recipient,
  onClose,
}: {
  recipient: (typeof recipients)[number];
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 lg:items-center"
      onClick={onClose}
    >
      <div
        className="w-full rounded-t-2xl bg-white lg:w-[420px] lg:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-36 rounded-t-2xl bg-[#eef2f2] p-5">
          <div className="flex justify-between">
            <b>Recipient details</b>
            <button onClick={onClose}>
              <X size={17} />
            </button>
          </div>
        </div>
        <div className="px-6 pb-7 text-center">
          <div className="-mt-10 flex justify-center">
            <Avatar initials={recipient.initials} color={recipient.color} />
          </div>
          <h2 className="mt-5 text-xl font-bold">{recipient.name}</h2>
          <p className="mt-1 text-sm text-muted">Added on 29 April, 2022</p>
          <div className="mt-7 text-sm">
            {[
              ["Routing number", "017062169"],
              ["Account", `**** ${recipient.account}`],
              ["Currency", recipient.currency],
              ["Account type", "Checking"],
            ].map(([a, b]) => (
              <div
                key={a}
                className="flex justify-between border-b border-line py-3"
              >
                <span>{a}</span>
                <b>{b}</b>
              </div>
            ))}
          </div>
          <Link
            href="/payments/send"
            className="mt-5 flex h-12 items-center justify-center rounded-lg border border-line text-sm font-bold"
          >
            ↔ &nbsp; Make a transfer
          </Link>
        </div>
      </div>
    </div>
  );
}
