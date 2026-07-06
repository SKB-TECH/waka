import { notFound } from "next/navigation";
import { PaymentForm } from "@/components/payments/payment-form";
import { providerBySlug } from "@/components/payments/providers";
export default async function Page({params}:{params:Promise<{provider:string}>}){const {provider:slug}=await params;const provider=providerBySlug(slug);if(!provider)notFound();return <PaymentForm provider={provider}/>}
