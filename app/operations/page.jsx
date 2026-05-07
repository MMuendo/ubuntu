import Link from "next/link";
import { BadgeCheck, Inbox, ShieldCheck, Users2 } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { mentorApplicants, mentorDailyPlan } from "@/src/data";
import { PageHero, SectionTitle } from "@/components/site-kit";

function applicantTone(status) {
  if (status === "Approved") return "green";
  if (status === "In review") return "teal";
  return "amber";
}

export default function OperationsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Operations"
        title="Mentor verification stays scan-friendly"
        copy="The review queue looks like a work system, not a decorative panel, so the team can move quickly."
        primaryAction={
          <Link href="/pathways">
            <Badge tone="teal">Queue live</Badge>
          </Link>
        }
        secondaryAction={
          <Link href="/dashboard">
            <Badge tone="default">Admin view</Badge>
          </Link>
        }
        stats={[
          { icon: Users2, label: "applicants", value: mentorApplicants.length },
          { icon: Inbox, label: "reviewed", value: mentorApplicants.filter((a) => a.status !== "Needs clarification").length },
          { icon: BadgeCheck, label: "approved", value: mentorApplicants.filter((a) => a.status === "Approved").length },
          { icon: ShieldCheck, label: "verified", value: "Yes" }
        ]}
      />

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-neutral-950">Today</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              {mentorDailyPlan.map((item) => (
                <div key={item.title} className="rounded-xl bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-950">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{item.note}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="font-semibold text-neutral-950">Mentor applicants</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {mentorApplicants.map((applicant) => (
                <div key={applicant.id} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={applicant.avatar}
                        alt={applicant.name}
                        className="size-12 rounded-2xl object-cover ring-1 ring-neutral-200"
                      />
                      <div>
                        <p className="text-sm font-semibold text-neutral-950">{applicant.name}</p>
                        <p className="text-xs text-neutral-500">
                          {applicant.title} · {applicant.location}
                        </p>
                      </div>
                    </div>
                    <Badge tone={applicantTone(applicant.status)}>{applicant.status}</Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">{applicant.teachingSignal}</p>
                  <p className="mt-2 text-xs text-neutral-500">{applicant.nextStep}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Verification"
            title="Cleaner than a noisy sidebar"
            copy="Each applicant card is built to be scanned quickly, approved quickly, and tracked cleanly."
          />
        </div>
      </section>
    </SiteShell>
  );
}
