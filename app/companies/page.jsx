import Link from "next/link";
import { Building2, Globe2, ShieldCheck, TrendingUp } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { academyCompanies } from "@/src/data";
import { MarqueeStrip, PageHero, SectionTitle } from "@/components/site-kit";

export default function CompaniesPage() {
  const sectors = [
    "Retail",
    "Finance",
    "Telecom",
    "Logistics",
    "SaaS",
    "Energy",
    "Mobility",
    "Payments"
  ];

  return (
    <SiteShell>
      <PageHero
        eyebrow="Business contexts"
        title="Companies learners work with"
        copy="A broad company wall keeps the product feeling active, current, and market-facing."
        primaryAction={
          <Button asChild variant="accent">
            <Link href="/pathways">Open pathways</Link>
          </Button>
        }
        secondaryAction={
          <Button asChild variant="outline">
            <Link href="/projects">Open projects</Link>
          </Button>
        }
        stats={[
          { icon: Building2, label: "companies", value: academyCompanies.length },
          { icon: Globe2, label: "markets", value: "9" },
          { icon: TrendingUp, label: "contexts", value: "8" },
          { icon: ShieldCheck, label: "signals", value: "Live" }
        ]}
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Scroll"
            title="Horizontal motion keeps the wall alive."
            copy="The company strip moves from side to side while the supporting grid stays easy to scan."
          />
          <div className="mt-8 space-y-4">
            <MarqueeStrip items={academyCompanies} />
            <MarqueeStrip items={[...academyCompanies].reverse()} reverse />
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {sectors.map((sector) => (
              <Card key={sector}>
                <CardContent className="p-5">
                  <p className="text-sm font-semibold text-neutral-950">{sector}</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    Business contexts from this category feed project briefs, scoring, and mentor feedback.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
