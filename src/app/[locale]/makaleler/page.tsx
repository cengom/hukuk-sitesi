import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { areas } from "@/content/areas";
import { getAllArticles } from "@/lib/articles";
import { localizedUrl, pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { ArticleList } from "@/components/ArticleList";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "articles" });
  return pageMetadata({ locale, title: t("title"), description: t("description"), hrefs: { tr: "/makaleler", en: "/makaleler" } });
}

export default async function ArticlesPage({ params }: Props) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations("articles");
  const n = await getTranslations("nav");
  const list = getAllArticles().map(({ content: _c, headings: _h, ...m }) => m);
  return (
    <>
      <PageHeader
        title={t("title")}
        lead={t("description")}
        crumbs={[
          { name: n("home"), href: "/", url: localizedUrl(locale, "/") },
          { name: t("title"), url: localizedUrl(locale, "/makaleler") },
        ]}
      />
      <section className="wrap pb-24 md:pb-32">
        {t("languageNote") && <p className="mb-10 max-w-[60ch] border-l-2 border-gold pl-4 text-small text-ink-muted">{t("languageNote")}</p>}
        <ArticleList
          articles={list}
          categories={areas.map((a) => ({ id: a.id, name: a.name[locale] }))}
          labels={{ all: t("all"), filter: t("filter"), empty: t("empty"), readingTime: t("readingTime", { minutes: "{m}" }) }}
          dateLocale={locale === "tr" ? "tr-TR" : "en-GB"}
        />
      </section>
    </>
  );
}
