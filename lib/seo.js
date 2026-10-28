export const siteUrl = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://ubuntuanalytiq.co.ke").replace(/\/$/, "");
export const organizationId = `${siteUrl}/#organization`;

export function pageMetadata(path, title, description, image = "/images/ubuntu-data-workshop.png") {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  return {
    title: { absolute: `${title} | Ubuntu Analytiq` },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website", locale: "en_KE", siteName: "Ubuntu Analytiq", url,
      title: `${title} | Ubuntu Analytiq`, description,
      images: [{ url: image, alt: title }]
    },
    twitter: {
      card: "summary_large_image", title: `${title} | Ubuntu Analytiq`, description,
      images: [image]
    }
  };
}

export function serviceSchema({ name, description, path }) {
  return {
    "@context": "https://schema.org", "@type": "Service",
    "@id": `${siteUrl}${path}`, name, description,
    url: `${siteUrl}${path}`, provider: { "@id": organizationId },
    areaServed: [{ "@type": "Country", name: "Kenya" }, { "@type": "Place", name: "Africa" }]
  };
}
