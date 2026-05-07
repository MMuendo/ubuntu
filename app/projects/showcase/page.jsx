import Link from "next/link";
import { Award, Sparkles, Star, Users2 } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { projectShowcase } from "@/src/data";
import { PageHero, ShowcaseCard, SectionTitle } from "@/components/site-kit";

export default function ShowcasePage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Project showcase"
        title="Learner projects presented like portfolio case studies"
        copy="This page feels closer to a polished showcase than a classroom gallery, so the strongest work stands on its own."
        primaryAction={
          <Button asChild variant="accent">
            <Link href="/projects">Open projects</Link>
          </Button>
        }
        secondaryAction={
          <Button asChild variant="outline">
            <Link href="/pathways">Open pathways</Link>
          </Button>
        }
        stats={[
          { icon: Award, label: "featured", value: projectShowcase.length },
          { icon: Star, label: "avg score", value: "91%" },
          { icon: Users2, label: "learners", value: "6" },
          { icon: Sparkles, label: "market ready", value: "Live" }
        ]}
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Gallery"
            title="A clean gallery for strong work"
            copy="Maven-style structure, with cards that read like short case studies instead of cluttered class assignments."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projectShowcase.map((item) => (
              <ShowcaseCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
