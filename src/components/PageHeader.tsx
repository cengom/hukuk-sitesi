import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

type Crumb = { name: string; href?: Parameters<typeof Link>[0]["href"]; url: string };

export async function PageHeader({ eyebrow, title, lead, crumbs, compact = false }: { eyebrow?: string; title: string; lead?: string; crumbs: Crumb[]; compact?: boolean }) {
  const t = await getTranslations("nav");
  return (
    <div className="wrap pb-14 pt-10 md:pb-20 md:pt-14">
      <nav aria-label={t("breadcrumb")} className="enter" style={{ ["--i" as string]: 0 }}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-ink-muted">
          {crumbs.map((c, i) => (
            <li key={i} className="flex items-center gap-2">
              {c.href && i < crumbs.length - 1 ? (
                <Link href={c.href} className="transition-colors hover:text-bronze">{c.name}</Link>
              ) : (
                <span aria-current="page" className="text-ink">{c.name}</span>
              )}
              {i < crumbs.length - 1 && <span aria-hidden className="text-line-strong">/</span>}
            </li>
          ))}
        </ol>
      </nav>
      {eyebrow && <p className="eyebrow enter mt-12 md:mt-16" style={{ ["--i" as string]: 1 }}>{eyebrow}</p>}
      <h1 className={`enter ${compact ? "max-w-[24ch] text-[2.25rem] leading-[1.15] md:text-[3.25rem]" : "max-w-[18ch] text-m-display md:text-display"} ${eyebrow ? "mt-4" : "mt-12 md:mt-16"}`} style={{ ["--i" as string]: 2 }}>
        {title}
      </h1>
      {lead && <p className="enter mt-6 max-w-[58ch] text-lead text-ink-muted" style={{ ["--i" as string]: 3 }}>{lead}</p>}
      <JsonLd data={breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.url })))} />
    </div>
  );
}
