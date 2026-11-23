import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { areas } from "@/content/areas";
import { localizedUrl, pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { ContactBand } from "@/components/ContactBand";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "areas" });
  return pageMetadata({
    locale,
    title: locale === "tr" ? "İstanbul Avukat — Çalışma Alanları" : "Practice Areas — Lawyer in Istanbul",
    description: t("description"),
    hrefs: { tr: "/calisma-alanlari", en: "/calisma-alanlari" },
  });
}

export default async function AreasPage({ params }: Props) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations("areas");
  const n = await getTranslations("nav");
  return (
    <>
      <PageHeader
        title={t("title")}
        lead={t("intro")}
        crumbs={[
          { name: n("home"), href: "/", url: localizedUrl(locale, "/") },
          { name: t("title"), url: localizedUrl(locale, "/calisma-alanlari") },
        ]}
      />
      <section className="wrap pb-24 md:pb-32">
        <ul className="border-b border-line">
          {areas.map((a, i) => (
            <li key={a.id} data-reveal>
              <Link
                href={{ pathname: "/calisma-alanlari/[slug]", params: { slug: a.slug[locale] } }}
                className="group grid gap-4 border-t border-line-strong py-10 md:grid-cols-12 md:gap-8 md:py-12"
              >
                <span className="eyebrow tabular-nums md:col-span-1 md:pt-3">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="text-m-h2 transition-colors duration-200 group-hover:text-bronze md:col-span-5 md:text-h2">{a.name[locale]}</h2>
                <div className="md:col-span-5 md:col-start-8 md:pt-2">
                  <p className="text-lead text-ink-muted">{a.short[locale]}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-button font-medium text-bronze">
                    {t("explore")} <span aria-hidden className="arrow">→</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <ContactBand />
    </>
  );
}
