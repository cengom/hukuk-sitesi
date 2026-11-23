import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllArticles, getArticle } from "@/lib/articles";
import { getAreaById } from "@/content/areas";
import { localizedUrl, pageMetadata } from "@/lib/seo";
import { orgId, personId } from "@/lib/schema";
import { slugify } from "@/lib/slugify";
import { site } from "@/site.config";
import { PageHeader } from "@/components/PageHeader";
import { ContactBand } from "@/components/ContactBand";
import { JsonLd } from "@/components/JsonLd";
import type { Locale } from "@/i18n/routing";
import type { ReactNode } from "react";

type Props = { params: Promise<{ locale: string; slug: string }> };

// Makaleler şimdilik yalnızca Türkçe yayımlanır.
export function generateStaticParams() {
  return getAllArticles().map((a) => ({ locale: "tr", slug: a.slug }));
}
export const dynamicParams = false;

const text = (c: ReactNode): string => (typeof c === "string" ? c : Array.isArray(c) ? c.map(text).join("") : "");
const components = {
  h2: ({ children }: { children?: ReactNode }) => <h2 id={slugify(text(children))}>{children}</h2>,
  h3: ({ children }: { children?: ReactNode }) => <h3 id={slugify(text(children))}>{children}</h3>,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  const a = getArticle(slug);
  if (!a) return {};
  const meta = pageMetadata({ locale, title: a.title, description: a.description, type: "article", hrefs: { tr: { pathname: "/makaleler/[slug]", params: { slug } } } });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: a.date, modifiedTime: a.updated ?? a.date } };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  setRequestLocale(locale);
  const a = getArticle(slug);
  if (!a) notFound();
  const t = await getTranslations("articles");
  const n = await getTranslations("nav");
  const area = getAreaById(a.category);
  const url = localizedUrl(locale, { pathname: "/makaleler/[slug]", params: { slug } });
  const fmt = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  const toc = a.headings.filter((h) => h.level === 2);

  return (
    <article>
      <PageHeader
        eyebrow={area?.name.tr}
        compact
        title={a.title}
        lead={a.description}
        crumbs={[
          { name: n("home"), href: "/", url: localizedUrl(locale, "/") },
          { name: t("title"), href: "/makaleler", url: localizedUrl(locale, "/makaleler") },
          { name: a.title, url },
        ]}
      />
      <div className="wrap grid gap-12 pb-20 md:pb-28 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="text-small text-ink-muted">
              <time dateTime={a.date}>{fmt.format(new Date(a.date))}</time> · {t("readingTime", { minutes: a.readingMinutes })}
            </p>
            {toc.length > 0 && (
              <nav aria-labelledby="toc-h" className="mt-8 border-t border-line pt-6">
                <p id="toc-h" className="eyebrow">{t("toc")}</p>
                <ol className="mt-4 space-y-3 text-small">
                  {toc.map((h) => (
                    <li key={h.id}><a href={`#${h.id}`} className="text-ink-muted transition-colors hover:text-bronze">{h.text}</a></li>
                  ))}
                </ol>
              </nav>
            )}
          </div>
        </aside>
        <div className="lg:col-span-7 lg:col-start-5">
          <div className="prose-legal max-w-[68ch]">
            <MDXRemote source={a.content} components={components} />
          </div>
          <p className="mt-14 max-w-[68ch] border-l-2 border-gold bg-sand px-5 py-4 text-small text-ink">{t("disclaimer")}</p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/makaleler" className="link">← {t("back")}</Link>
            {area && (
              <Link href={{ pathname: "/calisma-alanlari/[slug]", params: { slug: area.slug.tr } }} className="link">
                {area.name.tr} <span aria-hidden className="arrow">→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      <ContactBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.description,
          inLanguage: "tr-TR",
          datePublished: a.date,
          dateModified: a.updated ?? a.date,
          mainEntityOfPage: url,
          author: { "@id": personId },
          publisher: { "@id": orgId },
          image: `${site.url}/opengraph-image`,
        }}
      />
    </article>
  );
}
