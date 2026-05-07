import Link from "next/link";
import { Banknote, ClipboardList, MessageSquareText, Star, UsersRound } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { learnerRoster } from "@/src/data";
import { DetailList, QuickStat } from "@/components/site-kit";
import { getMentorWorkspace } from "@/lib/db/loaders";
import { requireUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

function riskTone(risk) {
  if (risk === "Healthy") return "green";
  if (risk === "Watch") return "amber";
  return "red";
}

const messages = {
  "mentor-pending": "Your mentor profile is pending review. You can still prepare project proposals while the admin team reviews your application."
};

export default async function MentorsPage({ searchParams }) {
  await requireUser({ role: "mentor", redirectTo: "/mentors", statuses: ["active", "pending"] });

  const params = await searchParams;
  const message = messages[params?.message];
  const mentorWorkspace = await getMentorWorkspace();

  return (
    <SiteShell>
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="flex items-start gap-4">
            <img
              src={mentorWorkspace.mentor.avatar}
              alt={mentorWorkspace.mentor.name}
              className="size-16 rounded-lg object-cover ring-1 ring-neutral-200"
            />
            <div>
              <Badge tone="green">{mentorWorkspace.subscription.name}</Badge>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
                {mentorWorkspace.mentor.name}
              </h1>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                {mentorWorkspace.mentor.title} - {mentorWorkspace.mentor.company}
              </p>
              {message ? (
                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-medium text-amber-900">
                  {message}
                </div>
              ) : null}
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            <QuickStat icon={UsersRound} label="learners" value={mentorWorkspace.learners.length} />
            <QuickStat icon={MessageSquareText} label="reviews" value={mentorWorkspace.queue.length} />
            <QuickStat icon={Banknote} label="expected" value={`KES ${mentorWorkspace.payout.expectedKes.toLocaleString()}`} />
            <QuickStat icon={Star} label="rating" value={mentorWorkspace.reputation.rating} />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-neutral-950">Review queue</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                {mentorWorkspace.queue.map((review) => (
                  <div key={review.id} className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-neutral-950">{review.learner}</p>
                        <p className="text-xs text-neutral-500">{review.project}</p>
                      </div>
                      <Badge tone={review.score >= 90 ? "green" : review.score >= 80 ? "amber" : "red"}>{review.score}%</Badge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-neutral-600">{review.issue}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="font-semibold text-neutral-950">Learners</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                {learnerRoster.map((learner) => (
                  <div key={learner.id} className="flex items-center justify-between gap-4 rounded-lg bg-neutral-50 p-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-neutral-950">{learner.name}</p>
                      <p className="truncate text-xs text-neutral-500">{learner.pathway} - {learner.nextAction}</p>
                    </div>
                    <Badge tone={riskTone(learner.risk)}>{learner.risk}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-neutral-950">Subscription and payout</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-950">{mentorWorkspace.subscription.name}</p>
                  <p className="mt-1 text-sm text-neutral-600">
                    KES {mentorWorkspace.subscription.priceKes.toLocaleString()} / {mentorWorkspace.subscription.interval}
                  </p>
                </div>
                <DetailList items={mentorWorkspace.subscription.features} />
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-lg border border-neutral-200 p-3">
                    <p className="text-sm font-semibold text-neutral-950">Paid</p>
                    <p className="mt-1 text-sm text-neutral-600">KES {mentorWorkspace.payout.paidKes.toLocaleString()}</p>
                  </div>
                  <div className="rounded-lg border border-neutral-200 p-3">
                    <p className="text-sm font-semibold text-neutral-950">Expected</p>
                    <p className="mt-1 text-sm text-neutral-600">KES {mentorWorkspace.payout.expectedKes.toLocaleString()}</p>
                  </div>
                  <div className="rounded-lg border border-neutral-200 p-3">
                    <p className="text-sm font-semibold text-neutral-950">Next</p>
                    <p className="mt-1 text-sm text-neutral-600">{mentorWorkspace.payout.nextPayout}</p>
                  </div>
                </div>
                <div className="rounded-lg border border-[#00b4d8]/20 bg-[#e8f8fb] p-3 text-sm text-slate-700">
                  Payout updates are shared after reviewed sessions and approved project work.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="font-semibold text-neutral-950">Reputation</h2>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-3">
                <QuickStat icon={Star} label="rating" value={mentorWorkspace.reputation.rating} />
                <QuickStat icon={MessageSquareText} label="reviews" value={mentorWorkspace.reputation.reviews} />
                <QuickStat icon={UsersRound} label="repeat" value={mentorWorkspace.reputation.repeatLearners} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="font-semibold text-neutral-950">Project proposals</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-neutral-50 p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#1e1616] text-white">
                      <ClipboardList size={18} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-neutral-950">Submit briefs for approval</p>
                      <p className="mt-2 text-sm leading-6 text-neutral-600">
                        Admin approval turns mentor-created ideas into official project briefs and unlocks mentor credits.
                      </p>
                    </div>
                  </div>
                </div>
                <Button asChild variant="accent" className="w-full">
                  <Link href="/projects/propose">Propose a project</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

