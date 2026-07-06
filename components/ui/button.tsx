import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => <button ref={ref} className={cn("inline-flex items-center justify-center rounded-lg border border-line bg-white px-4 py-2 text-sm font-semibold transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue/30", className)} {...props} />);
Button.displayName = "Button";
