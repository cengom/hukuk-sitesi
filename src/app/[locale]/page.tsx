import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { areas } from "@/content/areas";
import { getAllArticles } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappHref } from "@/site.config";
import { Portrait } from "@/components/Portrait";
import { ContactBand } from "@/components/ContactBand";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, title: t("homeTitle"), description: t("homeDescription"), hrefs: { tr: "/", en: "/" }, absoluteTitle: true });
}

export default async function Home({ params }: Props) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const cta = await getTranslations("cta");
  const a = await getTranslations("areas");
  const art = await getTranslations("articles");
  const approach = (await getTranslations()).raw("approach") as { title: string; text: string }[];
  const articles = getAllArticles().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="wrap grid items-center gap-14 pb-20 pt-12 md:pb-28 md:pt-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="eyebrow enter" style={{ ["--i" as string]: 0 }}>{t("eyebrow")}</p>
          <h1 className="enter mt-5 max-w-[15ch] text-m-display md:text-display xl:text-display-xl" style={{ ["--i" as string]: 1 }}>
            {t("title")}
          </h1>
          <p className="enter mt-7 max-w-[52ch] text-lead text-ink-muted" style={{ ["--i" as string]: 2 }}>{t("lead")}</p>
          <div className="enter mt-10 flex flex-col gap-3 sm:flex-row" style={{ ["--i" as string]: 3 }}>
            <Link href="/iletisim" className="btn btn-primary btn-lg">{cta("appointment")}</Link>
            <a href={whatsappHref(cta("whatsappText"))} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg">
              {cta("whatsapp")}
            </a>
          </div>
          <ul className="enter mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-small text-ink-muted" style={{ ["--i" as string]: 4 }}>
            <li>{site.bar[locale]} · {locale === "tr" ? "Sicil No" : "Reg. No"} {site.barNumber}</li>
            <li>{site.hours[locale]}</li>
            <li>Türkçe · English</li>
          </ul>
        </div>
        <div className="enter lg:col-span-5" style={{ ["--i" as string]: 2 }}>
          <Portrait priority className="mx-auto max-w-[360px] lg:mr-0 lg:max-w-none" />
        </div>
      </section>

      {/* Çalışma alanları */}
      <section aria-labelledby="areas-h" className="wrap py-20 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
          <div>
            <p className="eyebrow">{t("areasEyebrow")}</p>
            <h2 id="areas-h" className="mt-4 max-w-[22ch] text-m-h2 md:text-h2">{t("areasTitle")}</h2>
          </div>
          <Link href="/calisma-alanlari" className="link self-start md:self-auto">{t("areasAll")} <span aria-hidden className="arrow">→</span></Link>
        </div>
        <ul className="mt-14 grid gap-x-12 md:grid-cols-2 lg:grid-cols-3">
          {areas.map((ar, i) => (
            <li key={ar.id} data-reveal style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
              <Link href={{ pathname: "/calisma-alanlari/[slug]", params: { slug: ar.slug[locale] } }} className="group block border-t border-line-strong pb-10 pt-7">
                <span className="eyebrow tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-h3 transition-colors duration-200 group-hover:text-bronze">{ar.name[locale]}</h3>
                <p className="mt-3 text-ink-muted">{ar.short[locale]}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-button font-medium text-bronze">
                  {a("explore")} <span aria-hidden className="arrow">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Çalışma yaklaşımı */}
      <section aria-labelledby="approach-h" className="bg-sand">
        <div className="wrap py-20 md:py-28">
          <div data-reveal>
            <p className="eyebrow">{t("approachEyebrow")}</p>
            <h2 id="approach-h" className="mt-4 max-w-[26ch] text-m-h2 md:text-h2">{t("approachTitle")}</h2>
          </div>
          <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {approach.map((s, i) => (
              <li key={i} className="border-t border-gold pt-6" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                <p className="eyebrow">{a("step")} {i + 1}</p>
                <h3 className="mt-3 text-h3">{s.title}</h3>
                <p className="mt-3 text-ink-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Hakkımda özeti */}
      <section aria-labelledby="about-h" className="wrap grid gap-10 py-20 md:py-28 lg:grid-cols-12" data-reveal>
        <div className="lg:col-span-4">
          <p className="eyebrow">{t("aboutEyebrow")}</p>
          <h2 id="about-h" className="mt-4 text-m-h2 md:text-h2">Av. Aleyna Elif<br />Karaoğlu</h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <blockquote className="font-serif text-[1.5rem] font-light italic leading-snug md:text-h3">“{t("aboutQuote")}”</blockquote>
          <p className="mt-7 max-w-[60ch] text-lead text-ink-muted">
            {locale === "tr"
              ? "[Hukuk fakültesi] mezunu. [X] yıldır İstanbul Barosu’na kayıtlı olarak aile, yabancılar ve gayrimenkul hukuku başta olmak üzere bireysel uyuşmazlıklarda çalışıyor. Türkçe ve İngilizce görüşme yapıyor."
              : "Graduate of [Law School]. Registered with the Istanbul Bar Association for [X] years, working mainly on family, immigration and real estate matters for individuals. Consultations in English and Turkish."}
          </p>
          <Link href="/hakkimda" className="link mt-8 inline-block">{t("aboutMore")} <span aria-hidden className="arrow">→</span></Link>
        </div>
      </section>

      {/* Son makaleler */}
      <section aria-labelledby="articles-h" className="wrap pb-24 pt-4 md:pb-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
          <div>
            <p className="eyebrow">{t("articlesEyebrow")}</p>
            <h2 id="articles-h" className="mt-4 text-m-h2 md:text-h2">{t("articlesTitle")}</h2>
          </div>
          <Link href="/makaleler" className="link self-start md:self-auto">{t("articlesAll")} <span aria-hidden className="arrow">→</span></Link>
        </div>
        <ul className="mt-12 border-b border-line">
          {articles.map((ar) => {
            const area = areas.find((x) => x.id === ar.category);
            return (
              <li key={ar.slug} data-reveal>
                <Link
                  href={{ pathname: "/makaleler/[slug]", params: { slug: ar.slug } }}
                  locale="tr"
                  hrefLang="tr"
                  className="group grid gap-2 border-t border-line py-7 lg:grid-cols-[13rem_1fr_auto] lg:items-baseline lg:gap-10"
                >
                  <span className="eyebrow">{area?.name[locale]}</span>
                  <span className="font-serif text-[1.375rem] leading-snug transition-colors duration-200 group-hover:text-bronze md:text-h3" lang="tr">{ar.title}</span>
                  <span className="text-small text-ink-muted">{art("readingTime", { minutes: ar.readingMinutes })}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <ContactBand />
    </>
  );
}
