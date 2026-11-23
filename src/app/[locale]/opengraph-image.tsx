import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export const alt = "Av. Aleyna Elif Karaoğlu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "home" });
  const [serif, sans] = await Promise.all([
    readFile(path.join(process.cwd(), "assets/Fraunces-300.ttf")),
    readFile(path.join(process.cwd(), "assets/Inter-500.ttf")),
  ]);
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
