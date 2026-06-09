const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ubuntuanalytiq.com";

const staticRoutes = [
  "",
  "/academy",
  "/assessment",
  "/blogs",
  "/mentorships",
  "/projects",
  "/datasets",
  "/events/data-career-reality-day",
  "/events/data-reporting-automation-doing-more-with-less",
  "/proof",
  "/companies",
  "/operations",
  "/pathways",
  "/projects/showcase",
  "/pathways/excel-workshop",
  "/pathways/powerbi-workshop",
  "/pathways/ai-agents-masterclass",
  "/pathways/python-for-analytics",
  "/pathways/sql-for-analysts",
  "/pathways/data-fluency-for-operators-and-managers",
  "/blogs/you-dont-need-another-tool-you-need-a-system",
  "/blogs/how-agentic-ai-actually-works-using-n8n",
  "/blogs/why-you-actually-need-to-learn-power-bi",
  "/blogs/phoenix-ai-agents-summit-2025-building-for-us",
  "/blogs/why-excel-still-matters-in-the-age-of-ai"
];

export default function sitemap() {
  const now = new Date();

  return staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/pathways") ? 0.8 : 0.7
  }));
}
