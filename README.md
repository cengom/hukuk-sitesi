# Av. Aleyna Elif Karaoğlu — Web Sitesi

Next.js (App Router) + TypeScript + Tailwind CSS v4 ile yazılmış, Türkçe ve İngilizce iki dilli avukatlık bürosu sitesi.
Tasarım sistemi Figma’daki “Aleyna Elif Karaoğlu Hukuk Bürosu — Tasarım Sistemi” dosyasıyla birebir eşleşir.

## İçindekiler
1. [Hızlı kurulum](#1-hızlı-kurulum)
2. [Ortam değişkenleri](#2-ortam-değişkenleri)
3. [Yayından önce doldurulacak bilgiler](#3-yayından-önce-doldurulacak-bilgiler)
4. [Yeni makale ekleme](#4-yeni-makale-ekleme)
5. [Çalışma alanı ve SSS içeriklerini düzenleme](#5-çalışma-alanı-ve-sss-içeriklerini-düzenleme)
6. [Vercel’e yayın ve alan adı bağlama](#6-vercele-yayın-ve-alan-adı-bağlama)
7. [Klasör yapısı](#7-klasör-yapısı)
8. [Bakım](#8-bakım)
9. [Reklam yasağı kontrol listesi](#9-reklam-yasağı-kontrol-listesi)

---

## 1. Hızlı kurulum

Gereksinim: Node.js 20.9 veya üzeri (önerilen 22).

```bash
npm install
cp .env.example .env.local   # değerleri doldurun
npm run dev                  # http://localhost:3000
```

Üretim derlemesini yerelde denemek için:

```bash
npm run build && npm start
```

Tip kontrolü: `npm run lint`

## 2. Ortam değişkenleri

| Değişken | Açıklama | Örnek |
|---|---|---|
| `RESEND_API_KEY` | Resend API anahtarı. resend.com → API Keys. | `re_xxx` |
| `CONTACT_TO_EMAIL` | Form mesajlarının gideceği adres. | `iletisim@ornek.av.tr` |
| `CONTACT_FROM_EMAIL` | Gönderici. Resend’de **doğrulanmış alan adından** olmalı. | `Web Sitesi <form@ornek.av.tr>` |
| `NEXT_PUBLIC_SITE_URL` | Sitenin canlı adresi (canonical, hreflang, sitemap, OG). Sonunda `/` olmasın. | `https://ornek.av.tr` |

Vercel’de: Project → Settings → Environment Variables. Değişiklikten sonra yeniden yayın (Redeploy) gerekir.

**Resend alan adı doğrulama:** resend.com → Domains → Add Domain → verilen SPF/DKIM DNS kayıtlarını alan adı sağlayıcınıza ekleyin. Doğrulama tamamlanmadan e-posta gönderilmez.

Anahtarlar tanımlı değilse form, kullanıcıya “gönderilemedi” uyarısı gösterir ve sunucu günlüğüne hangi değişkenin eksik olduğunu yazar.

## 3. Yayından önce doldurulacak bilgiler

Tüm kimlik ve iletişim bilgileri tek dosyada: **`src/site.config.ts`**. Köşeli parantezli `[...]` her değer yer tutucudur.

- Baro sicil numarası, adres, telefon, WhatsApp numarası, e-posta
- Google Haritalar gömme bağlantısı (`mapEmbedUrl`): Google Haritalar’da ofisi açın → Paylaş → Harita yerleştir → `src="..."` içindeki adres
- Portre: `public/images/portre.jpg` olarak ekleyin, `portrait: "/images/portre.jpg"` satırını açın (dikey, en az 1200×1500 px)

Ayrıca şu metinlerdeki yer tutucuları doldurun:
- `src/app/[locale]/hakkimda/page.tsx` — eğitim, deneyim yılı, diller
- `src/app/[locale]/page.tsx` — ana sayfadaki kısa biyografi
- `src/content/legal.tsx` — KVKK metnindeki saklama süresi; metnin tamamı veri sorumlusu olarak sizin tarafınızdan gözden geçirilmelidir.

## 4. Yeni makale ekleme

Makaleler `content/makaleler/` klasöründe **MDX** dosyalarıdır. Dosya adı adres olur:
`content/makaleler/velayet-degisikligi.mdx` → `/makaleler/velayet-degisikligi`

1. Yeni bir `.mdx` dosyası oluşturun (dosya adında Türkçe karakter ve boşluk kullanmayın; `-` kullanın).
2. En üste şu bilgileri yazın:

```mdx
---
title: "Velayetin değiştirilmesi hangi durumlarda istenebilir?"
description: "Arama sonuçlarında görünen 150–160 karakterlik özet."
category: aile        # aile | yabancilar | gayrimenkul | ceza | is | tazminat
date: "2026-12-01"
updated: "2026-12-15" # isteğe bağlı
---

Giriş paragrafı…

## Ana başlık          ← İçindekiler tablosuna otomatik eklenir

Metin…

### Alt başlık

- Madde işaretli liste
1. Numaralı liste

**Kalın** ve [bağlantı](https://ornek.av.tr) kullanılabilir.
```

3. Kaydedip yayınlayın (GitHub’a gönderdiğinizde Vercel otomatik yayınlar).

Okuma süresi, içindekiler tablosu, kategori filtresi, “Bu içerik genel bilgilendirme amaçlıdır…” notu, Article ve BreadcrumbList yapılandırılmış verisi ve sitemap kaydı otomatik oluşur.

**Yazım ilkeleri (reklam yasağı):** “en iyi, uzman, garantili, kazandığımız davalar” gibi ifadeler, müvekkil yorumları, başarı oranları ve ücret bilgisi kullanmayın. Somut bir dosyadan söz edecekseniz kimliği belirlenemeyecek biçimde anlatın.

> Makaleler şu an yalnızca Türkçe yayımlanır. İngilizce makale desteği eklemek için `src/lib/articles.ts` içinde dile göre klasör ayrımı yapılabilir.

## 5. Çalışma alanı ve SSS içeriklerini düzenleme

- Altı çalışma alanının tüm içeriği (giriş, hizmetler, süreç adımları, SSS, SEO başlıkları; TR ve EN) **`src/content/areas.ts`** dosyasındadır.
- Genel SSS soruları aynı dosyanın sonundaki `generalFaqs` bölümündedir.
- Arayüz metinleri (menü, butonlar, form etiketleri): `messages/tr.json` ve `messages/en.json`.

SSS yanıtları sayfada akordeon olarak gösterilir ve FAQPage yapılandırılmış verisine otomatik eklenir.

**Arapça ve Rusça:** yapı hazırdır. `src/i18n/routing.ts` içinde `locales` dizisine `"ar"`, `"ru"` ekleyin; `messages/ar.json`, `messages/ru.json` oluşturun; `areas.ts` içindeki her alana ilgili dil alanlarını ekleyin. Arapça için `src/app/[locale]/layout.tsx` içinde `<html dir={locale === "ar" ? "rtl" : "ltr"}>` ayarı yapılmalıdır.

## 6. Vercel’e yayın ve alan adı bağlama

### İlk yayın
1. Kodu GitHub’daki depoya gönderin.
2. vercel.com → Add New → Project → depoyu seçin. Framework otomatik “Next.js” algılanır.
3. Ortam değişkenlerini (bölüm 2) ekleyin → Deploy.
4. Project → Analytics ve Speed Insights sekmelerinden ikisini de **Enable** edin (kod zaten ekli).

Bundan sonra `main` dalına her gönderim canlıya, diğer dallar önizleme (preview) adresine yayınlanır.

### Alan adı bağlama (ör. `ornek.av.tr`)
1. Vercel → Project → Settings → Domains → `ornek.av.tr` ve `www.ornek.av.tr` ekleyin; `www`’yi ana adrese yönlendirin.
2. Alan adı sağlayıcınızın (`.av.tr` alan adları TRABİS üzerinden, kayıt firmanız aracılığıyla yönetilir) DNS paneline Vercel’in gösterdiği kayıtları girin. Genellikle:
   - Kök alan adı (`@`): **A** kaydı → `76.76.21.21`
   - `www`: **CNAME** → `cname.vercel-dns.com`
   (Vercel panelinde gösterilen güncel değerleri esas alın.)
3. DNS yayılımı birkaç dakika ile 48 saat sürebilir. SSL sertifikası Vercel tarafından otomatik verilir.
4. `NEXT_PUBLIC_SITE_URL` değişkenini `https://ornek.av.tr` yapın ve yeniden yayınlayın.
5. Google Search Console’a alan adını ekleyip `https://ornek.av.tr/sitemap.xml` adresini gönderin.

## 7. Klasör yapısı

```
content/makaleler/        MDX makaleler
messages/                 Arayüz çevirileri (tr, en)
public/                   Görseller (portre vb.)
assets/                   OG görseli için yazı tipleri
src/
  site.config.ts          Kimlik ve iletişim bilgileri  ← en sık düzenlenen dosya
  content/areas.ts        Çalışma alanları + SSS (TR/EN)
  content/legal.tsx       KVKK ve Çerez Politikası metinleri
  app/[locale]/           Sayfalar (ana sayfa, hakkımda, alanlar, makaleler, sss, iletişim, kvkk, çerez)
  app/actions/contact.ts  İletişim formu Server Action (Resend, honeypot, rate limit)
  app/sitemap.ts, robots.ts, [locale]/opengraph-image.tsx
  components/             Header, Footer, Accordion, Timeline, ContactForm, CookieBanner…
  i18n/                   next-intl yönlendirme (TR adresler: /hakkimda, EN: /en/about)
  lib/                    Makale okuyucu, SEO ve JSON-LD yardımcıları
  proxy.ts                Dil yönlendirmesi (Next.js 16 “proxy”, eski adıyla middleware)
```

## 8. Bakım

- **Bağımlılıklar:** üç ayda bir `npm outdated` ile kontrol edin; `npm update` sonrası `npm run build` ile doğrulayın. Next.js ana sürüm yükseltmelerinde sürüm notlarını okuyun.
- **Form güvenliği:** honeypot alanı, 2 saniyeden kısa gönderimlerin reddi ve IP başına 10 dakikada 5 talep sınırı vardır. Bu sınır sunucu örneği başına bellekte tutulur; yoğun spam görülürse Upstash Redis (Vercel Marketplace) ile kalıcı sınıra geçilebilir veya Cloudflare Turnstile eklenebilir.
- **Mevzuat takibi:** makalelerdeki süre ve tutarlar (ör. yatırım yoluyla vatandaşlık tutarı, kıdem tazminatı tavanı) değiştiğinde ilgili makaleyi ve `updated` tarihini güncelleyin.
- **Performans:** Vercel → Speed Insights’tan Core Web Vitals değerlerini izleyin. Yeni görselleri `next/image` ile ekleyin.
- **Tasarım değişiklikleri:** renk ve tipografi değişkenleri `src/app/globals.css` içindeki `@theme` bloğundadır; Figma’daki değişkenlerle aynı adlandırmayı koruyun.

## 9. Reklam yasağı kontrol listesi

Avukatlık Kanunu m. 55 ve TBB Meslek Kuralları ile Reklam Yasağı Yönetmeliği çerçevesinde sitede bilinçli olarak **bulunmayanlar**:

- Üstünlük ifadeleri (“en iyi”, “uzman”, “lider”, “garantili”, “%100”)
- Müvekkil yorumları, referans listeleri, yıldız puanları, logo duvarları
- Kazanılan dava sayısı, başarı oranı, yıl/dava sayaçları
- Ücret, indirim, kampanya bilgisi
- Satış dili ve aciliyet baskısı (“hemen arayın”, “son fırsat”)

Bulunanlar: baro ve sicil bilgisi (footer), her makalenin altında bilgilendirme notu, KVKK aydınlatma metni, çerez politikası ve onay bandı, formda açık rıza kutusu.
