import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MobileMenu } from "./MobileMenu";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { areas } from "@/content/areas";
import { site } from "@/site.config";

export const navItems = [
  { href: "/calisma-alanlari", key: "areas" },
  { href: "/hakkimda", key: "about" },
  { href: "/makaleler", key: "articles" },
  { href: "/sss", key: "faq" },
  { href: "/iletisim", key: "contact" },
] as const;

export function areaSlugMap() {
  const m: Record<string, { tr: string; en: string }> = {};
  for (const a of areas) {
    m[a.slug.tr] = a.slug;
    m[a.slug.en] = a.slug;
  }
  return m;
}

export async function Header() {
  const t = await getTranslations("nav");
  const slugs = areaSlugMap();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory">
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
        <Link href="/" className="group flex flex-col leading-none" aria-label={`${site.title} — ${t("home")}`}>
          <span className="font-serif text-[1.1875rem] font-normal tracking-[-0.005em] md:text-h4">
            <span className="md:hidden">A. E. Karaoğlu</span>
            <span className="hidden md:inline">Aleyna Elif Karaoğlu</span>
          </span>
          <span className="mt-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ink-muted">Avukat · Attorney</span>
        </Link>

        <nav aria-label={t("primary")} className="hidden lg:block">
          <ul className="flex items-center gap-9 text-small">
            {navItems.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="relative py-2 text-ink transition-colors duration-200 hover:text-bronze">
                  {t(n.key)}
                </Link>
              </li>
            ))}
            <li>
              <LocaleSwitcher areaSlugs={slugs} className="py-2 text-ink-muted transition-colors hover:text-bronze" />
            </li>
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Link href="/iletisim" className="btn btn-primary min-h-11 px-5">
            {t("appointment")}
          </Link>
        </div>

        <MobileMenu
          items={navItems.map((n) => ({ href: n.href, label: t(n.key) }))}
          labels={{ menu: t("menu"), close: t("close"), primary: t("primary"), appointment: t("appointment") }}
          switcher={<LocaleSwitcher areaSlugs={slugs} className="text-small text-ink-muted" />}
        />
      </div>
    </header>
  );
}
