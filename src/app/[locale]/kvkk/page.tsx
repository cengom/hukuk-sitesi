import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { kvkk } from "@/content/legal";
import { localizedUrl, pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const d = kvkk[locale];
  return pageMetadata({ locale, title: d.title, description: d.description, hrefs: { tr: "/kvkk", en: "/kvkk" } });
}

export default async function Page({ params }: Props) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const n = await getTranslations("nav");
  const d = kvkk[locale];
  return (
    <>
      <PageHeader
        title={d.title}
        crumbs={[
          { name: n("home"), href: "/", url: localizedUrl(locale, "/") },
          { name: d.title, url: localizedUrl(locale, "/kvkk") },
        ]}
      />
      <div className="wrap pb-24 md:pb-32">
        <div className="prose-legal max-w-[72ch]">{d.body}</div>
      </div>
    </>
  );
}
