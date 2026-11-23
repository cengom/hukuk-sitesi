import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { slugify } from "./slugify";

const DIR = path.join(process.cwd(), "content", "makaleler");

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  category: string; // areas.ts içindeki alan id’si
  date: string;
  updated?: string;
  readingMinutes: number;
};
export type Heading = { id: string; text: string; level: 2 | 3 };
export type Article = ArticleMeta & { content: string; headings: Heading[] };

function parse(file: string): Article {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  const headings: Heading[] = [];
  for (const line of content.split("\n")) {
    const m = /^(##|###)\s+(.+)$/.exec(line.trim());
    if (m) headings.push({ level: m[1].length as 2 | 3, text: m[2], id: slugify(m[2]) });
  }
  return {
    slug: file.replace(/\.mdx$/, ""),
    title: data.title,
    description: data.description,
    category: data.category,
    date: data.date,
    updated: data.updated,
    readingMinutes: Math.max(1, Math.ceil(words / 180)),
    content,
    headings,
  };
}

let cache: Article[] | null = null;
export function getAllArticles(): Article[] {
  if (!cache) {
    cache = fs
      .readdirSync(DIR)
      .filter((f) => f.endsWith(".mdx"))
      .map(parse)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }
  return cache;
}
export const getArticle = (slug: string) => getAllArticles().find((a) => a.slug === slug);
export const getArticlesByCategory = (id: string) => getAllArticles().filter((a) => a.category === id);
