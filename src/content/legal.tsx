import { site } from "@/site.config";
import type { Locale } from "@/i18n/routing";

/**
 * KVKK Aydınlatma Metni ve Çerez Politikası.
 * Not: Bu metinler sitenin gerçek veri akışına göre hazırlanmış taslaklardır; yayından önce
 * veri sorumlusu tarafından gözden geçirilmeli, [köşeli parantez] alanları doldurulmalıdır.
 */
const updated = "23.11.2026";

export const kvkk: Record<Locale, { title: string; description: string; body: React.ReactNode }> = {
  tr: {
    title: "KVKK Aydınlatma Metni",
    description: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında web sitesi ziyaretçileri ve iletişim formu kullanıcıları için aydınlatma metni.",
    body: (
      <>
        <p>Son güncelleme: {updated}</p>
        <h2>1. Veri sorumlusu</h2>
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca kişisel verileriniz, veri sorumlusu sıfatıyla Av. {site.lawyerName} ({site.bar.tr}, Sicil No {site.barNumber}; adres: {site.address.street}, {site.address.district} / {site.address.city}) tarafından aşağıda açıklanan kapsamda işlenmektedir.
        </p>
        <h2>2. İşlenen kişisel veriler</h2>
        <ul>
          <li><strong>Kimlik ve iletişim:</strong> ad soyad, telefon numarası, e-posta adresi.</li>
          <li><strong>Talep bilgisi:</strong> seçtiğiniz hukuk alanı ve mesajınızda kendi isteğinizle paylaştığınız bilgiler.</li>
          <li><strong>İşlem güvenliği:</strong> form gönderimi sırasında kötüye kullanımı önlemek amacıyla geçici olarak işlenen IP adresi.</li>
          <li><strong>Kullanım verisi:</strong> çerez kullanmayan, kimliğinizi belirlemeye yönelik olmayan toplu ziyaret ve performans ölçümleri.</li>
        </ul>
        <p>Lütfen iletişim formu aracılığıyla sağlık bilgisi, ceza mahkûmiyeti gibi özel nitelikli kişisel verilerinizi paylaşmayınız.</p>
        <h2>3. İşleme amaçları ve hukuki sebepler</h2>
        <ul>
          <li>Randevu ve bilgi talebinize dönüş yapılması: KVKK m. 5/1 uyarınca <strong>açık rızanız</strong>.</li>
          <li>Talebinizin bir avukatlık hizmeti ilişkisine dönüşmesi hâlinde ön değerlendirme yapılması: KVKK m. 5/2-c (bir sözleşmenin kurulmasıyla doğrudan ilgili olma).</li>
          <li>Sitenin ve formun güvenliğinin sağlanması, spam ve kötüye kullanımın önlenmesi: KVKK m. 5/2-f (meşru menfaat).</li>
          <li>Yasal yükümlülüklerin yerine getirilmesi: KVKK m. 5/2-ç.</li>
        </ul>
        <h2>4. Aktarım</h2>
        <p>
          Kişisel verileriniz yalnızca yukarıdaki amaçlarla ve hizmetin teknik olarak sunulabilmesi için; sitenin barındırma hizmetini sağlayan Vercel Inc. ve form iletilerinin e-posta ile ulaştırılmasını sağlayan Resend (Plus Five Five, Inc.) ile paylaşılır. Bu hizmet sağlayıcıların sunucuları yurt dışında (ABD ve/veya AB) bulunabilir. Yurt dışına aktarım, KVKK m. 9 kapsamında açık rızanıza ve/veya Kurul tarafından ilan edilen standart sözleşmelere dayanılarak yapılır. Verileriniz kanunen yetkili kamu kurum ve kuruluşları dışında üçüncü kişilerle paylaşılmaz.
        </p>
        <h2>5. Toplama yöntemi</h2>
        <p>Kişisel verileriniz, web sitesindeki iletişim formu, e-posta, telefon ve WhatsApp aracılığıyla elektronik ortamda toplanır.</p>
        <h2>6. Saklama süresi</h2>
        <p>Form aracılığıyla iletilen veriler, talep bir vekâlet ilişkisine dönüşmezse talebin sonuçlanmasından itibaren en geç [1 yıl] içinde silinir. Vekâlet ilişkisi kurulması hâlinde ilgili mevzuatta öngörülen süreler uygulanır.</p>
        <h2>7. Haklarınız</h2>
        <p>KVKK m. 11 uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini, silinmesini veya yok edilmesini isteme, bu işlemlerin aktarılan üçüncü kişilere bildirilmesini isteme, münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuca itiraz etme ve kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz. Açık rızanızı dilediğiniz zaman geri alabilirsiniz.</p>
        <p>Başvurularınızı Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ’e uygun olarak {site.email} adresine e-posta ile veya yukarıdaki adrese yazılı olarak iletebilirsiniz. Başvurular en geç otuz gün içinde ücretsiz olarak sonuçlandırılır.</p>
      </>
    ),
  },
  en: {
    title: "Privacy Notice",
    description: "Privacy notice under Turkish Personal Data Protection Law No. 6698 for website visitors and contact form users.",
    body: (
      <>
        <p>Last updated: {updated}. This English text is provided for convenience; the Turkish version prevails.</p>
        <h2>1. Data controller</h2>
        <p>Under Personal Data Protection Law No. 6698 (“KVKK”), your personal data is processed by Attorney {site.lawyerName} ({site.bar.en}, Reg. No {site.barNumber}; address: {site.address.street}, {site.address.district} / {site.address.city}) as data controller, as described below.</p>
        <h2>2. Data processed</h2>
        <ul>
          <li><strong>Identity and contact:</strong> name, phone number, email address.</li>
          <li><strong>Request details:</strong> the area of law you choose and any information you share in your message.</li>
          <li><strong>Security:</strong> IP address, processed temporarily to prevent misuse of the form.</li>
          <li><strong>Usage data:</strong> aggregated, cookieless visit and performance measurements that do not identify you.</li>
        </ul>
        <p>Please do not share special categories of data, such as health information or criminal records, through the contact form.</p>
        <h2>3. Purposes and legal bases</h2>
        <ul>
          <li>Responding to your appointment or information request: your <strong>explicit consent</strong> (Art. 5/1).</li>
          <li>Preliminary assessment where your request leads to a legal services engagement: Art. 5/2-c.</li>
          <li>Securing the website and form and preventing spam: legitimate interest, Art. 5/2-f.</li>
          <li>Compliance with legal obligations: Art. 5/2-ç.</li>
        </ul>
        <h2>4. Transfers</h2>
        <p>Your data is shared only as needed to provide the service technically: with Vercel Inc., which hosts the website, and Resend (Plus Five Five, Inc.), which delivers form messages by email. Their servers may be located abroad (USA and/or EU). Transfers abroad rely on your explicit consent and/or standard contracts announced by the Personal Data Protection Board under Art. 9. Your data is not shared with other third parties except authorised public authorities.</p>
        <h2>5. Retention</h2>
        <p>Data sent through the form is deleted within [1 year] after your request is concluded, unless an engagement follows, in which case statutory retention periods apply.</p>
        <h2>6. Your rights</h2>
        <p>Under Art. 11 KVKK you may learn whether your data is processed, request information, learn the purpose of processing and recipients, request correction, deletion or destruction, object to automated decisions and claim compensation for unlawful processing. You may withdraw consent at any time. Requests can be sent to {site.email} or in writing to the address above and are answered free of charge within thirty days.</p>
      </>
    ),
  },
};

