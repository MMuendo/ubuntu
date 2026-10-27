import "./globals.css";
import { organizationId, siteUrl } from "@/lib/seo";

const siteName = "Ubuntu Analytiq";
const siteDescription =
  "Project mentorship for individuals and Data & AI engineering consultancy for organizations in Kenya and beyond.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Ubuntu Analytiq | Mentorship and Data & AI Engineering",
    template: "%s | Ubuntu Analytiq"
  },
  description: siteDescription,
  keywords: [
    "Ubuntu Analytiq",
    "data migration consultancy Kenya",
    "data engineering Kenya",
    "analytics engineering Kenya",
    "AI engineering Kenya",
    "project mentorship Kenya",
    "Data and AI training",
    "AI advisory Africa",
    "AI advisory Kenya",
    "AI solutions Kenya",
    "agentic AI solutions",
    "responsible AI advisory",
    "Power BI training",
    "Power BI training Kenya",
    "Excel training Kenya",
    "Python for data analytics",
    "data mentorship",
    "AI consulting",
    "business intelligence Kenya",
    "data strategy",
    "AI automation"
  ],
  authors: [{ name: "Ubuntu Analytiq" }],
  creator: "Ubuntu Analytiq",
  publisher: "Ubuntu Analytiq",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/ua-icon.svg", type: "image/svg+xml" }
    ],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }]
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteUrl,
    siteName,
    title: "Ubuntu Analytiq | Mentorship and Data & AI Engineering",
    description: siteDescription,
    images: [
      {
        url: "/images/ubuntu-data-workshop.png",
        width: 1672,
        height: 941,
        alt: "Ubuntu Analytiq Data and AI learning workspace"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ubuntu Analytiq | Mentorship and Data & AI Engineering",
    description: siteDescription,
    images: ["/images/ubuntu-data-workshop.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({ children }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/ua-icon.svg`,
    sameAs: ["https://www.facebook.com/profile.php?id=61590134952098", "https://www.instagram.com/ubuntuanalytiq/"],
    email: "ezra@ubuntuanalytiq.com",
    telephone: "+254732277459",
    address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
    description: siteDescription
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    publisher: { "@id": organizationId },
    name: siteName,
    url: siteUrl,
    description: siteDescription
  };

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema]) }}
        />
        {children}
      </body>
    </html>
  );
}
