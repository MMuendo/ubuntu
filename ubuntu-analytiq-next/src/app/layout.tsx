import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Default metadata with template - prevents SEO regressions
export const metadata: Metadata = {
  title: {
    default: "Ubuntu AnalytIQ – AI & Data Training in Kenya",
    template: "%s | Ubuntu AnalytIQ",
  },
  description:
    "Master AI, Power BI & data analytics with Ubuntu AnalytIQ. Expert-led training for Kenyan professionals. Courses from KES 7,500.",
  keywords: [
    "AI Training Kenya",
    "Data Analytics Training Nairobi",
    "Power BI Training Kenya",
    "AI Consulting Kenya",
    "Agentic AI Consulting Africa",
  ],
  authors: [{ name: "Ubuntu AnalytIQ" }],
  creator: "Ubuntu AnalytIQ",
  publisher: "Ubuntu AnalytIQ",
  metadataBase: new URL("https://ubuntuanalytiq.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://ubuntuanalytiq.com",
    siteName: "Ubuntu AnalytIQ",
    title: "Ubuntu AnalytIQ – AI & Data Training in Kenya",
    description:
      "Master AI, Power BI & data analytics with Ubuntu AnalytIQ. Expert-led training for Kenyan professionals.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ubuntu AnalytIQ - AI & Data Fluency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ubuntu AnalytIQ – AI & Data Training in Kenya",
    description:
      "Master AI, Power BI & data analytics. Expert-led training for Kenyan professionals.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add Google Search Console verification when available
    // google: "your-verification-code",
  },
};

// Organization + WebSite Schema (appears on all pages)
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://ubuntuanalytiq.com/#organization",
  name: "Ubuntu AnalytIQ",
  url: "https://ubuntuanalytiq.com",
  logo: {
    "@type": "ImageObject",
    url: "https://ubuntuanalytiq.com/favicon/favicon.svg",
    width: 512,
    height: 512,
  },
  description: "AI and Data Fluency training for Kenyan professionals",
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+254706719457",
    contactType: "customer service",
    availableLanguage: ["English", "Swahili"],
  },
  sameAs: ["https://www.linkedin.com/company/106319269"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://ubuntuanalytiq.com/#website",
  url: "https://ubuntuanalytiq.com",
  name: "Ubuntu AnalytIQ",
  description: "AI & Data Fluency Training for African Professionals",
  publisher: {
    "@id": "https://ubuntuanalytiq.com/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://ubuntuanalytiq.com/blog?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="min-h-screen bg-brand-dark text-slate-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
