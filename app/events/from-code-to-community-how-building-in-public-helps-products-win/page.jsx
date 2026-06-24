import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Mic2, Ticket } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { academyEvents } from "@/lib/academy/site-content";
import { ShareLinkButton } from "../data-career-reality-day/share-link-button";

const event = academyEvents.find((item) => item.id === "from-code-to-community-how-building-in-public-helps-products-win");
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.ubuntuanalytiq.com").replace(/\/$/, "");
const eventUrl = `${siteUrl}/events/from-code-to-community-how-building-in-public-helps-products-win`;

export const metadata = {
  title: "From Code to Community: How Building in Public Helps Products Win",
  description:
    "A live Ubuntu Analytiq webinar with Joseph Henry on building with users, sharing the product journey, gathering feedback, and growing trust through community.",
  openGraph: {
    title: "From Code to Community | Ubuntu Analytiq",
    description:
      "Join Joseph Henry for a practical Microsoft Teams webinar on how building in public helps products win.",
    url: eventUrl,
    images: [{ url: "/images/events/from-code-to-community.png", width: 1024, height: 1536 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "From Code to Community | Ubuntu Analytiq",
    description: "How building in public helps products win.",
    images: ["/images/events/from-code-to-community.png"]
  }
};

export default function FromCodeToCommunityPage() {
  return (
    <SiteShell>
      <section className="ubuntu-solid-bg africa-watermark watermark-dark border-b border-slate-200 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <Badge tone="teal" className="w-fit border-white/10 bg-white/10 text-[#00b4d8]">
              Live Webinar
            </Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              From Code to Community
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              How building in public helps products win. A practical Microsoft Teams webinar for founders, builders, and product teams learning how to build with users, earn trust, and grow through real feedback.
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

          <div className="mx-auto flex w-full max-w-md justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5 p-2 shadow-2xl lg:max-w-lg">
            <img
              src={event.poster}
              alt="From Code to Community webinar poster"
              className="max-h-[78vh] w-auto max-w-full rounded-md object-contain lg:max-h-[760px]"
            />
          </div>
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
                  <p className="font-semibold text-[#1e1616]">Tuesday, 21 July 2026</p>
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
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#007c97]">Guest speaker: Joseph Henry</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#1e1616]">Build with your users, not just for them.</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Joseph Henry, founder of Hoops Ke and GlideX, will unpack how sharing the product journey, inviting feedback, and earning community trust can help products grow with sharper signals from the market.
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
