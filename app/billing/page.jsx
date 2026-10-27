import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteShell } from "@/components/site-shell";

export const metadata = {
  title: "Offers and payment",
  description: "See how Ubuntu Analytiq courses, Mentorship, and organization consultancy are scoped before payment."
};

export default function BillingPage() {
  return (
    <SiteShell>
      <section className="ubuntu-solid-bg africa-watermark watermark-dark py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#72e6ff]">Offers and payment</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">Know what is included before you pay.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Courses show their own fees and included support. Mentorship scope, sessions, and price are confirmed after personal review. Organization work is proposed after discovery.</p>
        </div>
      </section>
      <section className="ubuntu-heritage-bg py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            { title: "Courses", copy: "See the fee and learning format on each course page. Start dates are to be confirmed.", href: "/academy", action: "Browse courses" },
            { title: "Mentorship", copy: "Choose a tool, topic, and support tier. We confirm the project, sessions, and price after review.", href: "/mentorships", action: "Explore Mentorship" },
            { title: "Organization consultancy", copy: "Tell us your current systems and intended result. We agree a scope before proposing the work.", href: "/for-organizations", action: "Discuss a project" }
          ].map((offer) => <article key={offer.title} className="flex flex-col rounded-xl border border-[#00b4d8]/20 bg-white p-6"><h2 className="text-xl font-semibold text-[#141014]">{offer.title}</h2><p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{offer.copy}</p><Link href={offer.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#007c97]">{offer.action}<ArrowRight size={16} /></Link></article>)}
        </div>
      </section>
    </SiteShell>
  );
}
