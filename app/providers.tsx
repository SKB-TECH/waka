"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type View = "overview" | "analytics" | "wallet";
const DashboardContext = createContext<{ view: View; setView: (v: View) => void } | null>(null);
type Locale = "fr" | "en";
type Currency = "CDF" | "USD";
type Theme = "light" | "dark";
type Preferences = { locale: Locale; setLocale: (v: Locale) => void; currency: Currency; setCurrency: (v: Currency) => void; theme: Theme; setTheme: (v: Theme) => void };
const PreferencesContext = createContext<Preferences | null>(null);
export function useDashboard() { const value = useContext(DashboardContext); if (!value) throw new Error("useDashboard must be within Providers"); return value; }
export function usePreferences() { const value = useContext(PreferencesContext); if (!value) throw new Error("usePreferences must be within Providers"); return value; }
export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());
  const [view, setView] = useState<View>("overview");
  const [locale, setLocale] = useState<Locale>("fr");
  const [currency, setCurrency] = useState<Currency>("CDF");
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => {
    const l = localStorage.getItem("payboard-locale") as Locale | null;
    const c = localStorage.getItem("payboard-currency") as Currency | null;
    const t = localStorage.getItem("payboard-theme") as Theme | null;
    if (l) setLocale(l); if (c) setCurrency(c); if (t) setTheme(t);
  }, []);
  useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark"); localStorage.setItem("payboard-theme", theme); }, [theme]);
  useEffect(() => { document.documentElement.lang = locale; localStorage.setItem("payboard-locale", locale); }, [locale]);
  useEffect(() => { localStorage.setItem("payboard-currency", currency); }, [currency]);
  return <QueryClientProvider client={client}><PreferencesContext.Provider value={{locale,setLocale,currency,setCurrency,theme,setTheme}}><DashboardContext.Provider value={{ view, setView }}>{children}</DashboardContext.Provider></PreferencesContext.Provider></QueryClientProvider>;
}
