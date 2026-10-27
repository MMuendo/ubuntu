import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { whatsappHref } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/mentorships/groups", "Group Data & AI Mentorship in Kenya", "Plan a tailored data and AI mentorship programme for your team or community. Choose a topic, project goal, and group size with Ubuntu Analytiq.");

export default function GroupMentorshipPage() {
  return <SiteShell><section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
    <Link href="/mentorships" className="text-sm font-semibold text-[#007c97]">← Mentorship</Link>
    <h1 className="mt-5 text-4xl font-semibold text-[#1e1616]">Plan mentorship for your group</h1>
    <p className="mt-3 text-slate-600">Tell us who is learning and what they need to build. We will review the request and propose a tailored scope and price.</p>
    <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"><p className="text-sm leading-7 text-slate-600">Tell us your group size, the tool or topic, and what the group should be able to do. WhatsApp opens with these prompts ready; review and send the message there.</p><Button asChild variant="accent" className="mt-5"><a href={whatsappHref("Hello Ubuntu Analytiq, I would like to discuss group mentorship.\nGroup size: \nTool or topic: \nWhat we want to build: ")} target="_blank" rel="noopener noreferrer">Continue in WhatsApp</a></Button></div>
  </section></SiteShell>;
}
