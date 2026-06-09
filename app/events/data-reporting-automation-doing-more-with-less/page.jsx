import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Mic2, Ticket } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { academyEvents } from "@/lib/academy/site-content";
import { ShareLinkButton } from "../data-career-reality-day/share-link-button";

const event = academyEvents.find((item) => item.id === "data-reporting-automation-doing-more-with-less");
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.ubuntuanalytiq.com").replace(/\/$/, "");
const eventUrl = `${siteUrl}/events/data-reporting-automation-doing-more-with-less`;

export const metadata = {
  title: "Data & Reporting Automation: Doing More with Less",
  description:
    "A live Ubuntu Analytiq webinar on the cost of manual reporting, automating reports with limited resources, and Power BI automated reporting pipelines.",
  openGraph: {
    title: "Data & Reporting Automation: Doing More with Less | Ubuntu Analytiq",
    description:
      "Join Jacktone Etemesi and Mary Wachira for a practical Microsoft Teams webinar on reporting automation and Power BI pipelines.",
    url: eventUrl
  },
  twitter: {
    card: "summary_large_image",
    title: "Data & Reporting Automation: Doing More with Less | Ubuntu Analytiq",
    description: "A practical live webinar on reporting automation, limited resources, and Power BI pipelines."
  }
};

export default function DataReportingAutomationPage() {
  return (
    <SiteShell>
      <section className="ubuntu-solid-bg africa-watermark watermark-dark border-b border-slate-200 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <Badge tone="teal" className="w-fit border-white/10 bg-white/10 text-[#00b4d8]">
              Live Webinar
            </Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              Data & Reporting Automation: Doing More with Less
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              A practical Microsoft Teams webinar for professionals who want to reduce manual reporting work, automate with limited resources, and build cleaner Power BI reporting pipelines.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent" size="lg" className="w-full sm:w-auto">
                <Link href={event.formUrl} target="_blank" rel="noreferrer">
                  Register now
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <ShareLinkButton url={eventUrl} />
            </div>
          </div>

          {event.poster ? (
            <div className="mx-auto flex w-full max-w-md justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2 shadow-2xl lg:max-w-lg">
              <img
                src={event.poster}
                alt="Data and Reporting Automation webinar poster"
                className="max-h-[78vh] w-auto max-w-full rounded-md object-contain lg:max-h-[760px]"
              />
            </div>
          ) : (
            <div className="rounded-lg border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00b4d8]">What you'll learn</p>
              <div className="mt-5 grid gap-3">
                {event.topics.slice(0, 3).map((topic, index) => (
                  <div key={topic} className="flex items-start gap-3 rounded-lg bg-white/10 p-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[#00b4d8] text-sm font-bold text-[#1e1616]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-1 text-base font-semibold leading-6 text-white">{topic}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="ubuntu-heritage-bg kenya-watermark py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <Card className="bg-white/95">
              <CardContent className="flex items-center gap-3 p-4">
                <CalendarDays className="text-[#00b4d8]" size={22} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Date</p>
                  <p className="font-semibold text-[#1e1616]">Wednesday, 24 June 2026</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/95">
              <CardContent className="flex items-center gap-3 p-4">
                <MapPin className="text-[#00b4d8]" size={22} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Platform</p>
                  <p className="font-semibold text-[#1e1616]">Microsoft Teams</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/95">
              <CardContent className="flex items-center gap-3 p-4">
                <Ticket className="text-[#00b4d8]" size={22} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Time</p>
                  <p className="font-semibold text-[#1e1616]">7:00 PM - 8:30 PM EAT</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/95">
            <CardContent className="p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-[#1e1616] text-[#00b4d8]">
                  <Mic2 size={22} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#007c97]">Guest speaker: Jacktone Etemesi</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#1e1616]">Reporting automation for teams doing more with less.</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Hosted by Mary Wachira, Programs Lead at Ubuntu Analytiq, this session focuses on practical reporting challenges and the steps teams can take before automation becomes expensive or overbuilt.
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
