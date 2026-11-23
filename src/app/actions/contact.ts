"use server";
import { headers } from "next/headers";
import { Resend } from "resend";
import { getTranslations } from "next-intl/server";
import { areas } from "@/content/areas";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "phone" | "email" | "area" | "message" | "consent", string>>;
  values?: Record<string, string>;
};

// Basit, örnek başına bellek içi sınır: 10 dakikada IP başına 5 talep.
// Birden fazla sunucu örneğinde kalıcı bir çözüm için Upstash Redis / Vercel KV önerilir (README).
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();
function rateLimited(key: string) {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > LIMIT;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  const locale = String(form.get("locale") || "tr") === "en" ? "en" : "tr";
  const t = await getTranslations({ locale, namespace: "contact.form" });

  const v = {
    name: String(form.get("name") ?? "").trim().slice(0, 120),
    phone: String(form.get("phone") ?? "").trim().slice(0, 40),
    email: String(form.get("email") ?? "").trim().slice(0, 160),
    area: String(form.get("area") ?? "").trim(),
    message: String(form.get("message") ?? "").trim().slice(0, 4000),
  };
  const consent = form.get("consent") === "on";

  // Honeypot: gerçek kullanıcı bu alanı görmez. Doluysa sessizce başarı döndür.
  if (String(form.get("company") ?? "") !== "") return { status: "success", message: t("success") };

  const errors: ContactState["errors"] = {};
  if (!v.name) errors.name = t("required");
  if (!v.phone) errors.phone = t("required");
  else if (!/^[+()\d\s-]{7,20}$/.test(v.phone)) errors.phone = t("invalidPhone");
  if (!v.email) errors.email = t("required");
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) errors.email = t("invalidEmail");
  if (!v.area) errors.area = t("required");
  if (!v.message) errors.message = t("required");
  else if (v.message.length < 20) errors.message = t("tooShort");
  if (!consent) errors.consent = t("consentRequired");
  if (Object.keys(errors).length) return { status: "error", errors, values: v };

  // Çok hızlı gönderim (2 sn altı) bot göstergesidir.
  const started = Number(form.get("started") ?? 0);
  if (started && Date.now() - started < 2000) return { status: "success", message: t("success") };

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return { status: "error", message: t("rateLimited"), values: v };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL eksik");
    return { status: "error", message: t("error"), values: v };
  }

  const areaName = areas.find((a) => a.id === v.area)?.name.tr ?? "Diğer / emin değil";
  const when = new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });
  const rows: [string, string][] = [
    ["Ad Soyad", v.name],
    ["Telefon", v.phone],
    ["E-posta", v.email],
    ["Hukuk alanı", areaName],
    ["Dil", locale.toUpperCase()],
    ["Açık rıza", `Verildi (${when})`],
  ];

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: v.email,
      subject: `Randevu talebi — ${areaName} — ${v.name}`,
      text: `${rows.map(([k, val]) => `${k}: ${val}`).join("\n")}\n\nMesaj:\n${v.message}`,
      html: `<table style="font-family:sans-serif;font-size:14px">${rows
        .map(([k, val]) => `<tr><td style="padding:4px 12px 4px 0;color:#5b5f68">${esc(k)}</td><td>${esc(val)}</td></tr>`)
        .join("")}</table><p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${esc(v.message)}</p>`,
    });
    if (error) throw error;
  } catch (e) {
    console.error("[contact] gönderim hatası", e);
    return { status: "error", message: t("error"), values: v };
  }
  return { status: "success", message: t("success") };
}
