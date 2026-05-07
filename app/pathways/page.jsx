import Link from "next/link";
import { BookOpenCheck, GraduationCap, Sparkles, Users2 } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { PageHero, ProgramCard, QuickStat, SectionTitle } from "@/components/site-kit";
import { getAcademyPrograms, getMentorProfiles } from "@/lib/db/loaders";

export default async function PathwaysPage() {
  const [academyPrograms, mentorProfiles] = await Promise.all([getAcademyPrograms(), getMentorProfiles()]);

  return (
    <SiteShell>
      <PageHero
        eyebrow="Pathways"
        title="Choose the path after mentor matching"
        copy="Each pathway includes the mentor, outcomes, tools, and projects students need to build visible proof."
        primaryAction={
          <Button asChild variant="accent">
            <Link href="/mentorships">Find a mentor</Link>
          </Button>
        }
        secondaryAction={
          <Button asChild variant="outline">
            <Link href="/projects">Open projects</Link>
          </Button>
        }
        stats={[
          { icon: BookOpenCheck, label: "pathways", value: academyPrograms.length },
          { icon: Users2, label: "mentors", value: mentorProfiles.length },
          { icon: GraduationCap, label: "levels", value: "3" },
          { icon: Sparkles, label: "fresh cohorts", value: "Live" }
        ]}
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Catalog"
            title="Production pathways with mentors attached."
            copy="Students can compare level, price, mentor, modules, and project outcomes before starting."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {academyPrograms.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <QuickStat icon={BookOpenCheck} label="Course family" value={academyPrograms.length} />
            <QuickStat icon={Users2} label="Mentor-led cards" value={academyPrograms.length} />
            <QuickStat icon={Sparkles} label="Local market focus" value="Africa-first" />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

