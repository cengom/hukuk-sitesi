import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing, type Locale } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { CookieBanner } from "@/components/CookieBanner";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { legalServiceSchema } from "@/lib/schema";
import { site } from "@/site.config";
import "../globals.css";

const fraunces = Fraunces({ subsets: ["latin", "latin-ext"], axes: ["opsz"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#faf7f0",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "meta" });
  return {
    metadataBase: new URL(site.url),
    title: { default: t("homeTitle"), template: `%s | ${t("siteName")}` },
    description: t("homeDescription"),
    applicationName: t("siteName"),
    authors: [{ name: `Av. ${site.lawyerName}` }],
    formatDetection: { telephone: false },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("nav");
  const c = await getTranslations("cookies");

  return (
    <html lang={locale} className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-dvh pb-[calc(env(safe-area-inset-bottom)+4.75rem)] md:pb-0">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-3 focus:text-ivory">
          {t("skip")}
        </a>
        <NextIntlClientProvider>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <MobileBar />
          <CookieBanner labels={{ title: c("title"), text: c("text"), accept: c("accept"), reject: c("reject"), more: c("more") }} />
          <Reveal />
        </NextIntlClientProvider>
        <JsonLd data={legalServiceSchema(locale)} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
