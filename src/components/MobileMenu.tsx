"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { Link } from "@/i18n/navigation";

type Item = { href: "/calisma-alanlari" | "/hakkimda" | "/makaleler" | "/sss" | "/iletisim"; label: string };

export function MobileMenu({
  items,
  labels,
  switcher,
}: {
  items: Item[];
  labels: { menu: string; close: string; primary: string; appointment: string };
  switcher: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const f = Array.from(panelRef.current.querySelectorAll<HTMLElement>("a,button"));
        const [a, b] = [f[0], f[f.length - 1]];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); b.focus(); }
        else if (!e.shiftKey && document.activeElement === b) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="relative z-50 -mr-3 flex min-h-11 items-center gap-3 px-3 text-button font-medium"
      >
        <span>{open ? labels.close : labels.menu}</span>
        <span aria-hidden className="relative block h-3 w-5">
          <span className={`absolute left-0 h-px w-5 bg-ink transition-transform duration-300 ease-[var(--ease-out-quint)] ${open ? "top-1.5 rotate-45" : "top-0.5"}`} />
          <span className={`absolute left-0 h-px w-5 bg-ink transition-transform duration-300 ease-[var(--ease-out-quint)] ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            key="menu"
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={labels.primary}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] } }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }}
            className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 flex flex-col bg-ivory px-5 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-6 md:top-20 md:px-10"
          >
            <nav aria-label={labels.primary}>
              <m.ul initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } } }}>
                {items.map((it) => (
                  <m.li
                    key={it.href}
                    className="border-b border-line"
                    variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.23, 1, 0.32, 1] } } }}
                  >
                    <Link href={it.href} className="flex min-h-16 items-center justify-between font-serif text-[1.75rem] font-light">
                      {it.label}
                      <span aria-hidden className="text-bronze">→</span>
                    </Link>
                  </m.li>
                ))}
              </m.ul>
            </nav>
            <div className="mt-auto flex items-center justify-between gap-4 pt-8">
              {switcher}
              <Link href="/iletisim" className="btn btn-primary btn-lg">
                {labels.appointment}
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
