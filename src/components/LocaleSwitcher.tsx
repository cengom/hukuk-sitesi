"use client";
import { useLocale, useTranslations } from "next-intl";
import { usePathname as useNextPathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type Slugs = Record<string, Record<Locale, string>>; // tr slug -> {tr,en} ve en slug -> {tr,en}

export function LocaleSwitcher({ areaSlugs, className = "" }: { areaSlugs: Slugs; className?: string }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const other: Locale = locale === "tr" ? "en" : "tr";
  const raw = decodeURIComponent(useNextPathname());
  const path = raw.replace(/^\/en(?=\/|$)/, "") || "/";
  const seg = path.split("/").filter(Boolean);

  let href: Parameters<typeof Link>[0]["href"] = "/";
  const top = seg[0];
  const map: Record<string, string> = {
    hakkimda: "/hakkimda", about: "/hakkimda",
    "calisma-alanlari": "/calisma-alanlari", "practice-areas": "/calisma-alanlari",
    makaleler: "/makaleler", articles: "/makaleler",
    sss: "/sss", faq: "/sss",
    iletisim: "/iletisim", contact: "/iletisim",
    "kvkk-aydinlatma-metni": "/kvkk", "privacy-notice": "/kvkk",
    "cerez-politikasi": "/cerez-politikasi", "cookie-policy": "/cerez-politikasi",
  };
  if (top && map[top]) {
    const base = map[top];
    if (base === "/calisma-alanlari" && seg[1] && areaSlugs[seg[1]]) {
      href = { pathname: "/calisma-alanlari/[slug]", params: { slug: areaSlugs[seg[1]][other] } };
    } else {
      href = base as typeof href;
    }
  }

  return (
    <Link href={href} locale={other} hrefLang={other} lang={other} className={className} aria-label={`${t("language")}: ${t("switchTo")}`}>
      {other.toUpperCase()}
    </Link>
  );
}
