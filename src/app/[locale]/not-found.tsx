import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  const n = useTranslations("nav");
  return (
    <div className="wrap grid min-h-[60vh] content-center py-24">
      <p className="eyebrow enter">404</p>
      <h1 className="enter mt-4 max-w-[18ch] text-m-display md:text-display" style={{ ["--i" as string]: 1 }}>{t("title")}</h1>
      <p className="enter mt-6 max-w-[52ch] text-lead text-ink-muted" style={{ ["--i" as string]: 2 }}>{t("text")}</p>
      <div className="enter mt-10 flex flex-col gap-3 sm:flex-row" style={{ ["--i" as string]: 3 }}>
        <Link href="/" className="btn btn-primary btn-lg">{t("home")}</Link>
        <Link href="/calisma-alanlari" className="btn btn-outline btn-lg">{n("areas")}</Link>
      </div>
    </div>
  );
}
