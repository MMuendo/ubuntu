import { siteUrl } from "@/lib/seo";

const staticRoutes = [
  "",
  "/for-organizations/advisory",
  "/academy",
  "/assessment",
  "/datasets",
  "/blogs",
  "/for-organizations",
  "/for-organizations/engineering",
  "/mentorships",
  "/mentorships/groups",
  "/responsible-ai",
  "/for-organizations/solution-patterns",
  "/events/data-career-reality-day",
  "/events/data-reporting-automation-doing-more-with-less",
  "/events/from-code-to-community-how-building-in-public-helps-products-win",
  "/pathways/excel-workshop",
  "/pathways/powerbi-workshop",
  "/pathways/ai-agents-masterclass",
  "/pathways/python-for-analytics",
  "/pathways/sql-for-analysts",
  "/pathways/data-fluency-for-operators-and-managers",
  "/blogs/you-dont-need-another-tool-you-need-a-system",
  "/blogs/unfortunately-it-feels-like-they-now-want-tool-mastery-rather-than-the-art",
  "/blogs/ai-is-getting-smarter-are-we",
  "/blogs/rags-retrieval-augmented-generation-simplified-for-us",
  "/blogs/african-reality-is-not-messy-it-is-intelligence",
  "/blogs/how-agentic-ai-actually-works-using-n8n",
  "/blogs/why-you-actually-need-to-learn-power-bi",
  "/blogs/phoenix-ai-summit-2025",
  "/blogs/why-excel-still-matters-in-the-age-of-ai"
];

export default function sitemap() {
  return staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/pathways") ? 0.8 : 0.7
  }));
}
