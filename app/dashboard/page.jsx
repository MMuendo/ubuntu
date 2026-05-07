import Link from "next/link";
import { Clock3, LayoutDashboard, MessageSquareText, TrendingUp, Users2 } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { learnerRoster, mentorDashboardMetrics, mentorDailyPlan, reviewQueue } from "@/src/data";
import { PageHero, QuickStat, SectionTitle } from "@/components/site-kit";

function statusTone(value) {
  if (value === "Healthy") return "green";
  if (value === "Watch") return "amber";
  return "red";
}

export default function DashboardPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Dashboard"
        title="What needs attention next"
        copy="The dashboard makes progress, review queues, and learner risk visible in one place."
        primaryAction={
          <Link href="/projects">
            <Badge tone="teal">Live</Badge>
          </Link>
        }
        secondaryAction={
          <Link href="/operations">
            <Badge tone="default">Mentor view</Badge>
          </Link>
        }
        stats={[
          { icon: Users2, label: "active learners", value: mentorDashboardMetrics.activeLearners },
          { icon: MessageSquareText, label: "reviews", value: mentorDashboardMetrics.queueCount },
          { icon: TrendingUp, label: "completion", value: `${mentorDashboardMetrics.completionRate}%` },
          { icon: Clock3, label: "sessions", value: mentorDashboardMetrics.sessionsThisWeek }
        ]}
      />

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="grid gap-4 md:grid-cols-2">
            <QuickStat icon={Users2} label="active learners" value={mentorDashboardMetrics.activeLearners} />
            <QuickStat icon={LayoutDashboard} label="sessions this week" value={mentorDashboardMetrics.sessionsThisWeek} />
            <QuickStat icon={TrendingUp} label="completion rate" value={`${mentorDashboardMetrics.completionRate}%`} />
            <QuickStat icon={MessageSquareText} label="review queue" value={mentorDashboardMetrics.queueCount} />
          </div>

          <Card>
            <CardHeader>
              <h2 className="font-semibold text-neutral-950">Mentor daily plan</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {mentorDailyPlan.map((item) => (
                <div key={item.title} className="rounded-xl bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-950">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{item.note}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-neutral-950">Learner roster</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              {learnerRoster.map((learner) => (
                <div key={learner.id} className="flex items-center justify-between gap-4 rounded-xl bg-neutral-50 p-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-neutral-950">{learner.name}</p>
                    <p className="truncate text-xs text-neutral-500">
                      {learner.pathway} · {learner.stage}
                    </p>
                  </div>
                  <Badge tone={statusTone(learner.risk)}>{learner.risk}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="font-semibold text-neutral-950">Review queue</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviewQueue.map((review) => (
                <div key={review.id} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
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
        </div>
      </section>
    </SiteShell>
  );
}
