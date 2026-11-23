"use client";
import { useId, useState } from "react";
import type { Faq } from "@/content/areas";

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
          className="group flex w-full items-center justify-between gap-6 py-6 text-left font-serif text-h4 font-normal text-ink transition-colors duration-200 hover:text-bronze"
        >
          <span>{item.q}</span>
          <span
            aria-hidden
            className="relative block size-4 shrink-0 text-bronze transition-transform duration-300 ease-[var(--ease-out-quint)] motion-reduce:transition-none"
            style={{ transform: open ? "rotate(45deg)" : "none" }}
          >
            <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
            <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current" />
          </span>
        </button>
      </H>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className="grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out-quint)] motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        inert={!open}
      >
        <div className="overflow-hidden">
          <p className="max-w-[68ch] pb-7 pr-10 text-ink-muted">{item.a}</p>
        </div>
      </div>
    </div>
  );
}
