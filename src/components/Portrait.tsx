import Image from "next/image";
import { site } from "@/site.config";

export function Portrait({ priority = false, className = "" }: { priority?: boolean; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div aria-hidden className="absolute inset-0 -translate-x-4 translate-y-4 border border-gold md:-translate-x-5 md:translate-y-5" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-gradient-to-b from-[#ebe2cf] to-[#d8ccb3]">
        {site.portrait ? (
          <Image
            src={site.portrait}
            alt={`Av. ${site.lawyerName}`}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 480px, (min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div aria-hidden className="absolute inset-0 flex items-end justify-start p-8">
            <span className="font-serif text-[7rem] font-light italic leading-none text-ivory/70 md:text-[9rem]">AEK</span>
          </div>
        )}
      </div>
    </div>
  );
}
