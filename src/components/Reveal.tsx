"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * [data-reveal] öğelerini kaydırıldıkça bir kez ortaya çıkarır.
 * Sayfa açıldığında görünür alanda olan öğelere dokunulmaz (LCP ve ilk boyama etkilenmez).
 */
export function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const vh = window.innerHeight;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")).filter(
      (el) => el.getBoundingClientRect().top > vh * 0.92,
    );
    els.forEach((el) => el.classList.add("pre"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
