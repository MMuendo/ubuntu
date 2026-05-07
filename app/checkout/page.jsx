import { Suspense } from "react";
import { redirect } from "next/navigation";

import { SiteShell } from "@/components/site-shell";
import { getCurrentUser } from "@/lib/auth/session";

import { CheckoutClient } from "./checkout-client";

function buildCheckoutPath(searchParams = {}) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
    } else if (typeof value === "string") {
      params.set(key, value);
    }
  }

  const query = params.toString();
  return query ? `/checkout?${query}` : "/checkout";
}

export default async function CheckoutPage({ searchParams }) {
  const params = await searchParams;
  const user = await getCurrentUser();
  if (!user) {
    const loginRole = params?.planId === "mentor-pro" ? "mentor" : "student";
    redirect(`/login?role=${loginRole}&message=session-required&next=${encodeURIComponent(buildCheckoutPath(params))}`);
  }

  return (
    <SiteShell>
      <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-sm text-slate-600">Loading checkout...</div>}>
        <CheckoutClient currentUser={{ fullName: user.full_name || "", email: user.email || "" }} />
      </Suspense>
    </SiteShell>
  );
}
