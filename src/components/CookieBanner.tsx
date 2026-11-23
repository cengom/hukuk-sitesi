"use client";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { readConsent, writeConsent, OPEN_EVENT } from "@/lib/consent";

export function CookieBanner({ labels }: { labels: { title: string; text: string; accept: string; reject: string; more: string } }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (readConsent() === null) setShow(true);
    const open = () => setShow(true);
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);
  if (!show) return null;
  const choose = (v: "all" | "necessary") => {
    writeConsent(v);
    setShow(false);
  };
  return (
    <section
      role="region"
      aria-label={labels.title}
      className="cookie-in fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] z-50 mx-auto max-w-xl rounded-md border border-line-strong bg-paper p-5 shadow-[0_12px_40px_-12px_rgba(28,31,38,0.25)] md:bottom-6 md:left-6 md:right-auto md:mx-0 md:p-6"
    >
      <p className="font-serif text-h4">{labels.title}</p>
      <p className="mt-2 text-small text-ink-muted">
        {labels.text}{" "}
        <Link href="/cerez-politikasi" className="link">{labels.more}</Link>
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={() => choose("all")} className="btn btn-primary min-h-11 px-5">{labels.accept}</button>
        <button type="button" onClick={() => choose("necessary")} className="btn btn-outline min-h-11 px-5">{labels.reject}</button>
      </div>
    </section>
  );
}

export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className="text-ivory/85 transition-colors hover:text-gold">
      {label}
    </button>
  );
}
