const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ubuntuanalytiq.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/learners", "/mentors", "/checkout", "/api"]
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}
