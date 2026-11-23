import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site, telHref } from "@/site.config";
import { navItems } from "./Header";
import { CookieSettingsButton } from "./CookieBanner";
import type { Locale } from "@/i18n/routing";

export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("footer");
  const n = await getTranslations("nav");
  const c = await getTranslations("contact");
  return (
    <footer className="bg-ink text-ivory">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <p className="font-serif text-h3 font-light">Av. {site.lawyerName}</p>
          <p className="mt-3 text-small text-ivory/75">{t("registered", { bar: site.bar[locale], number: site.barNumber })}</p>
          <p className="mt-6 max-w-sm text-small text-ivory/75">
            {site.address.street}, {site.address.district} / {site.address.city}
            <br />
            <a href={telHref} className="hover:text-gold">{site.phoneDisplay}</a>
            {" · "}
            <a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a>
            <br />
            {site.hours[locale]}
          </p>
        </div>
        <nav aria-label={t("nav")} className="md:col-span-3 md:col-start-7">
          <p className="text-eyebrow font-medium uppercase tracking-[0.12em] text-gold">{t("nav")}</p>
          <ul className="mt-5 space-y-3 text-small">
            {navItems.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="text-ivory/85 transition-colors hover:text-gold">{n(i.key)}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t("legal")} className="md:col-span-3">
          <p className="text-eyebrow font-medium uppercase tracking-[0.12em] text-gold">{t("legal")}</p>
          <ul className="mt-5 space-y-3 text-small">
            <li><Link href="/kvkk" className="text-ivory/85 transition-colors hover:text-gold">{t("kvkk")}</Link></li>
            <li><Link href="/cerez-politikasi" className="text-ivory/85 transition-colors hover:text-gold">{t("cookies")}</Link></li>
            <li><CookieSettingsButton label={t("cookieSettings")} /></li>
          </ul>
        </nav>
      </div>
      <div className="wrap border-t border-ivory/15 py-8 pb-28 md:pb-8">
        <p className="max-w-3xl text-[0.8125rem] leading-relaxed text-ivory/70">{t("notice")}</p>
        <p className="mt-3 text-[0.8125rem] text-ivory/70">© {new Date().getFullYear()} {site.title} · {c("title")}: {site.email}</p>
      </div>
    </footer>
  );
}
