"use client";
import { useId, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import type { Faq } from "@/content/areas";

const ease = [0.23, 1, 0.32, 1] as const;

export function Accordion({ items, headingLevel = 3 }: { items: Faq[]; headingLevel?: 2 | 3 }) {
  return (
    <div className="border-t border-line">
      {items.map((it, i) => (
        <AccordionItem key={i} item={it} headingLevel={headingLevel} />
      ))}
    </div>
  );
}

function AccordionItem({ item, headingLevel }: { item: Faq; headingLevel: 2 | 3 }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="border-b border-line">
      <H className="m-0 font-sans">
        <button
          type="button"
          id={`${id}-btn`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-6 py-6 text-left font-serif text-h4 font-normal text-ink transition-colors duration-200 hover:text-bronze"
        >
          <span>{item.q}</span>
          <m.span
            aria-hidden
            className="relative block size-4 shrink-0 text-bronze"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.24, ease }}
          >
            <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
            <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current" />
          </m.span>
        </button>
      </H>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-btn`}
            key="panel"
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { height: { duration: 0.28, ease }, opacity: { duration: 0.2, delay: 0.05 } } }}
            exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.22, ease }, opacity: { duration: 0.12 } } }}
          >
            <p className="max-w-[68ch] pb-7 pr-10 text-ink-muted">{item.a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
