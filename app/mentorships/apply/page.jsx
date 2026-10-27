import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUser, hasRole } from "@/lib/auth/session";
import { isDatabaseReady } from "@/lib/db/client";
import { getProjectBriefs } from "@/lib/db/loaders";
import { ApplicationForm } from "./application-form";
import { whatsappHref } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function ApplyPage({ searchParams }) {
  const params = await searchParams;
  const returnParams = new URLSearchParams();
  if (typeof params?.tier === "string") returnParams.set("tier", params.tier);
  if (typeof params?.project === "string") returnParams.set("project", params.project);
  const returnPath = `/mentorships/apply${returnParams.size ? `?${returnParams.toString()}` : ""}`;
  const [user, projects] = await Promise.all([getCurrentUser(), getProjectBriefs()]);
  const ready = await isDatabaseReady();
  const canApply = user && hasRole(user, "learner");
  return (
    <SiteShell>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <Link href="/mentorships" className="text-sm font-semibold text-[#007c97]">← Mentorship</Link>
        <h1 className="mt-5 text-4xl font-semibold text-[#1e1616]">Apply for mentorship</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Tell us what you want to build. We review every application before confirming sessions and payment.</p>
        {!ready ? (
          <Card className="mt-8"><CardContent className="p-6"><h2 className="font-semibold">Online applications are not open yet.</h2><p className="mt-2 text-sm text-slate-600">You can ask about Mentorship on WhatsApp while applications are unavailable.</p><Button asChild variant="accent" className="mt-5"><a href={whatsappHref("Hello Ubuntu Analytiq, I would like to ask about Data & AI mentorship. My tool or topic is: ")} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a></Button></CardContent></Card>
        ) : !canApply ? (
          <Card className="mt-8"><CardContent className="p-6"><h2 className="font-semibold">Sign in as a mentee to continue.</h2><p className="mt-2 text-sm text-slate-600">Your application will be saved to your account so you can track the decision.</p><div className="mt-5 flex gap-3"><Button asChild variant="accent"><Link href={`/signup?role=student&next=${encodeURIComponent(returnPath)}`}>Create account</Link></Button><Button asChild variant="outline"><Link href={`/login?role=student&next=${encodeURIComponent(returnPath)}`}>Log in</Link></Button></div></CardContent></Card>
        ) : (
          <ApplicationForm projects={projects.map(({ slug, title, track, skills, summary }) => ({ slug, title, track, skills, summary }))} initialTier={params?.tier} initialProject={params?.project} />
        )}
      </section>
    </SiteShell>
  );
}
