"use client";
import { cn } from "@/lib/utils";
import type { Provider } from "./providers";
export function ProviderLogo({provider,className}:{provider:Provider;className?:string}){return <span className={cn("relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full px-1 text-center text-[10px] font-black text-white",provider.color,className)}><span aria-hidden>{provider.initials}</span><img src={provider.logoUrl} alt={`Logo ${provider.name}`} loading="lazy" onError={event=>{event.currentTarget.style.display="none"}} className="absolute inset-0 h-full w-full bg-white object-contain p-1"/></span>}
