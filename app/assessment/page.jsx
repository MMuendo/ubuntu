import { SiteShell } from "@/components/site-shell";

import { AssessmentClient } from "./assessment-client";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/assessment", "Data & AI Learning Assessment", "Find the right starting point for Excel, Power BI, AI, SQL, and Python with Ubuntu Analytiq.");

export default function AssessmentPage() {
  return (
    <SiteShell>
      <AssessmentClient />
    </SiteShell>
  );
}
