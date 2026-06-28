import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Mic2, Ticket } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { academyEvents } from "@/lib/academy/site-content";
import { ShareLinkButton } from "./share-link-button";

const event = academyEvents.find((item) => item.id === "data-career-reality-day");
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.ubuntuanalytiq.com").replace(/\/$/, "");
const eventUrl = `${siteUrl}/events/data-career-reality-day`;

export const metadata = {
  title: "Data Career Reality Day",
  description:
    "An honest, peer-led Ubuntu Analytiq conversation about certificates, bootcamps, slow progress, career switches, and what helps aspiring data professionals move forward.",
  openGraph: {
    title: "Data Career Reality Day | Ubuntu Analytiq",
    description:
      "No panel. Just open mic. Real stories, real lessons, and honest conversations for aspiring data professionals.",
    url: eventUrl,
    images: [{ url: "/images/events/data-career-reality-day.png", width: 1024, height: 1536 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Career Reality Day | Ubuntu Analytiq",
    description: "No panel. Just open mic. Real stories, real lessons, real impact.",
    images: ["/images/events/data-career-reality-day.png"]
  }
};

export default function DataCareerRealityDayPage() {
  return (
    <SiteShell>
      <section className="ubuntu-solid-bg africa-watermark watermark-dark border-b border-slate-200 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <Badge tone="teal" className="w-fit border-white/10 bg-white/10 text-[#00b4d8]">
              Coming Soon
            </Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              Data Career Reality Day
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              An honest, peer-led conversation about certificates, bootcamps, slow progress, career switches, and what actually helps aspiring data professionals move forward.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent" size="lg" className="w-full sm:w-auto">
                <Link href={event.formUrl} target="_blank" rel="noreferrer">
                  Share your email
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <ShareLinkButton url={eventUrl} />
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-md justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2 shadow-2xl lg:max-w-lg">
            <img
              src={event.poster}
              alt="Data Career Reality Day poster"
              className="max-h-[78vh] w-auto max-w-full rounded-md object-contain lg:max-h-[760px]"
            />
          </div>
        </div>
      </section>

      <section className="ubuntu-heritage-bg kenya-watermark py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <Card className="ubuntu-intel-card">
              <CardContent className="flex items-center gap-3 p-4">
                <CalendarDays className="text-[#00b4d8]" size={22} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Date</p>
                  <p className="font-semibold text-[#1e1616]">August 2026</p>
                </div>
              </CardContent>
            </Card>
            <Card className="ubuntu-intel-card">
              <CardContent className="flex items-center gap-3 p-4">
                <MapPin className="text-[#00b4d8]" size={22} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Venue</p>
                  <p className="font-semibold text-[#1e1616]">TBC</p>
                </div>
              </CardContent>
            </Card>
            <Card className="ubuntu-intel-card">
              <CardContent className="flex items-center gap-3 p-4">
                <Ticket className="text-[#00b4d8]" size={22} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Charges</p>
                  <p className="font-semibold text-[#1e1616]">TBC</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="ubuntu-intel-card">
            <CardContent className="p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-[#1e1616] text-[#00b4d8]">
                  <Mic2 size={22} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#007c97]">No panel. Just open mic.</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#1e1616]">Real stories. Real lessons. Real impact.</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    This is for aspiring data professionals, career switchers, learners, analysts, and anyone trying to understand what progress really looks like in data work.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {event.topics.map((topic) => (
                  <div key={topic} className="rounded-lg bg-[#f1f5f9] p-4 text-sm font-semibold leading-6 text-slate-700">
                    {topic}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </SiteShell>
  );
}
