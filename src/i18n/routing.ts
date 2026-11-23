import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/hakkimda": { tr: "/hakkimda", en: "/about" },
    "/calisma-alanlari": { tr: "/calisma-alanlari", en: "/practice-areas" },
    "/calisma-alanlari/[slug]": { tr: "/calisma-alanlari/[slug]", en: "/practice-areas/[slug]" },
    "/makaleler": { tr: "/makaleler", en: "/articles" },
    "/makaleler/[slug]": { tr: "/makaleler/[slug]", en: "/articles/[slug]" },
    "/sss": { tr: "/sss", en: "/faq" },
    "/iletisim": { tr: "/iletisim", en: "/contact" },
    "/kvkk": { tr: "/kvkk-aydinlatma-metni", en: "/privacy-notice" },
    "/cerez-politikasi": { tr: "/cerez-politikasi", en: "/cookie-policy" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
