"use client";
import ReactCountryFlag from "react-country-flag";
import { cn } from "@/lib/utils";

export function CountryFlag({ code, className }: { code: string; className?: string }) {
  return <span className={cn("inline-flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full", className)}>
    <ReactCountryFlag countryCode={code} svg aria-label={`${code} flag`} style={{ width: "2rem", height: "2rem", objectFit: "cover" }}/>
  </span>;
}
