import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { areas, getArea } from "@/content/areas";
import { getArticlesByCategory } from "@/lib/articles";
import { localizedUrl, pageMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";
import { routing, type Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/PageHeader";
import { Timeline } from "@/components/Timeline";
import { Accordion } from "@/components/Accordion";
import { ContactBand } from "@/components/ContactBand";
import { JsonLd } from "@/components/JsonLd";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => areas.map((a) => ({ locale, slug: a.slug[locale] })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  const area = getArea(locale, slug);
  if (!area) return {};
  return pageMetadata({
    locale,
    title: area.seoTitle[locale],
    description: area.seoDescription[locale],
    absoluteTitle: true,
    hrefs: {
      tr: { pathname: "/calisma-alanlari/[slug]", params: { slug: area.slug.tr } },
      en: { pathname: "/calisma-alanlari/[slug]", params: { slug: area.slug.en } },
    },
  });
}

export default async function AreaPage({ params }: Props) {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  setRequestLocale(locale);
  const area = getArea(locale, decodeURIComponent(slug));
  if (!area) notFound();
  const t = await getTranslations("areas");
  const n = await getTranslations("nav");
  const art = await getTranslations("articles");
  const related = getArticlesByCategory(area.id);
  const others = areas.filter((a) => a.id !== area.id);

  return (
    <>
      <PageHeader
        eyebrow={t("title")}
        title={area.name[locale]}
        lead={area.intro[locale][0]}
        crumbs={[
          { name: n("home"), href: "/", url: localizedUrl(locale, "/") },
          { name: t("title"), href: "/calisma-alanlari", url: localizedUrl(locale, "/calisma-alanlari") },
          { name: area.name[locale], url: localizedUrl(locale, { pathname: "/calisma-alanlari/[slug]", params: { slug: area.slug[locale] } }) },
        ]}
      />

      <section className="wrap grid gap-12 pb-20 md:pb-28 lg:grid-cols-12" aria-labelledby="services-h">
        <div className="lg:col-span-5" data-reveal>
          <p className="max-w-[52ch] text-lead text-ink-muted">{area.intro[locale][1]}</p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7" data-reveal>
          <h2 id="services-h" className="text-h3">{t("services")}</h2>
          <ul className="mt-6 border-t border-line">
            {area.services[locale].map((s) => (
              <li key={s} className="flex gap-4 border-b border-line py-4">
                <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-gold" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-sand" aria-labelledby="process-h">
        <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <h2 id="process-h" className="text-m-h2 md:text-h2">{t("process")}</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Timeline steps={area.steps[locale]} label={t("step")} />
          </div>
        </div>
      </section>

      <section className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-12" aria-labelledby="faq-h">
        <div className="lg:col-span-4" data-reveal>
          <h2 id="faq-h" className="text-m-h2 md:text-h2">{t("faq")}</h2>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={area.faqs[locale]} />
        </div>
        <JsonLd data={faqSchema(area.faqs[locale])} />
      </section>

      {related.length > 0 && (
        <section className="wrap pb-20 md:pb-28" aria-labelledby="related-h">
          <h2 id="related-h" className="text-h3" data-reveal>{t("related")}</h2>
          <ul className="mt-6 border-b border-line">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={{ pathname: "/makaleler/[slug]", params: { slug: r.slug } }} locale="tr" hrefLang="tr" className="group flex flex-col gap-1 border-t border-line py-6 md:flex-row md:items-baseline md:justify-between">
                  <span lang="tr" className="font-serif text-h4 transition-colors group-hover:text-bronze">{r.title}</span>
                  <span className="text-small text-ink-muted">{art("readingTime", { minutes: r.readingMinutes })}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <ContactBand title={t("ctaTitle")} text={t("ctaText")} />

      <nav aria-label={t("title")} className="wrap py-14">
        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-small">
          {others.map((o) => (
            <li key={o.id}>
              <Link href={{ pathname: "/calisma-alanlari/[slug]", params: { slug: o.slug[locale] } }} className="text-ink-muted transition-colors hover:text-bronze">
                {o.name[locale]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
