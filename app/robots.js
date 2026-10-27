import { siteUrl } from "@/lib/seo";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/learners", "/mentors$", "/mentors/", "/checkout", "/api", "/operations", "/dashboard", "/billing", "/proof", "/companies", "/mentorships/workspace"]
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}
