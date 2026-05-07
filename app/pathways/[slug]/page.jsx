import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, Clock3, Sparkles, Users2 } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ubuntuCourses } from "@/lib/academy/catalog";
import { CourseBadgeRow, DetailCTA, DetailList, PageHero, SectionTitle } from "@/components/site-kit";
import { getAcademyPrograms } from "@/lib/db/loaders";
import { checkoutHref } from "@/lib/academy/checkout-links";

export function generateStaticParams() {
  return ubuntuCourses.map((program) => ({ slug: program.slug }));
}

function formatStartDate(value) {
  if (!value) return "To be announced";
  const date = value instanceof Date ? value : new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" });
}

function hasWorkingWithDataDiscount(program) {
  return ["working-with-data-for-professionals", "data-fluency-for-operators-and-managers"].includes(program.slug);
}

export default async function PathwayDetailPage({ params }) {
  const { slug } = await params;
  const programs = await getAcademyPrograms();
  const program = programs.find((item) => item.slug === slug);

  if (!program) {
    notFound();
  }

  const enrollHref = checkoutHref({
    productType: "course",
    productSlug: program.slug,
    productName: program.title,
    amountKes: program.priceKes,
    description: program.summary
  });

  return (
    <SiteShell>
      <PageHero
        eyebrow={program.category}
        title={program.title}
        copy={program.summary}
        primaryAction={
          <Button asChild variant="accent" className="w-full sm:w-auto">
            <Link href={enrollHref}>Enroll</Link>
          </Button>
        }
        secondaryAction={
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/projects">Open project briefs</Link>
          </Button>
        }
        stats={[
          { icon: Clock3, label: "duration", value: program.duration },
          { icon: Award, label: "level", value: program.level },
          { icon: Users2, label: "mentor", value: program.mentor.name.split(" ")[0] },
          { icon: Sparkles, label: "price", value: `KES ${program.priceKes.toLocaleString()}` }
        ]}
        mobileCompact
      />

      <section className="py-10 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <Card>
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <Badge tone="teal">Mentor</Badge>
                <Badge tone="default">{program.mentor.experience}</Badge>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <img
                  src={program.mentor.avatar}
                  alt={program.mentor.name}
                  className="size-14 rounded-2xl object-cover ring-1 ring-neutral-200 sm:size-16"
                />
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold text-neutral-950">{program.mentor.name}</h2>
                  <p className="text-sm text-neutral-600">
                    {program.instructorTitle || program.mentor.title} · {program.mentor.company} · {program.mentor.location}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">{program.mentor.bio}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm font-semibold text-neutral-950">What this pathway covers</p>
              <DetailList items={program.outcomes} />
              <CourseBadgeRow items={program.tools} />
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-neutral-950">Modules</h3>
              </CardHeader>
              <CardContent>
                <DetailList items={program.modules} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold text-neutral-950">Start Date</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-xl bg-[#e8f8fb] p-4">
                  <p className="text-lg font-semibold text-neutral-950">{formatStartDate(program.startDate)}</p>
                  <p className="mt-1 text-sm text-neutral-600">{program.schedule || "Schedule will be confirmed before enrollment."}</p>
                </div>
                {hasWorkingWithDataDiscount(program) ? (
                  <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[#00b4d8]/20 bg-white p-4">
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-500 line-through">KES 12,500</span>
                    <span className="rounded-md bg-[#1e1616] px-2.5 py-1 text-sm font-semibold text-white">KES {program.priceKes.toLocaleString()}</span>
                    <span className="text-sm font-medium text-slate-600">discount price</span>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold text-neutral-950">Projects</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                {program.projects.map((project) => (
                  <div key={project} className="rounded-xl bg-neutral-50 p-3 text-sm text-neutral-700">
                    {project}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="pb-10 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Market fit"
            title="Demand and roles"
            copy="See the roles, demand areas, and next steps this pathway prepares you for."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="space-y-3 p-5">
                <p className="text-sm font-semibold text-neutral-950">Roles</p>
                <CourseBadgeRow items={program.roles} />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-3 p-5">
                <p className="text-sm font-semibold text-neutral-950">Demand areas</p>
                <CourseBadgeRow items={program.demand} />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-3 p-5">
                <p className="text-sm font-semibold text-neutral-950">Next move</p>
                <p className="text-sm leading-6 text-neutral-600">
                  Pair this pathway with project submissions and mentor feedback to generate proof that hiring managers can scan.
                </p>
                <DetailCTA href={enrollHref} label="Enroll" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

