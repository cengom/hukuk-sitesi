import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export const alt = "Av. Aleyna Elif Karaoğlu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "home" });
  const [serif, sans] = await Promise.all([loadFont("Fraunces", 300), loadFont("Inter", 500)]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#faf7f0", padding: 80, fontFamily: "Inter" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 48, height: 1, background: "#c9a24b" }} />
          <div style={{ fontSize: 22, letterSpacing: 3, color: "#8a6516", textTransform: "uppercase" }}>{t("eyebrow")}</div>
        </div>
        <div style={{ fontFamily: "Fraunces", fontSize: 76, lineHeight: 1.1, color: "#1c1f26", maxWidth: 960 }}>{t("title")}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid #e4dccb", paddingTop: 28 }}>
          <div style={{ fontFamily: "Fraunces", fontSize: 36, color: "#1c1f26" }}>Av. Aleyna Elif Karaoğlu</div>
          <div style={{ fontSize: 22, color: "#5b5f68" }}>{locale === "tr" ? "İstanbul Barosu" : "Istanbul Bar Association"}</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Fraunces", data: serif, weight: 300 }, { name: "Inter", data: sans, weight: 500 }] },
  );
}

export function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "en" }];
}

// Google Fonts'tan TTF çeker (derleme sırasında bir kez çalışır; görseller statik üretilir).
async function loadFont(family: string, weight: number): Promise<ArrayBuffer> {
  const css = await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`, {
    headers: { "User-Agent": "Mozilla/4.0" },
  }).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
  if (!url) throw new Error(`Font bulunamadı: ${family}`);
  return fetch(url).then((r) => r.arrayBuffer());
}
