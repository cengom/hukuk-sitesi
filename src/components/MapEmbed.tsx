"use client";
import { useEffect, useState } from "react";
import { readConsent, EVENT } from "@/lib/consent";

export function MapEmbed({ src, title, note, cta }: { src: string; title: string; note: string; cta: string }) {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (readConsent() === "all") setLoad(true);
    const on = (e: Event) => (e as CustomEvent).detail === "all" && setLoad(true);
    window.addEventListener(EVENT, on);
    return () => window.removeEventListener(EVENT, on);
  }, []);
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-line bg-sand md:aspect-[21/9]">
      {load ? (
        <iframe src={src} title={title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 size-full border-0 grayscale-[35%]" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-4 p-6 md:p-8">
          <MapPattern />
          <p className="relative max-w-sm text-small text-ink-muted">{note}</p>
          <button type="button" onClick={() => setLoad(true)} className="btn btn-outline relative min-h-11 bg-paper px-5">{cta}</button>
        </div>
      )}
    </div>
  );
}

function MapPattern() {
  return (
    <>
    <span aria-hidden className="absolute left-1/2 top-[45%] flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold">
      <span className="size-2.5 rounded-full bg-bronze" />
    </span>
    <svg aria-hidden className="absolute inset-0 size-full text-line-strong" preserveAspectRatio="none" viewBox="0 0 400 300">
      <g fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6">
        <path d="M0 210 C 80 190, 140 230, 220 200 S 340 150, 400 170" />
        <path d="M0 120 C 90 140, 160 90, 240 110 S 360 80, 400 95" />
        <path d="M120 0 C 130 80, 100 160, 140 300" />
        <path d="M280 0 C 260 90, 300 180, 270 300" />
      </g>
    </svg>
    </>
  );
}
