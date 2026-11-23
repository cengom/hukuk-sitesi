export function Timeline({ steps, label }: { steps: { title: string; text: string }[]; label: string }) {
  return (
    <ol className="relative">
      {steps.map((s, i) => (
        <li key={i} className="relative grid grid-cols-[2.5rem_1fr] gap-x-5 pb-10 last:pb-0 md:grid-cols-[3.5rem_1fr]" data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
          <div className="relative flex justify-center">
            <span className="relative z-10 mt-1.5 flex size-7 items-center justify-center rounded-full border border-gold bg-ivory text-[0.75rem] font-medium text-bronze tabular-nums">
              {i + 1}
            </span>
            {i < steps.length - 1 && <span aria-hidden className="absolute bottom-[-0.25rem] top-9 w-px bg-line-strong" />}
          </div>
          <div>
            <p className="eyebrow">
              {label} {i + 1}
            </p>
            <h3 className="mt-1 text-h4">{s.title}</h3>
            <p className="mt-2 max-w-[60ch] text-ink-muted">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
