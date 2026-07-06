"use client";
import { ChevronDown, Moon, Sun } from "lucide-react";
import { usePreferences } from "@/app/providers";
import { CountryFlag } from "@/components/ui/country-flag";

export function PreferencesControls(){const {locale,setLocale,currency,setCurrency,theme,setTheme}=usePreferences();return <div className="hidden items-center gap-2 lg:flex">
  <label className="preference-select navbar-select"><CountryFlag code={locale==="fr"?"FR":"GB"} className="h-4 w-4"/><span>{locale.toUpperCase()}</span><ChevronDown size={11}/><select value={locale} onChange={e=>setLocale(e.target.value as "fr"|"en")}><option value="fr">Français</option><option value="en">English</option></select></label>
  <label className="preference-select navbar-select"><CountryFlag code={currency==="CDF"?"CD":"US"} className="h-4 w-4"/><span>{currency==="CDF"?"FC":"USD"}</span><ChevronDown size={11}/><select value={currency} onChange={e=>setCurrency(e.target.value as "CDF"|"USD")}><option value="CDF">Franc congolais (FC)</option><option value="USD">Dollar américain (USD)</option></select></label>
  <button onClick={()=>setTheme(theme==="light"?"dark":"light")} className="theme-button" aria-label="Changer le thème">{theme==="light"?<Moon size={14}/>:<Sun size={14}/>}</button>
</div>}
