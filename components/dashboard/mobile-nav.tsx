"use client";
import {
  CircleGauge,
  CreditCard,
  Ellipsis,
  MoveUpRight,
  ArrowLeftRight,
} from "lucide-react";
import { useDashboard } from "@/app/providers";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileNav() {
  const { view, setView } = useDashboard();
  const pathname = usePathname();
  const inAccounts = pathname.startsWith("/accounts");
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex h-[74px] items-center justify-around border-t border-line bg-white md:hidden">
      <Link href="/dashboard" onClick={() => setView("overview")} aria-label="Overview">
        <CircleGauge
          size={19}
          className={
            !inAccounts && view === "overview" ? "text-ink" : "text-muted"
          }
        />
      </Link>
      <Link href="/accounts" aria-label="Accounts">
        <CreditCard
          size={19}
          className={inAccounts ? "text-ink" : "text-muted"}
        />
      </Link>
      <Link
        href="/dashboard"
        onClick={() => setView("analytics")}
        className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue text-white"
        aria-label="Activity"
      >
        <MoveUpRight size={19} />
      </Link>
      <Link href="/transactions" aria-label="Transactions">
        <ArrowLeftRight
          size={19}
          className={
            pathname.startsWith("/transactions") ? "text-ink" : "text-muted"
          }
        />
      </Link>
      <Link href="/settings" aria-label="More">
        <Ellipsis size={19} className={pathname.startsWith("/settings") ? "text-ink" : "text-muted"} />
      </Link>
    </nav>
  );
}
