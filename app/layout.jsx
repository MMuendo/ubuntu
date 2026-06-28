import "./globals.css";
import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ubuntuanalytiq.com";
const siteName = "Ubuntu Analytiq";
const siteDescription =
  "African AI advisory, agentic AI solutions, reporting automation, and practical Data & AI training for organizations and learners.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Ubuntu Analytiq | African AI Advisory, Solutions, and Data & AI Training",
    template: "%s | Ubuntu Analytiq"
  },
  description: siteDescription,
  keywords: [
    "Ubuntu Analytiq",
    "data analytics training",
    "Data and AI training",
    "AI training",
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
    title: "Ubuntu Analytiq | African AI Advisory, Solutions, and Data & AI Training",
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
    title: "Ubuntu Analytiq | African AI Advisory, Solutions, and Data & AI Training",
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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2033770513874581');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2033770513874581&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema]) }}
        />
        {children}
      </body>
    </html>
  );
}
