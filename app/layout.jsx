import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ubuntuanalytiq.com";
const siteName = "Ubuntu Analytiq";
const siteDescription =
  "Ubuntu Analytiq builds Data & AI-fluent professionals and organizations through learning, mentorship, consulting, projects, capacity building, and intelligent automation grounded in real-world execution.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Ubuntu Analytiq | Data & AI Learning, Mentorship, and Consulting",
    template: "%s | Ubuntu Analytiq"
  },
  description: siteDescription,
  keywords: [
    "Ubuntu Analytiq",
    "data analytics training",
    "AI training",
    "Power BI training",
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
    title: "Ubuntu Analytiq | Data & AI Learning, Mentorship, and Consulting",
    description: siteDescription,
    images: [
      {
        url: "/images/ubuntu-data-workshop.png",
        width: 1200,
        height: 630,
        alt: "Ubuntu Analytiq Data and AI learning workspace"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ubuntu Analytiq | Data & AI Learning, Mentorship, and Consulting",
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
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/ua-icon.svg`,
    sameAs: [],
    description: siteDescription
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
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
