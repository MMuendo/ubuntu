import { CreditCard, DatabaseZap, FileSpreadsheet, Sparkles } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { QuickStat, SectionTitle } from "@/components/site-kit";
import { getAiUsage } from "@/lib/db/loaders";
import { SyntheticDataTool } from "@/app/synthetic-data/synthetic-data-tool";

export default async function DatasetsPage() {
  const aiUsage = await getAiUsage();

  return (
    <SiteShell>
      <section className="ubuntu-solid-bg africa-watermark watermark-dark border-b border-slate-200 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <Badge tone="teal" className="border-white/10 bg-white/10 text-[#00b4d8]">Datasets</Badge>
            <h1 className="mt-5 text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Generate practice data for African business problems.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Pick an industry, define the columns, and create clean datasets for dashboards, SQL, Excel, Power BI, or AI experiments.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <QuickStat icon={CreditCard} label="free credits" value="1,000" />
            <QuickStat icon={DatabaseZap} label="generation" value="AI-ready" />
            <QuickStat icon={FileSpreadsheet} label="output" value="CSV" />
            <QuickStat icon={Sparkles} label="industries" value="20+" />
          </div>
        </div>
      </section>

      <section className="ubuntu-heritage-bg py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Practice data"
            title="Start with 1,000 free credits."
            copy="Generate datasets for local scenarios, then use the preview or CSV in your next project."
          />
          <div className="mt-8">
            <SyntheticDataTool usage={aiUsage} />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
