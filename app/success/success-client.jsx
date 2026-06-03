"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, ReceiptText, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function SuccessClient() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || "";
  const [status, setStatus] = useState(reference ? "verifying" : "missing");
  const [message, setMessage] = useState(reference ? "Verifying payment..." : "No payment reference was provided.");
  const [purchase, setPurchase] = useState(null);
  const purchaseTrackedRef = useRef(false);

  useEffect(() => {
    if (!reference) return;

    let cancelled = false;
    function trackPurchase(purchaseData) {
      if (typeof window === "undefined" || !purchaseData || purchaseTrackedRef.current) return false;
      if (!window.fbq) return false;

      const storageKey = `ua-purchase-tracked-${reference}`;
      if (window.sessionStorage.getItem(storageKey)) return true;

      purchaseTrackedRef.current = true;
      window.sessionStorage.setItem(storageKey, "1");
      window.fbq("track", "Purchase", {
        value: Number(purchaseData.amountKes || 0),
        currency: "KES",
        content_ids: [reference],
        content_name: purchaseData.productName || "Ubuntu Analytiq purchase",
        content_type: "product"
      });
      return true;
    }

    async function verify() {
      try {
        const response = await fetch("/api/paystack/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference })
        });
        const payload = await response.json();
        if (cancelled) return;

        if (response.ok && payload.completed) {
          setStatus("verified");
          setMessage("Payment verified and access has been updated.");
          setPurchase(payload.purchase || null);
          if (!trackPurchase(payload.purchase)) {
            window.setTimeout(() => {
              trackPurchase(payload.purchase);
            }, 800);
          }
        } else {
          setStatus("failed");
          setMessage(payload.message || "Payment could not be verified.");
          setPurchase(payload.purchase || null);
        }
      } catch {
        if (!cancelled) {
          setStatus("failed");
          setMessage("Payment verification could not complete. Try again from this page.");
        }
      }
    }

    verify();
    return () => {
      cancelled = true;
    };
  }, [reference]);

  const verified = status === "verified";
  const verifying = status === "verifying";

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-[#f1f5f9] p-6 text-center shadow-sm">
          <div className={`mx-auto flex size-20 items-center justify-center rounded-full ${verified ? "bg-emerald-100 text-emerald-700" : "bg-white text-[#1e1616]"}`}>
            {verifying ? <Loader2 className="animate-spin" size={34} /> : verified ? <CheckCircle2 size={36} /> : <ShieldAlert size={34} />}
          </div>
          <Badge tone={verified ? "green" : verifying ? "teal" : "amber"} className="mt-6">
            {verified ? "Payment verified" : verifying ? "Verifying" : "Needs attention"}
          </Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#1e1616]">
            {verified ? "Welcome to Ubuntu Academy." : "Payment status check"}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">{message}</p>

          {reference ? (
            <div className="mx-auto mt-6 max-w-xl rounded-md bg-white p-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Reference</p>
              <p className="mt-2 break-all font-mono text-sm text-[#1e1616]">{reference}</p>
              {purchase ? (
                <p className="mt-3 text-sm text-slate-600">
                  {purchase.productName} · KES {Number(purchase.amountKes || 0).toLocaleString()} · {purchase.status}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {verified ? (
              <Button asChild variant="accent">
                <Link href="/learners">
                  Open learner workspace
                  <ReceiptText size={16} />
                </Link>
              </Button>
            ) : (
              <Button type="button" variant="accent" onClick={() => window.location.reload()} disabled={verifying || !reference}>
                Try verification again
              </Button>
            )}
            <Button asChild variant="outline">
              <Link href="/projects">Open projects</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
