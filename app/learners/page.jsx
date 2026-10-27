import Link from "next/link";
import { BookOpenCheck, CalendarClock, CreditCard, MessageSquareText } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DetailList, QuickStat } from "@/components/site-kit";
import { getLearnerWorkspace, getPaystackEvents } from "@/lib/db/loaders";
import { requireUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function LearnersPage() {
  await requireUser({ role: "learner", redirectTo: "/learners" });

  const [learnerWorkspace, paystackEvents] = await Promise.all([
    getLearnerWorkspace(),
    getPaystackEvents()
  ]);

  const successfulLearnerPayment = paystackEvents.find((event) => event.role === "learner");

  return (
    <SiteShell>
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <Badge tone="green">{learnerWorkspace.subscription.name}</Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
              {learnerWorkspace.person.name}
            </h1>
            <p className="mt-3 text-base leading-7 text-neutral-600">
              {learnerWorkspace.person.role} - {learnerWorkspace.person.location}
            </p>
            <div className="mt-6 max-w-xl">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-neutral-700">{learnerWorkspace.activeCourse.title}</span>
                <span className="text-neutral-500">{learnerWorkspace.progress}%</span>
              </div>
              <Progress value={learnerWorkspace.progress} />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <QuickStat icon={BookOpenCheck} label="active course" value={learnerWorkspace.activeCourse.duration} />
            <QuickStat icon={MessageSquareText} label="reviews" value={learnerWorkspace.submissions.length} />
            <QuickStat icon={CalendarClock} label="next session" value="Thu" />
            <QuickStat icon={CreditCard} label="subscription" value="Active" />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-neutral-950">Subscription</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-neutral-950">{learnerWorkspace.subscription.name}</p>
                    <p className="text-xs text-neutral-500">{learnerWorkspace.subscription.paystackPlanCode}</p>
                  </div>
                  <p className="text-lg font-semibold text-neutral-950">
                    KES {learnerWorkspace.subscription.priceKes.toLocaleString()}
                  </p>
                </div>
                <DetailList items={learnerWorkspace.subscription.features} />
                {successfulLearnerPayment ? (
                  <div className="rounded-lg bg-neutral-50 p-3 text-sm text-neutral-600">
                    Last payment: {successfulLearnerPayment.reference} - {successfulLearnerPayment.status}
                  </div>
                ) : null}
                <div className="rounded-lg border border-[#00b4d8]/20 bg-[#e8f8fb] p-3 text-sm text-slate-700">
                  Manage payments from checkout whenever you enroll in a course or mentorship plan.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="font-semibold text-neutral-950">Next actions</h2>
              </CardHeader>
              <CardContent>
                <DetailList items={learnerWorkspace.upcoming} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><h2 className="font-semibold text-neutral-950">Mentorship work</h2></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-slate-600">Your mentor project is chosen from your application focus. Once your place is approved and paid, build and submit it in your mentorship workspace.</p>
              <div className="flex flex-wrap gap-3"><Button asChild variant="accent"><Link href="/mentorships/apply">View application</Link></Button><Button asChild variant="outline"><Link href="/mentorships/workspace">Open mentorship work</Link></Button></div>
            </CardContent>
          </Card>
        </div>
      </section>
    </SiteShell>
  );
}

