import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { areas, generalFaqs } from "@/content/areas";
import { localizedUrl, pageMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";
import { PageHeader } from "@/components/PageHeader";
import { Accordion } from "@/components/Accordion";
import { ContactBand } from "@/components/ContactBand";
import { JsonLd } from "@/components/JsonLd";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "faq" });
  return pageMetadata({ locale, title: t("title"), description: t("description"), hrefs: { tr: "/sss", en: "/sss" } });
}

export default async function FaqPage({ params }: Props) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const n = await getTranslations("nav");
  const groups = [
    { id: "genel", title: t("general"), items: generalFaqs[locale] },
    ...areas.map((a) => ({ id: a.slug[locale], title: a.name[locale], items: a.faqs[locale], area: a })),
  ];
  return (
    <>
      <PageHeader
        title={t("title")}
        lead={t("description")}
        crumbs={[
          { name: n("home"), href: "/", url: localizedUrl(locale, "/") },
          { name: t("title"), url: localizedUrl(locale, "/sss") },
        ]}
      />
      <div className="wrap grid gap-12 pb-24 md:pb-32 lg:grid-cols-12">
        <nav aria-label={t("title")} className="hidden lg:col-span-3 lg:block">
          <ul className="sticky top-28 space-y-3 text-small">
            {groups.map((g) => (
              <li key={g.id}><a href={`#${g.id}`} className="text-ink-muted transition-colors hover:text-bronze">{g.title}</a></li>
            ))}
          </ul>
        </nav>
        <div className="space-y-20 lg:col-span-8 lg:col-start-5">
          {groups.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} data-reveal>
              <div className="mb-4 flex items-baseline justify-between gap-6">
                <h2 id={`${g.id}-h`} className="text-h3">{g.title}</h2>
                {"area" in g && g.area && (
                  <Link href={{ pathname: "/calisma-alanlari/[slug]", params: { slug: g.area.slug[locale] } }} className="link shrink-0 text-small">
                    {g.area.name[locale]} <span aria-hidden className="arrow">→</span>
                  </Link>
                )}
              </div>
              <Accordion items={g.items} />
            </section>
          ))}
        </div>
      </div>
      <JsonLd data={faqSchema(groups.flatMap((g) => g.items))} />
      <ContactBand />
    </>
  );
}
