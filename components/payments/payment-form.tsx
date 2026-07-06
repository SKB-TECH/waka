"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronDown, Plane, Printer } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { AccountsHeader } from "@/components/accounts/accounts-header";
import { CountryFlag } from "@/components/ui/country-flag";
import type { Provider } from "./providers";
import { ProviderLogo } from "./provider-logo";

export function PaymentForm({ provider }: { provider: Provider }) {
  const [amount, setAmount] = useState("10.00");
  const [success, setSuccess] = useState(false);
  const fee = useMemo(
    () => Math.max(Number(amount || 0) * 0.015, 0.5),
    [amount],
  );
  const total = Number(amount || 0) + fee;
  if (success)
    return (
      <Success
        provider={provider}
        amount={Number(amount)}
        fee={fee}
        total={total}
      />
    );
  return (
    <div className="min-h-screen bg-[#f4f7f7] lg:pl-[210px] lg:bg-white">
      <Sidebar />
      <AccountsHeader title={`Pay ${provider.name}`} back="/payments" />
      <main className="mx-auto max-w-[520px] px-5 pb-24 pt-8">
        <div className="mb-7 flex items-center rounded-xl bg-white p-4 shadow-soft">
          <ProviderLogo provider={provider} />
          <div className="ml-4">
            <b>{provider.name}</b>
            <p className="mt-1 text-xs text-muted">{provider.description}</p>
          </div>
        </div>
        <div className="space-y-4">
          {provider.type === "mobile-money" && (
            <Field
              label="Recipient phone number"
              placeholder="+243 8XX XXX XXX"
            />
          )}
          {provider.type === "tv" && (
            <>
              <Field
                label="Subscriber number"
                placeholder="Enter Canal+ subscriber ID"
              />
              <Field
                label="Bouquet"
                placeholder="Select subscription package"
                select
              />
            </>
          )}
          {provider.type === "internet" && (
            <>
              <Field
                label="CanalBox customer number"
                placeholder="Enter customer number"
              />
              <Field
                label="Internet package"
                placeholder="Select package"
                select
              />
            </>
          )}
          {provider.type === "flight" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Field label="From" placeholder="Kinshasa (FIH)" select />
                <Field label="To" placeholder="Select destination" select />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Departure" placeholder="DD/MM/YYYY" />
                <Field label="Passengers" placeholder="1 adult" select />
              </div>
              <Field
                label="Passenger full name"
                placeholder="As shown on ID or passport"
              />
            </>
          )}
          <Field
            label="Payment account"
            placeholder="Debit Card **** 7890"
            select
          />
          <label className="block text-xs font-bold">
            Amount to pay
            <div className="mt-2 flex h-14 items-center rounded-lg border border-line bg-white px-4">
              <input
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value.replace(/[^0-9.]/g, ""))
                }
                className="w-full outline-none"
                inputMode="decimal"
              />
              <span className="mr-2">USD</span>
              <CountryFlag code="US" className="h-5 w-5" />
            </div>
          </label>
          <div className="flex justify-between px-4 text-xs text-muted">
            <span>Transfer fee</span>
            <b className="text-ink">{fee.toFixed(2)} USD</b>
          </div>
          <div className="flex h-14 items-center justify-between rounded-lg border border-line bg-white px-4">
            <b>Total amount</b>
            <b>{total.toFixed(2)} USD</b>
          </div>
          <p className="text-xs leading-5 text-muted">
            Payments are processed securely. Verify the subscriber, telephone or
            passenger information before confirming.
          </p>
          <button
            disabled={!Number(amount)}
            onClick={() => setSuccess(true)}
            className="h-12 w-full rounded-lg bg-blue font-bold text-white disabled:opacity-50"
          >
            {provider.type === "flight" ? (
              <>
                <Plane className="mr-2 inline" size={17} />
                Book and pay
              </>
            ) : (
              `Pay $${total.toFixed(2)}`
            )}
          </button>
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
function Field({
  label,
  placeholder,
  select = false,
}: {
  label: string;
  placeholder: string;
  select?: boolean;
}) {
  return (
    <label className="block text-xs font-bold">
      {label}
      <div className="mt-2 flex h-14 items-center rounded-lg border border-line bg-white px-4">
        <input
          className="w-full bg-transparent text-sm outline-none"
          placeholder={placeholder}
        />
        {select && <ChevronDown size={16} />}
      </div>
    </label>
  );
}
function Success({
  provider,
  amount,
  fee,
  total,
}: {
  provider: Provider;
  amount: number;
  fee: number;
  total: number;
}) {
  return (
    <div className="min-h-screen bg-[#f4f7f7] lg:pl-[210px]">
      <Sidebar />
      <AccountsHeader title="Payment confirmed" />
      <main className="payment-success flex min-h-[calc(100vh-72px)] flex-col items-center justify-center px-5 pb-24 text-center">
        <CheckCircle2 size={64} className="success-heading text-green-500" />
        <h2 className="mt-6 text-3xl font-bold">Payment successful</h2>
        <p className="mt-3 text-muted">
          Your {provider.name} payment of <b>${total.toFixed(2)}</b> has been
          processed.
        </p>
        <article className="receipt mt-7 w-full max-w-[380px] bg-white px-6 py-7 text-left font-mono text-black shadow-lg">
          <div className="text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-black text-2xl font-black">P</div><h3 className="mt-3 text-xl font-black tracking-widest">PAYBOARD</h3><p className="mt-1 text-[10px]">KINSHASA · RÉPUBLIQUE DÉMOCRATIQUE DU CONGO</p><p className="text-[10px]">Tél. +243 000 000 000</p></div>
          <div className="my-5 border-t border-dashed border-black"/>
          <div className="space-y-1 text-[11px]"><p className="flex justify-between"><span>TICKET :</span><b>PAY-20260706-18492</b></p><p className="flex justify-between"><span>DATE :</span><b>06/07/2026 11:52</b></p><p className="flex justify-between"><span>CLIENT :</span><b>BARRY ARMSTRONG</b></p><p className="flex justify-between"><span>CAISSE :</span><b>PAIEMENT EN LIGNE</b></p></div>
          <div className="my-5 border-t border-dashed border-black"/>
          <div className="grid grid-cols-[1fr_auto] gap-3 text-xs font-bold"><span>DESCRIPTION</span><span>MONTANT</span></div>
          <div className="my-3 grid grid-cols-[1fr_auto] gap-3 text-xs"><div><b>{provider.name.toUpperCase()}</b><p className="mt-1 text-[10px]">{provider.description}</p><p className="mt-1 text-[10px]">QTÉ 1 × {amount.toFixed(2)}</p></div><b>{amount.toFixed(2)}</b></div>
          <div className="my-5 border-t border-dashed border-black"/>
          <div className="space-y-2 text-xs"><p className="flex justify-between"><span>SOUS-TOTAL</span><b>{amount.toFixed(2)} USD</b></p><p className="flex justify-between"><span>FRAIS SERVICE</span><b>{fee.toFixed(2)} USD</b></p><p className="flex justify-between border-y-2 border-black py-3 text-lg font-black"><span>TOTAL</span><span>{total.toFixed(2)} USD</span></p><p className="flex justify-between"><span>CARTE</span><b>•••• 7890</b></p><p className="flex justify-between"><span>STATUT</span><b>PAYÉ</b></p></div>
          <div className="mt-7 flex flex-col items-center"><QRCodeSVG value={JSON.stringify({reference:"PAY-20260706-18492",provider:provider.name,amount:amount.toFixed(2),fee:fee.toFixed(2),total:total.toFixed(2),currency:"USD",status:"PAID",date:"2026-07-06T11:52:00+02:00"})} size={112} level="M" marginSize={2} bgColor="#ffffff" fgColor="#000000" title="Vérifier les informations du paiement"/><p className="mt-2 text-center text-[9px]">SCANNEZ POUR VÉRIFIER LE PAIEMENT</p><p className="mt-1 text-center text-[9px] tracking-[.12em]">PAY-20260706-18492</p></div>
          <div className="my-5 border-t border-dashed border-black"/><div className="text-center text-[10px] leading-5"><b>MERCI POUR VOTRE PAIEMENT</b><p>Conservez ce ticket comme preuve.</p><p>support@payboard.cd</p><p className="mt-2">*** À BIENTÔT ***</p></div>
        </article>
        <button
          onClick={() => window.print()}
          className="print-action mt-4 flex items-center gap-2 rounded-lg border border-line bg-white px-6 py-3 text-sm font-bold"
        >
          <Printer size={17} />
          Print receipt / Save PDF
        </button>
        <div className="screen-actions mt-4 flex gap-3">
          <Link
            href="/payments"
            className="rounded-lg border border-line bg-white px-6 py-3 text-sm font-bold"
          >
            Back to payments
          </Link>
          <Link
            href="/transactions"
            className="rounded-lg bg-blue px-6 py-3 text-sm font-bold text-white"
          >
            View transaction
          </Link>
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
