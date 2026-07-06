"use client";
import { useQuery } from "@tanstack/react-query";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { DesktopDashboard } from "./desktop";
import { MobileDashboard } from "./mobile";
import { MobileNav } from "./mobile-nav";
export function Dashboard(){useQuery({queryKey:['dashboard'],queryFn:async()=>({ready:true}),staleTime:60_000});return <div className="min-h-screen lg:pl-[210px]"><Sidebar/><Header/><DesktopDashboard/><MobileDashboard/><MobileNav/></div>}
