"use client";
export type Consent = "all" | "necessary" | null;
const KEY = "cookie-consent-v1";
export const EVENT = "consentchange";
export const OPEN_EVENT = "openconsent";

export function readConsent(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === "all" || v === "necessary" ? v : null;
  } catch {
    return null;
  }
}
export function writeConsent(v: Exclude<Consent, null>) {
  try {
    localStorage.setItem(KEY, v);
  } catch {}
  window.dispatchEvent(new CustomEvent(EVENT, { detail: v }));
}
