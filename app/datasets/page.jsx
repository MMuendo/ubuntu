import Link from "next/link";
import { ArrowRight, DatabaseZap } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { datasetIndustries } from "@/lib/academy/site-content";
import { syntheticExamples } from "@/src/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/datasets", "Practice dataset preview", "See example data scenarios for Excel, SQL, Power BI, and AI practice with Ubuntu Analytiq.");

export default function DatasetsPage() {
  return (
    <SiteShell>
      <section className="ubuntu-solid-bg africa-watermark watermark-dark py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#72e6ff]">Practice data · preview</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Practice with data that feels close to the work around us.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">These example scenarios show the kinds of data Ubuntu uses to frame learning. Dataset generation, CSV download, and automatic walkthroughs are still being prepared.</p>
        </div>
      </section>

      <section className="ubuntu-heritage-bg py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#007c97]">Example scenarios</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#141014]">Start with a business question.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {syntheticExamples.map(([industry, columns]) => <article key={industry} className="min-w-0 rounded-xl border border-[#00b4d8]/20 bg-white p-6"><DatabaseZap size={22} className="text-[#007c97]" /><h3 className="mt-5 text-xl font-semibold text-[#141014]">{industry}</h3><p className="mt-3 text-sm leading-6 text-slate-600">Example columns</p><p className="mt-2 break-words rounded-lg bg-[#f1f5f9] p-3 font-mono text-xs leading-6 text-slate-700">{columns}</p></article>)}
          </div>
          <p className="mt-8 text-sm leading-7 text-slate-600">Other contexts include {datasetIndustries.slice(0, 8).join(", ")} and more. A mentor can help choose a project that fits your chosen tool and topic.</p>
          <Link href="/mentorships" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#007c97]">Explore project Mentorship <ArrowRight size={17} /></Link>
        </div>
      </section>
    </SiteShell>
  );
}
