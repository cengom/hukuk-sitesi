import { site } from "@/site.config";
import { areas, type Faq } from "@/content/areas";
import type { Locale } from "@/i18n/routing";

export const orgId = `${site.url}/#legalservice`;
export const personId = `${site.url}/#attorney`;

export function legalServiceSchema(locale: Locale) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "@id": orgId,
      name: `${site.title} — ${site.firmName}`,
      url: site.url,
      telephone: site.phone,
      email: site.email,
      image: `${site.url}/opengraph-image`,
      areaServed: { "@type": "City", name: "İstanbul" },
      availableLanguage: ["tr", "en"],
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.district,
        addressRegion: site.address.city,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.openingHoursSpec.days,
        opens: site.openingHoursSpec.opens,
        closes: site.openingHoursSpec.closes,
      },
      knowsAbout: areas.map((a) => a.name[locale]),
      employee: { "@id": personId },
    },
    {
      "@context": "https://schema.org",
      "@type": "Attorney",
      "@id": personId,
      name: `Av. ${site.lawyerName}`,
      url: site.url,
      memberOf: { "@type": "Organization", name: site.bar[locale] },
      knowsLanguage: ["tr", "en"],
      worksFor: { "@id": orgId },
      address: { "@type": "PostalAddress", addressLocality: site.address.city, addressCountry: "TR" },
    },
  ];
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })),
  };
}
