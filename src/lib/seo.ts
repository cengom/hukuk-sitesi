import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/site.config";

type Href = Parameters<typeof getPathname>[0]["href"];

export const absolute = (path: string) => new URL(path, site.url).toString();

export function localizedUrl(locale: Locale, href: Href) {
  return absolute(getPathname({ locale, href }));
}

/** canonical + hreflang. `hrefs` her dil için (slug farklı olabilir) href verir; verilmeyen dil için alternatif eklenmez. */
export function alternates(locale: Locale, hrefs: Partial<Record<Locale, Href>>): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    const h = hrefs[l];
    if (h) languages[l === "tr" ? "tr-TR" : "en"] = localizedUrl(l, h);
  }
  if (hrefs.tr) languages["x-default"] = localizedUrl("tr", hrefs.tr);
  return { canonical: localizedUrl(locale, hrefs[locale]!), languages };
}

export function pageMetadata({
  locale,
  title,
  description,
  hrefs,
  type = "website",
  absoluteTitle = false,
}: {
  locale: Locale;
  title: string;
  description: string;
  hrefs: Partial<Record<Locale, Href>>;
  type?: "website" | "article";
  absoluteTitle?: boolean;
}): Metadata {
  const alt = alternates(locale, hrefs);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: alt,
    openGraph: {
      type,
      title,
      description,
      url: alt?.canonical as string,
      siteName: site.title,
      locale: locale === "tr" ? "tr_TR" : "en_GB",
      images: [{ url: locale === "tr" ? "/opengraph-image" : "/en/opengraph-image", width: 1200, height: 630, alt: site.title }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
