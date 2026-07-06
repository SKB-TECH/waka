"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthField, AuthShell, AuthTitle } from "./auth-shell";
export function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 500);
  };
  return (
    <AuthShell>
      <AuthTitle
        title="Sign in"
        subtitle="Enter your account details or use QR code"
      />
      <form onSubmit={submit}>
        <AuthField
          label="Email"
          type="email"
          placeholder="you@example.com"
          defaultValue="catherine.shaw@gmail.com"
        />
        <AuthField
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
        <div className="mb-7 flex justify-between text-xs">
          <label>
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <Link href="/forgot-password" className="font-bold">
            Recover password
          </Link>
        </div>
        <button className="h-12 w-full rounded-lg bg-blue font-bold text-white">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <div className="my-8 flex items-center gap-4 text-xs text-muted">
        <i className="h-px flex-1 bg-line" />
        or
        <i className="h-px flex-1 bg-line" />
      </div>
      <Link
        href="/qr-login"
        className="flex h-12 items-center justify-center rounded-lg border border-line text-sm font-bold"
      >
        ▦ &nbsp; Log in with QR code
      </Link>
      <p className="mt-16 text-sm">
        You don&apos;t have an account?{" "}
        <Link href="/signup" className="font-bold text-blue">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
