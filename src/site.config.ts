/**
 * Büronun kimlik ve iletişim bilgileri.
 * [Köşeli parantez] içindeki değerler YER TUTUCUDUR; yayından önce gerçek bilgilerle değiştirilmelidir.
 */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ornek.av.tr",
  lawyerName: "Aleyna Elif Karaoğlu",
  title: "Av. Aleyna Elif Karaoğlu",
  firmName: "Karaoğlu Hukuk Bürosu", // [Büro adı — onaylanacak]
  bar: { tr: "İstanbul Barosu", en: "Istanbul Bar Association" },
  barNumber: "[Sicil No]",
  city: "İstanbul",
  address: {
    street: "[Sokak / Cadde, No]",
    district: "[İlçe]",
    city: "İstanbul",
    postalCode: "[Posta kodu]",
    country: "TR",
  },
  // Uluslararası biçim, boşluksuz: +905xxxxxxxxx
  phone: "+900000000000", // [Telefon]
  phoneDisplay: "[Telefon]",
  whatsapp: "900000000000", // [WhatsApp — başında + olmadan]
  email: "iletisim@ornek.av.tr", // [E-posta]
  hours: { tr: "Pazartesi–Cuma, 09.00–18.00", en: "Monday–Friday, 09:00–18:00" },
  openingHoursSpec: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
  // Google Haritalar gömme bağlantısı (Paylaş > Harita yerleştir > src değeri)
  mapEmbedUrl: "https://www.google.com/maps?q=Istanbul&output=embed", // [Ofis konumu]
  languages: ["Türkçe", "English"],
  // Portre fotoğrafı: public/images/portre.jpg olarak ekleyip aşağıdaki satırı açın (en az 1200×1500 px, dikey).
  portrait: null as string | null, // "/images/portre.jpg"
} as const;

export const whatsappHref = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
export const telHref = `tel:${site.phone}`;
