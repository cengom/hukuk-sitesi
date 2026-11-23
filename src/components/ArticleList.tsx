"use client";
import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { ArticleMeta } from "@/lib/articles";

export function ArticleList({
  articles,
  categories,
  labels,
  dateLocale,
}: {
  articles: ArticleMeta[];
  categories: { id: string; name: string }[];
  labels: { all: string; filter: string; empty: string; readingTime: string };
  dateLocale: string;
}) {
  const [cat, setCat] = useState<string>("all");
  const shown = useMemo(() => (cat === "all" ? articles : articles.filter((a) => a.category === cat)), [cat, articles]);
  const fmt = new Intl.DateTimeFormat(dateLocale, { day: "numeric", month: "long", year: "numeric" });
  const name = (id: string) => categories.find((c) => c.id === id)?.name ?? id;
  const chips = [{ id: "all", name: labels.all }, ...categories.filter((c) => articles.some((a) => a.category === c.id))];

  return (
    <>
      <div role="group" aria-label={labels.filter} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
        {chips.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={cat === c.id}
            onClick={() => setCat(c.id)}
            className={`min-h-11 shrink-0 rounded-full border px-4 text-small transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97] ${
              cat === c.id ? "border-ink bg-ink text-ivory" : "border-line-strong text-ink hover:border-ink"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{shown.length}</p>
      {shown.length === 0 ? (
        <p className="mt-12 text-ink-muted">{labels.empty}</p>
      ) : (
        <ul className="mt-10 border-b border-line">
          {shown.map((a) => (
            <li key={a.slug} className="article-in">
              <Link
                href={{ pathname: "/makaleler/[slug]", params: { slug: a.slug } }}
                locale="tr"
                hrefLang="tr"
                className="group grid gap-3 border-t border-line py-8 md:grid-cols-12 md:gap-8 md:py-10"
              >
                <div className="flex flex-wrap gap-x-4 gap-y-1 md:col-span-3 md:flex-col">
                  <span className="eyebrow">{name(a.category)}</span>
                  <span className="text-small text-ink-muted">
                    <time dateTime={a.date}>{fmt.format(new Date(a.date))}</time> · {labels.readingTime.replace("{m}", String(a.readingMinutes))}
                  </span>
                </div>
                <div className="md:col-span-8 md:col-start-5" lang="tr">
                  <h2 className="font-serif text-[1.5rem] leading-snug transition-colors duration-200 group-hover:text-bronze md:text-h3">{a.title}</h2>
                  <p className="mt-3 max-w-[62ch] text-ink-muted">{a.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
