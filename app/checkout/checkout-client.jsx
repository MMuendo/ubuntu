"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CreditCard, Loader2, LockKeyhole, ReceiptText, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function clean(value) {
  return String(value || "").trim();
}

export function CheckoutClient({ currentUser = null }) {
  const searchParams = useSearchParams();
  const productSlug = clean(searchParams.get("courseId") || searchParams.get("productSlug") || searchParams.get("planId"));
  const productType = searchParams.get("productType") === "plan" || searchParams.get("planId") ? "plan" : "course";
  const courseName = clean(searchParams.get("courseName") || searchParams.get("productName") || "Selected Ubuntu Academy course");
  const courseDescription = clean(searchParams.get("courseDescription") || "");
  const displayPrice = Number(searchParams.get("coursePrice") || searchParams.get("amountKes") || 0);

  const [email, setEmail] = useState(currentUser?.email || "");
  const [fullName, setFullName] = useState(currentUser?.fullName || "");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const amountLabel = useMemo(() => {
    return displayPrice > 0 ? `KES ${displayPrice.toLocaleString()}` : "Confirmed by server";
  }, [displayPrice]);

  async function startPayment(event) {
    event.preventDefault();
    setError("");

    if (!productSlug) {
      setError("Pick what you want to buy first.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("We need a real email address.");
      return;
    }

    setProcessing(true);
    try {
      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fullName, productType, productSlug })
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        setError(payload.message || "We couldn't start the payment. Refresh and try again.");
        setProcessing(false);
        return;
      }

      if (!payload.authorizationUrl) {
        setError("Something went wrong with the payment processor. Try again in a moment.");
        setProcessing(false);
        return;
      }

      window.location.href = payload.authorizationUrl;
    } catch {
      setError("No internet? Check your connection and try again.");
      setProcessing(false);
    }
  }

  if (!productSlug) {
    return (
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <Badge tone="amber">Checkout</Badge>
          <h1 className="mt-4 text-3xl font-semibold text-[#1e1616]">No course or plan selected.</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">Open the academy, mentorship, or billing page and choose what you want to pay for.</p>
          <Button asChild variant="accent" className="mt-6">
            <Link href="/academy">Open academy</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <Badge tone="teal">Secure checkout</Badge>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.03] tracking-tight text-[#1e1616] md:text-6xl">
            Complete enrollment.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Sign in, confirm your details, and complete payment securely. Your course access updates after the transaction is confirmed.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, label: "Server verified" },
              { icon: LockKeyhole, label: "Account required" },
              { icon: ReceiptText, label: "Receipt recorded" }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-lg border border-slate-200 bg-[#f1f5f9] p-4">
                  <Icon className="text-[#00b4d8]" size={20} />
                  <p className="mt-3 text-sm font-semibold text-[#1e1616]">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-lg border border-slate-200 bg-[#f1f5f9] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#007c97]">Order summary</p>
            <h2 className="mt-3 text-2xl font-semibold text-[#1e1616]">{courseName}</h2>
            {courseDescription ? <p className="mt-3 text-sm leading-6 text-slate-600">{courseDescription}</p> : null}
            <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
              <span className="text-sm text-slate-500">Total</span>
              <span className="text-2xl font-semibold text-[#1e1616]">{amountLabel}</span>
            </div>
          </div>

          <form onSubmit={startPayment} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4">
              {currentUser?.email ? (
                <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                  Signed in as <span className="font-semibold">{currentUser.email}</span>. Payment access will be attached to this account.
                </div>
              ) : null}
              <div>
                <label htmlFor="checkout-name" className="text-sm font-semibold text-[#1e1616]">Full name</label>
                <input
                  id="checkout-name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#00b4d8]"
                  placeholder="Your name"
                  disabled={processing}
                  readOnly={Boolean(currentUser?.fullName)}
                />
              </div>
              <div>
                <label htmlFor="checkout-email" className="text-sm font-semibold text-[#1e1616]">Email address</label>
                <input
                  id="checkout-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#00b4d8]"
                  placeholder="you@example.com"
                  disabled={processing}
                  readOnly={Boolean(currentUser?.email)}
                />
                <p className="mt-2 text-xs text-slate-500">This email is used for the receipt, lead record, and purchase lookup.</p>
              </div>
              {error ? <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p> : null}
              <Button type="submit" variant="accent" size="lg" className="w-full" disabled={processing}>
                {processing ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18} />}
                {processing ? "Starting checkout..." : `Pay ${amountLabel}`}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
