import { Suspense } from "react";

import { SiteShell } from "@/components/site-shell";

import { SuccessClient } from "./success-client";

export default function SuccessPage() {
  return (
    <SiteShell>
      <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-sm text-slate-600">Verifying payment...</div>}>
        <SuccessClient />
      </Suspense>
    </SiteShell>
  );
}
