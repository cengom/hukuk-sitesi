"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { sendContact, type ContactState } from "@/app/actions/contact";

export function ContactForm({ areas }: { areas: { id: string; name: string }[] }) {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });
  const [started, setStarted] = useState(0);
  const statusRef = useRef<HTMLDivElement>(null);
  useEffect(() => setStarted(Date.now()), []);
  useEffect(() => {
    if (state.status === "error" && state.errors) {
      const first = Object.keys(state.errors)[0];
      requestAnimationFrame(() => document.getElementById(`f-${first}`)?.focus());
    } else if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-md border border-gold bg-paper p-8 outline-none">
        <p className="font-serif text-h3">{t("success")}</p>
      </div>
    );
  }
  const e = state.errors ?? {};
  const val = state.values ?? {};
  const field = "mt-2 block w-full rounded-md border bg-paper px-4 py-3.5 text-body text-ink placeholder:text-ink-muted/80 transition-[border-color,box-shadow] duration-200 focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze";
  const border = (k: keyof typeof e) => (e[k] ? "border-error" : "border-line-strong");
  const Err = ({ k }: { k: keyof typeof e }) => (e[k] ? <p id={`f-${k}-err`} className="mt-2 text-small text-error">{e[k]}</p> : null);
  const desc = (k: keyof typeof e, extra?: string) => [e[k] ? `f-${k}-err` : null, extra].filter(Boolean).join(" ") || undefined;

  return (
    <form action={action} noValidate aria-label={t("title")} className="grid gap-6">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="started" value={started} />
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-company">Company</label>
        <input id="f-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="f-name" className="text-small font-medium">{t("name")}</label>
        <input id="f-name" name="name" autoComplete="name" required defaultValue={val.name} aria-invalid={!!e.name} aria-describedby={desc("name")} className={`${field} ${border("name")}`} />
        <Err k="name" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="f-phone" className="text-small font-medium">{t("phone")}</label>
          <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required defaultValue={val.phone} aria-invalid={!!e.phone} aria-describedby={desc("phone")} className={`${field} ${border("phone")}`} />
          <Err k="phone" />
        </div>
        <div>
          <label htmlFor="f-email" className="text-small font-medium">{t("email")}</label>
          <input id="f-email" name="email" type="email" inputMode="email" autoComplete="email" required defaultValue={val.email} aria-invalid={!!e.email} aria-describedby={desc("email")} className={`${field} ${border("email")}`} />
          <Err k="email" />
        </div>
      </div>
      <div>
        <label htmlFor="f-area" className="text-small font-medium">{t("area")}</label>
        <div className="relative">
          <select id="f-area" name="area" required defaultValue={val.area ?? ""} aria-invalid={!!e.area} aria-describedby={desc("area")} className={`${field} ${border("area")} appearance-none pr-10`}>
            <option value="" disabled>{t("areaPlaceholder")}</option>
            {areas.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            <option value="diger">{t("areaOther")}</option>
          </select>
          <svg aria-hidden className="pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-ink-muted" width="12" height="8" viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
        </div>
        <Err k="area" />
      </div>
      <div>
        <label htmlFor="f-message" className="text-small font-medium">{t("message")}</label>
        <textarea id="f-message" name="message" rows={6} required defaultValue={val.message} aria-invalid={!!e.message} aria-describedby={desc("message", "f-message-hint")} className={`${field} ${border("message")} resize-y`} />
        <p id="f-message-hint" className="mt-2 text-small text-ink-muted">{t("messageHint")}</p>
        <Err k="message" />
      </div>
      <div>
        <div className="flex items-start gap-3">
          <input id="f-consent" name="consent" type="checkbox" required aria-invalid={!!e.consent} aria-describedby={desc("consent")} className="mt-1 size-5 shrink-0 cursor-pointer accent-[#8a6516]" />
          <label htmlFor="f-consent" className="text-small text-ink-muted">
            {t.rich("consent", { link: (c) => <Link href="/kvkk" className="link" target="_blank">{c}</Link> })}
          </label>
        </div>
        <Err k="consent" />
      </div>
      {state.status === "error" && state.message && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="rounded-md border border-error/40 bg-paper p-4 text-small text-error outline-none">{state.message}</div>
      )}
      <div>
        <button type="submit" disabled={pending} className="btn btn-primary btn-lg w-full disabled:opacity-70 md:w-auto">
          {pending ? t("sending") : t("submit")}
        </button>
      </div>
    </form>
  );
}