export const cookiePolicy: Record<Locale, { title: string; description: string; body: React.ReactNode }> = {
  tr: {
    title: "Çerez Politikası",
    description: "Bu web sitesinde kullanılan çerezler ve benzeri teknolojiler hakkında bilgi.",
    body: (
      <>
        <p>Son güncelleme: {updated}</p>
        <h2>Çerez nedir?</h2>
        <p>Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınıza kaydedilen küçük metin dosyalarıdır. Bu sitede çerezlere benzer şekilde tarayıcının yerel depolama alanı da kullanılır.</p>
        <h2>Kullandığımız teknolojiler</h2>
        <ul>
          <li><strong>Zorunlu — dil tercihi (NEXT_LOCALE):</strong> Seçtiğiniz dili hatırlar. Süre: en fazla 1 yıl.</li>
          <li><strong>Zorunlu — çerez tercihi (yerel depolama):</strong> Çerez bandındaki seçiminizi hatırlar. Siz silene kadar saklanır.</li>
          <li><strong>Ölçüm — Vercel Web Analytics ve Speed Insights:</strong> Sayfa görüntülenme ve hız ölçümlerini çerez kullanmadan, kimliğinizi belirlemeyecek biçimde toplu olarak toplar.</li>
          <li><strong>Üçüncü taraf — Google Haritalar:</strong> İletişim sayfasındaki harita yalnızca “Tümünü kabul et” seçeneğini işaretlemeniz veya haritayı göstermeyi seçmeniz hâlinde yüklenir. Yüklendiğinde Google kendi çerezlerini kullanabilir.</li>
        </ul>
        <h2>Tercihlerinizi nasıl değiştirirsiniz?</h2>
        <p>Sayfanın alt kısmındaki “Çerez tercihleri” bağlantısıyla seçiminizi dilediğiniz zaman değiştirebilirsiniz. Tarayıcı ayarlarınızdan da çerezleri silebilir veya engelleyebilirsiniz.</p>
        <p>Kişisel verilerinizin işlenmesine ilişkin ayrıntılar için KVKK Aydınlatma Metni’ni inceleyebilirsiniz.</p>
      </>
    ),
  },
  en: {
    title: "Cookie Policy",
    description: "Information about cookies and similar technologies used on this website.",
    body: (
      <>
        <p>Last updated: {updated}</p>
        <h2>What are cookies?</h2>
        <p>Cookies are small text files stored in your browser when you visit a website. This site also uses the browser’s local storage in a similar way.</p>
        <h2>Technologies we use</h2>
        <ul>
          <li><strong>Necessary — language preference (NEXT_LOCALE):</strong> remembers your language. Up to 1 year.</li>
          <li><strong>Necessary — consent choice (local storage):</strong> remembers your cookie banner choice until you delete it.</li>
          <li><strong>Measurement — Vercel Web Analytics and Speed Insights:</strong> aggregated, cookieless page view and performance measurement that does not identify you.</li>
          <li><strong>Third party — Google Maps:</strong> the map on the contact page loads only if you choose “Accept all” or choose to show the map. Google may then set its own cookies.</li>
        </ul>
        <h2>Changing your preferences</h2>
        <p>Use the “Cookie settings” link at the bottom of the page at any time. You can also delete or block cookies in your browser settings.</p>
      </>
    ),
  },
};
