import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { areas } from "@/content/areas";
import { getAllArticles } from "@/lib/articles";
import { absolute } from "@/lib/seo";

type Href = Parameters<typeof getPathname>[0]["href"];

function entry(hrefs: { tr?: Href; en?: Href }, priority = 0.7, lastModified?: string): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) if (hrefs[l]) languages[l === "tr" ? "tr-TR" : "en"] = absolute(getPathname({ locale: l, href: hrefs[l]! }));
  return routing.locales
    .filter((l) => hrefs[l])
    .map((l) => ({
      url: absolute(getPathname({ locale: l, href: hrefs[l]! })),
      lastModified: lastModified ? new Date(lastModified) : new Date(),
      priority,
      alternates: { languages },
    }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const both = (h: Href, p?: number) => entry({ tr: h, en: h }, p);
  return [
    ...both("/", 1),
    ...both("/calisma-alanlari", 0.9),
    ...areas.flatMap((a) =>
      entry(
        {
          tr: { pathname: "/calisma-alanlari/[slug]", params: { slug: a.slug.tr } },
          en: { pathname: "/calisma-alanlari/[slug]", params: { slug: a.slug.en } },
        },
        0.9,
      ),
    ),
    ...both("/hakkimda", 0.8),
    ...both("/makaleler", 0.7),
    ...getAllArticles().flatMap((a) => entry({ tr: { pathname: "/makaleler/[slug]", params: { slug: a.slug } } }, 0.6, a.updated ?? a.date)),
    ...both("/sss", 0.7),
    ...both("/iletisim", 0.8),
    ...both("/kvkk", 0.2),
    ...both("/cerez-politikasi", 0.2),
  ];
}
