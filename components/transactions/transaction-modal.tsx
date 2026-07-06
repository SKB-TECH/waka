"use client";
import { Download, Printer, X } from "lucide-react";

export function TransactionModal({
  transfer = false,
  onClose,
}: {
  transfer?: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 lg:items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white lg:w-[410px] lg:rounded-xl"
      >
        <div
          className={`relative h-44 rounded-t-2xl ${transfer ? "bg-sky-700" : "bg-[#f0f3f3]"}`}
        >
          <div className="flex items-center justify-between border-b border-white/15 px-5 py-5">
            <b className={transfer ? "text-white" : ""}>Transaction details</b>
            <button onClick={onClose}>
              <X size={17} className={transfer ? "text-white" : "text-ink"} />
            </button>
          </div>
          <span
            className={`absolute -bottom-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white text-2xl font-bold text-white ${transfer ? "bg-sky-700" : "bg-sky-600"}`}
          >
            {transfer ? "▣" : "◆"}
          </span>
        </div>
        <div className="px-6 pb-7 pt-12 text-center">
          <h2 className="text-xl font-bold">
            {transfer ? "-2.702,12 USD to James Dean" : "-96.12 USD"}
          </h2>
          <p className="mt-1 text-sm text-muted">Completed Thursday 29 April</p>
          <span className="mt-4 inline-block rounded-md bg-green-50 px-7 py-3 text-xs font-bold text-green-500">
            Paid
          </span>
          <div className="mt-6 text-sm">
            {(transfer
              ? [
                  ["Transfer", "#241894617"],
                  ["Send To", "James Dean"],
                  ["Bank Account", "GE91TB7752145031788598"],
                  ["Card", "**** 4590"],
                  ["Amount", "2.702,12 USD"],
                  ["Fee", "2.7 USD"],
                ]
              : [
                  ["Payeer", "James Dean"],
                  ["Card", "**** 4590"],
                  ["Amount", "96.12 USD"],
                  ["Fee", "0.96 USD"],
                ]
            ).map(([a, b]) => (
              <div
                key={a}
                className="flex justify-between border-b border-line py-3"
              >
                <span>{a}</span>
                <b>{b}</b>
              </div>
            ))}
          </div>
          {!transfer && <FakeMap />}
          <div className="mt-5 flex justify-between text-xs font-bold">
            <span>
              <Download className="mr-2 inline" size={14} />
              Download Pdf
            </span>
            <span className="hidden lg:block">
              <Printer className="mr-2 inline" size={14} />
              Print
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
function FakeMap() {
  return (
    <div
      className="relative mt-5 h-44 overflow-hidden rounded-lg bg-[#dce9dd]"
      style={{
        backgroundImage:
          "linear-gradient(30deg,transparent 45%,#fff 46% 50%,transparent 51%),linear-gradient(-35deg,transparent 42%,#fff 43% 47%,transparent 48%),repeating-linear-gradient(0deg,#dbe8e7 0 1px,transparent 1px 28px),repeating-linear-gradient(90deg,#dbe8e7 0 1px,transparent 1px 30px)",
      }}
    >
      <div className="absolute -left-10 top-0 h-full w-32 rotate-12 bg-blue-200" />
      <span className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-blue">
        ◆
      </span>
    </div>
  );
}
