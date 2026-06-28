import Link from "next/link";
import { CalendarCheck, ClipboardCheck, FolderKanban, UsersRound } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DetailList, QuickStat, SectionTitle } from "@/components/site-kit";
import { getAcademyPrograms, getMentorProfiles } from "@/lib/db/loaders";
import { mentorshipCohort } from "@/lib/academy/site-content";
import { checkoutHref, mentorshipCheckoutProducts } from "@/lib/academy/checkout-links";
import { MentorSelection } from "@/app/mentorships/mentor-selection";

export default async function MentorshipsPage() {
  const [mentorProfiles, academyPrograms] = await Promise.all([getMentorProfiles(), getAcademyPrograms()]);
  const cohortCheckoutHref = checkoutHref(mentorshipCheckoutProducts.cohort2);
  const availableNames = new Set(["ezra muinde", "jacktone etemesi"]);
  const orderedMentors = [
    ...mentorProfiles.filter((mentor) => availableNames.has(String(mentor.name || "").toLowerCase())),
    ...mentorProfiles.filter((mentor) => !availableNames.has(String(mentor.name || "").toLowerCase()))
  ].slice(0, 6);
  const checkoutByMentor = Object.fromEntries(
    orderedMentors.map((mentor) => [
      mentor.id,
      checkoutHref({
        ...mentorshipCheckoutProducts.mentorBooking,
        productName: `Mentor Booking: ${mentor.name}`,
        description: `${mentor.name} mentorship booking. ${mentor.mentorshipDuration} guidance with project access.`
      })
    ])
  );

  return (
    <SiteShell>
      <section className="ubuntu-solid-bg kenya-watermark watermark-dark border-b border-slate-200 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <Badge tone="green" className="border-white/10 bg-white/10 text-[#00b4d8]">Mentorship</Badge>
            <h1 className="mt-5 text-3xl font-semibold leading-[1.05] tracking-tight text-neutral-950 sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="text-white">Six months of mentor guidance, project access, and tracked growth.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Pick a mentor by skill, goal, availability, and project type. Guidance is practical, local, and built around real work.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent" size="lg">
                <Link href="/login?role=student">Start as student</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/login?role=mentor">Mentor sign in</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <QuickStat icon={UsersRound} label="verified mentors" value={mentorProfiles.length} />
            <QuickStat icon={CalendarCheck} label="duration" value="6 months" />
            <QuickStat icon={FolderKanban} label="projects" value="Free" />
            <QuickStat icon={ClipboardCheck} label="tracking" value="Aligned" />
          </div>
        </div>
      </section>

      <section id="cohort-2" className="african-weave border-b border-slate-200 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <Card className="ubuntu-intel-card border-[#00b4d8]/30">
            <CardHeader>
              <Badge tone="teal" className="w-fit">Cohort 2</Badge>
              <h2 className="text-3xl font-semibold tracking-tight text-[#1e1616]">{mentorshipCohort.title}</h2>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <div className="ubuntu-card-field rounded-lg p-4">
                <p className="text-lg font-semibold text-[#1e1616]">{mentorshipCohort.price}</p>
                <p className="text-xs font-semibold tracking-[0.04em] text-slate-500">Intro Price</p>
              </div>
              <div className="ubuntu-card-field rounded-lg p-4">
                <p className="text-lg font-semibold text-[#1e1616]">{mentorshipCohort.duration}</p>
                <p className="text-xs font-semibold tracking-[0.04em] text-slate-500">Mentorship</p>
              </div>
              <div className="ubuntu-card-field rounded-lg p-4">
                <p className="text-lg font-semibold text-[#1e1616]">{mentorshipCohort.startDate}</p>
                <p className="text-xs font-semibold tracking-[0.04em] text-slate-500">Start Date</p>
              </div>
              <div className="ubuntu-card-field rounded-lg p-4">
                <p className="text-lg font-semibold text-[#1e1616]">{mentorshipCohort.seats}</p>
                <p className="text-xs font-semibold tracking-[0.04em] text-slate-500">Cohort Size</p>
              </div>
              <Button asChild variant="accent" className="sm:col-span-2">
                <Link href={cohortCheckoutHref}>Enroll</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="ubuntu-intel-card">
            <CardHeader>
              <h2 className="font-semibold text-[#1e1616]">Cohort details and enrollment</h2>
            </CardHeader>
            <CardContent>
              <DetailList
                items={[
                  "Mentorship means weekly direction, project review, accountability, and practical feedback tied to the learner's Data and AI goals.",
                  "The start date is the first live onboarding session, where learners confirm goals, tools, project expectations, and review rhythm.",
                  "Cohort size is capped at 10 slots so feedback stays personal and learners are not lost inside a large class.",
                  "To enroll, create your Ubuntu account, choose the cohort, complete secure checkout, and use the same email for access confirmation."
                ]}
              />
              <Button asChild variant="accent" className="mt-6">
                <Link href={cohortCheckoutHref}>Enroll</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Choose mentor"
            title="Match on the work you want to build."
            copy="Six mentor profiles are visible. Ezra and Jacktone are currently available; the other profiles are shown for context until their calendars open."
          />

          <MentorSelection mentors={orderedMentors} checkoutByMentor={checkoutByMentor} />
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-[#f8fbfd] py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-neutral-950">How the first week works</h2>
            </CardHeader>
            <CardContent>
              <DetailList
                items={[
                  "Book a mentor based on skill focus.",
                  "Agree on the best pathway and project track for your target role.",
                  "Pick the first project and dataset.",
                  "Submit work for review before moving deeper into the pathway.",
                  "Track milestones so the mentor and learner stay aligned."
                ]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="font-semibold text-neutral-950">Pathways mentors support</h2>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {academyPrograms.slice(0, 4).map((program) => (
                <Link key={program.slug} href={`/pathways/${program.slug}`} className="ubuntu-route-card rounded-lg p-4 transition duration-200">
                  <p className="text-sm font-semibold text-neutral-950">{program.title}</p>
                  <p className="mt-2 text-xs leading-5 text-neutral-500">{program.mentor.name}</p>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </SiteShell>
  );
}

