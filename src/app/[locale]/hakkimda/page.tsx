import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localizedUrl, pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Portrait } from "@/components/Portrait";
import { ContactBand } from "@/components/ContactBand";
import { site } from "@/site.config";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "about" });
  return pageMetadata({
    locale,
    title: locale === "tr" ? `Hakkımda — Av. ${site.lawyerName}, İstanbul` : `About — Attorney ${site.lawyerName}, Istanbul`,
    description: t("description"),
    hrefs: { tr: "/hakkimda", en: "/hakkimda" },
  });
}

// [Köşeli parantez] içindeki bilgiler yer tutucudur.
const bio = {
  tr: {
    lead: "İstanbul’da bireylere ve ailelere hukuki danışmanlık ve dava takibi hizmeti veriyorum. Aile, yabancılar ve gayrimenkul hukuku çalışmalarımın merkezinde yer alıyor.",
    paragraphs: [
      "[Hukuk fakültesi adı]’nden [yıl] yılında mezun oldum. Avukatlık stajımı [staj yeri] bünyesinde tamamladıktan sonra [yıl] yılından bu yana İstanbul Barosu’na kayıtlı olarak çalışıyorum.",
      "Her dosyada önce müvekkilin içinde bulunduğu durumu ve önceliklerini anlamaya çalışıyorum. Hukuki seçenekleri, olası süreleri ve riskleri sade bir dille anlatmayı; kararların bilgiyle verilmesini önemsiyorum.",
      "Yabancı uyruklu müvekkillerle İngilizce çalışıyorum. Bu sayede ikamet, çalışma izni ve vatandaşlık başvurularında olduğu kadar, yabancı unsurlu aile ve gayrimenkul uyuşmazlıklarında da süreci doğrudan yürütebiliyorum.",
    ],
    facts: [
      ["education", "[Hukuk fakültesi], [yıl]\n[Yüksek lisans — varsa]"],
      ["experience", "[X] yıllık avukatlık deneyimi\n[Önceki büro / kurum — varsa]"],
      ["languages", "Türkçe (ana dil), İngilizce\n[Diğer diller — varsa]"],
      ["memberships", `İstanbul Barosu, Sicil No ${site.barNumber}`],
    ],
  },
  en: {
    lead: "I advise and represent individuals and families in Istanbul. Family, immigration and real estate law are at the centre of my practice.",
    paragraphs: [
      "I graduated from [Law School] in [year]. After completing my legal traineeship at [place], I have been registered with the Istanbul Bar Association since [year].",
      "In every matter I first try to understand the client’s situation and priorities. I believe in explaining the legal options, likely timelines and risks in plain language, so that decisions are made on an informed basis.",
      "I work in English with foreign clients. This allows me to handle residence, work permit and citizenship applications directly, as well as family and real estate disputes with a foreign element.",
    ],
    facts: [
      ["education", "[Law School], [year]\n[Master’s degree — if any]"],
      ["experience", "[X] years of practice\n[Previous firm / institution — if any]"],
      ["languages", "Turkish (native), English\n[Other languages — if any]"],
      ["memberships", `Istanbul Bar Association, Reg. No ${site.barNumber}`],
    ],
  },
} as const;

export default async function AboutPage({ params }: Props) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const n = await getTranslations("nav");
  const b = bio[locale];
  return (
    <>
      <PageHeader
        eyebrow={t("title")}
        title={`Av. ${site.lawyerName}`}
        lead={b.lead}
        crumbs={[
          { name: n("home"), href: "/", url: localizedUrl(locale, "/") },
          { name: t("title"), url: localizedUrl(locale, "/hakkimda") },
        ]}
      />
      <section className="wrap grid gap-14 pb-24 md:pb-32 lg:grid-cols-12">
        <div className="lg:col-span-5" data-reveal>
          <Portrait className="max-w-[440px]" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <h2 className="sr-only">{t("approach")}</h2>
          <div className="space-y-6 text-lead text-ink-muted" data-reveal>
            {b.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </div>
          <dl className="mt-14 border-t border-line" data-reveal>
            {b.facts.map(([k, v]) => (
              <div key={k} className="grid gap-2 border-b border-line py-6 md:grid-cols-[11rem_1fr] md:gap-8">
                <dt className="eyebrow pt-1">{t(k)}</dt>
                <dd className="whitespace-pre-line">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
