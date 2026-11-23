import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site, telHref, whatsappHref } from "@/site.config";
import type { Locale } from "@/i18n/routing";

export async function ContactBand({ title, text }: { title?: string; text?: string }) {
  const locale = (await getLocale()) as Locale;
  const h = await getTranslations("home");
  const c = await getTranslations("contact");
  const cta = await getTranslations("cta");
  return (
    <section aria-labelledby="contact-band" className="bg-ink text-ivory">
      <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-12" data-reveal>
        <div className="lg:col-span-7">
          <p className="text-eyebrow font-medium uppercase tracking-[0.12em] text-gold">{h("contactEyebrow")}</p>
          <h2 id="contact-band" className="mt-4 max-w-[20ch] text-m-h2 md:text-h2">{title ?? h("contactTitle")}</h2>
          {text && <p className="mt-5 max-w-[52ch] text-lead text-ivory/75">{text}</p>}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/iletisim" className="btn btn-gold btn-lg">{cta("appointment")}</Link>
            <a href={whatsappHref(cta("whatsappText"))} target="_blank" rel="noopener noreferrer" className="btn btn-lg border border-ivory/30 text-ivory hover:border-ivory">
              {cta("whatsapp")}
            </a>
          </div>
        </div>
        <dl className="grid content-start gap-6 md:grid-cols-2 lg:col-span-4 lg:col-start-9 lg:grid-cols-1">
          {[
            [c("address"), `${site.address.street}, ${site.address.district} / ${site.address.city}`],
            [c("phone"), <a key="p" href={telHref} className="hover:text-gold">{site.phoneDisplay}</a>],
            [c("email"), <a key="e" href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a>],
            [c("hours"), site.hours[locale]],
          ].map(([k, v], i) => (
            <div key={i}>
              <dt className="text-eyebrow font-medium uppercase tracking-[0.12em] text-ivory/70">{k}</dt>
              <dd className="mt-1.5 text-lead">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
