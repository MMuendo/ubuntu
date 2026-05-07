import Link from "next/link";
import { BriefcaseBusiness, SearchCheck, ShieldCheck, UsersRound } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { employerWorkspace, projectShowcase } from "@/src/data";
import { CourseBadgeRow, DetailList, QuickStat } from "@/components/site-kit";

export default function EmployersPage() {
  return (
    <SiteShell>
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <Badge tone="teal">{employerWorkspace.subscription.name}</Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
              {employerWorkspace.company}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-600">
              Candidate search, verified project evidence, shortlists, and intro requests for hiring teams.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button variant="accent">Review shortlist</Button>
              <Button asChild variant="outline">
                <Link href="/projects/showcase">View proof gallery</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            <QuickStat icon={UsersRound} label="seats used" value={`${employerWorkspace.seatsUsed}/${employerWorkspace.seatsTotal}`} />
            <QuickStat icon={SearchCheck} label="searches" value={employerWorkspace.searchesThisMonth} />
            <QuickStat icon={BriefcaseBusiness} label="intro requests" value={employerWorkspace.introRequests} />
            <QuickStat icon={ShieldCheck} label="plan" value="Beta" />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold text-neutral-950">Verified shortlist</h2>
                <Badge tone="green">{employerWorkspace.shortlist.length} matches</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {employerWorkspace.shortlist.map((candidate) => (
                <div key={candidate.name} className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-start gap-4">
                      <img
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="size-14 rounded-lg object-cover ring-1 ring-neutral-200"
                      />
                      <div>
                        <p className="text-sm font-semibold text-neutral-950">{candidate.name}</p>
                        <p className="text-xs text-neutral-500">
                          {candidate.role} · {candidate.location}
                        </p>
                        <p className="mt-2 text-sm text-neutral-600">{candidate.proof}</p>
                        <div className="mt-3">
                          <CourseBadgeRow items={candidate.signals} />
                        </div>
                      </div>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-2xl font-semibold text-neutral-950">{candidate.match}%</p>
                      <p className="text-xs uppercase tracking-[0.14em] text-neutral-500">match</p>
                      <Button size="sm" variant="outline" className="mt-3">Request intro</Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-neutral-950">Subscription</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-950">{employerWorkspace.subscription.name}</p>
                  <p className="mt-1 text-sm text-neutral-600">
                    KES {employerWorkspace.subscription.priceKes.toLocaleString()} / {employerWorkspace.subscription.interval}
                  </p>
                </div>
                <DetailList items={employerWorkspace.subscription.features} />
                <div className="rounded-lg border border-[#00b4d8]/20 bg-[#e8f8fb] p-3 text-sm text-slate-700">
                  Contact Ubuntu Analytiq to adjust employer access, proof review, or team seats.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="font-semibold text-neutral-950">Recent proof</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                {projectShowcase.slice(0, 3).map((item) => (
                  <div key={item.id} className="rounded-lg bg-neutral-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-neutral-950">{item.learner}</p>
                      <Badge tone={item.score >= 92 ? "green" : "teal"}>{item.score}%</Badge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">{item.title}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
