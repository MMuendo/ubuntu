import Link from "next/link";
import { BadgeDollarSign, CreditCard, DatabaseZap, ReceiptText, WalletCards } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DetailList, QuickStat } from "@/components/site-kit";
import { getPaystackEvents, getSubscriptionPlans } from "@/lib/db/loaders";
import { checkoutHref } from "@/lib/academy/checkout-links";

function toneForRole(role) {
  if (role === "learner") return "green";
  if (role === "mentor") return "teal";
  if (role === "employer") return "red";
  return "amber";
}

function planCta(plan) {
  if (plan.status !== "Live") {
    if (plan.role === "mentor") return "/login?role=mentor";
    if (plan.role === "employer") return "/login?role=employer";
    return "/login?role=student";
  }

  return checkoutHref({
    productType: "plan",
    productSlug: plan.id,
    productName: plan.name,
    amountKes: plan.priceKes,
    description: plan.features?.slice(0, 2).join(", ")
  });
}

export default async function BillingPage() {
  const [subscriptionPlans, paystackEvents] = await Promise.all([getSubscriptionPlans(), getPaystackEvents()]);
  const livePlans = subscriptionPlans.filter((plan) => plan.status === "Live").length;
  const totalCollected = paystackEvents
    .filter((event) => event.status === "Successful")
    .reduce((sum, event) => sum + event.amountKes, 0);

  return (
    <SiteShell>
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <Badge tone="teal">Billing</Badge>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.03] tracking-tight text-neutral-950 md:text-6xl">
              Pick what you want to use.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
              Buy mentorship, pathways, AI data credits, or employer access through secure checkout.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent" size="lg">
                <Link href="/login?role=student">Start as student</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/datasets">Open datasets</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <QuickStat icon={WalletCards} label="plans" value={subscriptionPlans.length} />
            <QuickStat icon={CreditCard} label="live plans" value={livePlans} />
            <QuickStat icon={DatabaseZap} label="AI credits" value="Included" />
            <QuickStat icon={ReceiptText} label="collected" value={`KES ${totalCollected.toLocaleString()}`} />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.id} className="flex h-full flex-col transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-sm">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <Badge tone={toneForRole(plan.role)}>{plan.role}</Badge>
                    <Badge tone={plan.status === "Live" ? "green" : "amber"}>{plan.status}</Badge>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-950">{plan.name}</h2>
                    <p className="mt-2 text-3xl font-semibold text-neutral-950">
                      {plan.priceKes === 0 ? "Included" : `KES ${plan.priceKes.toLocaleString()}`}
                    </p>
                    <p className="mt-1 text-sm text-neutral-500">{plan.interval}</p>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-4">
                  <DetailList items={plan.features} />
                  <div className="mt-auto rounded-lg bg-neutral-50 p-3 text-xs font-medium text-neutral-500">
                    {plan.interval}
                  </div>
                  <Button asChild variant={plan.status === "Live" ? "accent" : "outline"} className="w-full">
                    <Link href={planCta(plan)}>
                      {plan.status === "Live" ? "Choose plan" : "Request access"}
                      <BadgeDollarSign size={16} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-neutral-950">What billing unlocks</h2>
            </CardHeader>
            <CardContent>
              <DetailList
                items={[
                  "Student plans unlock mentorship, pathways, projects, and reviews.",
                  "AI data credits unlock synthetic datasets and generated walkthroughs.",
                  "Mentor plans unlock review queues, learner rosters, and payout tracking.",
                  "Employer access stays separate from the student learning flow."
                ]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="font-semibold text-neutral-950">Recent payments</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              {paystackEvents.slice(0, 4).map((event) => (
                <div key={event.id} className="grid gap-3 rounded-lg bg-neutral-50 p-3 md:grid-cols-[1fr_0.7fr_0.7fr] md:items-center">
                  <div>
                    <p className="text-sm font-semibold text-neutral-950">{event.customer}</p>
                    <p className="text-xs text-neutral-500">{event.reference}</p>
                  </div>
                  <p className="text-sm text-neutral-600">{event.plan}</p>
                  <div className="md:text-right">
                    <p className="text-sm font-semibold text-neutral-950">KES {event.amountKes.toLocaleString()}</p>
                    <p className="text-xs text-neutral-500">{event.status}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </SiteShell>
  );
}

