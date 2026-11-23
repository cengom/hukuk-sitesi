import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { areas } from "@/content/areas";
import { localizedUrl, pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { MapEmbed } from "@/components/MapEmbed";
import { ChatIcon, PhoneIcon } from "@/components/MobileBar";
import { site, telHref, whatsappHref } from "@/site.config";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "contact" });
  return pageMetadata({
    locale,
    title: locale === "tr" ? "İletişim ve Randevu — İstanbul Avukat" : "Contact and Appointments — Lawyer in Istanbul",
    description: t("description"),
    hrefs: { tr: "/iletisim", en: "/iletisim" },
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const n = await getTranslations("nav");
  const cta = await getTranslations("cta");
  return (
    <>
      <PageHeader
        title={t("title")}
        lead={t("lead")}
        crumbs={[
          { name: n("home"), href: "/", url: localizedUrl(locale, "/") },
          { name: t("title"), url: localizedUrl(locale, "/iletisim") },
        ]}
      />
      <div className="wrap grid gap-16 pb-24 md:pb-32 lg:grid-cols-12">
        <section aria-labelledby="form-h" className="lg:col-span-7">
          <h2 id="form-h" className="sr-only">{t("form.title")}</h2>
          <ContactForm areas={areas.map((a) => ({ id: a.id, name: a.name[locale] }))} />
        </section>
        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="flex flex-col gap-3">
            <a href={telHref} className="btn btn-outline btn-lg justify-start"><PhoneIcon /> {cta("call")} · {site.phoneDisplay}</a>
            <a href={whatsappHref(cta("whatsappText"))} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg justify-start"><ChatIcon /> {cta("whatsapp")}</a>
          </div>
          <dl className="mt-10 border-t border-line">
            <div className="border-b border-line py-5">
              <dt className="eyebrow">{t("address")}</dt>
              <dd className="mt-2">
                <address className="not-italic">{site.address.street}<br />{site.address.district} / {site.address.city}</address>
              </dd>
            </div>
            <div className="border-b border-line py-5">
              <dt className="eyebrow">{t("email")}</dt>
              <dd className="mt-2"><a href={`mailto:${site.email}`} className="link">{site.email}</a></dd>
            </div>
            <div className="border-b border-line py-5">
              <dt className="eyebrow">{t("hours")}</dt>
              <dd className="mt-2">{site.hours[locale]}<br /><span className="text-small text-ink-muted">{t("hoursNote")}</span></dd>
            </div>
          </dl>
        </aside>
        <section aria-labelledby="map-h" className="lg:col-span-12">
          <h2 id="map-h" className="text-h3">{t("mapTitle")}</h2>
          <div className="mt-6">
            <MapEmbed src={site.mapEmbedUrl} title={t("mapTitle")} note={t("mapConsent")} cta={t("mapLoad")} />
          </div>
        </section>
      </div>
    </>
  );
}
