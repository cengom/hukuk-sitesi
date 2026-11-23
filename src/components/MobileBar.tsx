import { getTranslations } from "next-intl/server";
import { telHref, whatsappHref } from "@/site.config";

export async function MobileBar() {
  const t = await getTranslations("cta");
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 md:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a href={telHref} className="btn btn-primary">
          <PhoneIcon /> {t("call")}
        </a>
        <a href={whatsappHref(t("whatsappText"))} className="btn btn-gold" target="_blank" rel="noopener noreferrer">
          <ChatIcon /> {t("whatsappShort")}
        </a>
      </div>
    </div>
  );
}

export function PhoneIcon() {
  return (
    <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  );
}
export function ChatIcon() {
  return (
    <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    </svg>
  );
}
