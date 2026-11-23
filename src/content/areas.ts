import type { Locale } from "@/i18n/routing";

type L<T> = Record<Locale, T>;
export type Faq = { q: string; a: string };
export type Area = {
  id: string;
  slug: L<string>;
  name: L<string>;
  short: L<string>;
  seoTitle: L<string>;
  seoDescription: L<string>;
  intro: L<string[]>;
  services: L<string[]>;
  steps: L<{ title: string; text: string }[]>;
  faqs: L<Faq[]>;
};

export const areas: Area[] = [
  {
    id: "aile",
    slug: { tr: "aile-hukuku", en: "family-law" },
    name: { tr: "Aile Hukuku", en: "Family Law" },
    short: {
      tr: "Boşanma, nafaka, velayet, mal paylaşımı ve anlaşmalı boşanma protokolü.",
      en: "Divorce, maintenance, custody, division of property and settlement agreements.",
    },
    seoTitle: {
      tr: "İstanbul Boşanma Avukatı — Aile Hukuku | Av. Aleyna Elif Karaoğlu",
      en: "Family and Divorce Lawyer in Istanbul | Aleyna Elif Karaoğlu",
    },
    seoDescription: {
      tr: "Anlaşmalı ve çekişmeli boşanma, nafaka, velayet ve mal paylaşımı süreçleri hakkında bilgi; İstanbul’da aile hukuku danışmanlığı ve dava takibi.",
      en: "Information on contested and uncontested divorce, maintenance, custody and division of property; family law advice and representation in Istanbul.",
    },
    intro: {
      tr: [
        "Aile hukukundaki uyuşmazlıklar hem hukuki hem de kişisel olarak zorlayıcıdır. Bu süreçte amaç, haklarınızı ve seçeneklerinizi açıkça görmeniz ve kararlarınızı bilgiyle vermenizdir.",
        "Anlaşmalı boşanma protokolünün hazırlanmasından çekişmeli boşanma davalarına, velayet ve nafaka taleplerinden mal rejiminin tasfiyesine kadar her aşamada danışmanlık ve temsil hizmeti verilir.",
      ],
      en: [
        "Family disputes are demanding both legally and personally. The aim is for you to see your rights and options clearly and make informed decisions.",
        "Advice and representation are provided at every stage, from drafting a divorce settlement agreement to contested divorce proceedings, custody and maintenance claims and the liquidation of the matrimonial property regime.",
      ],
    },
    services: {
      tr: [
        "Anlaşmalı boşanma protokolünün hazırlanması ve davanın takibi",
        "Çekişmeli boşanma davaları",
        "Tedbir, yoksulluk ve iştirak nafakası talepleri; nafakanın artırılması veya kaldırılması",
        "Velayet, çocukla kişisel ilişki kurulması ve velayetin değiştirilmesi",
        "Mal rejiminin tasfiyesi ve katılma alacağı davaları",
        "Yabancı mahkeme boşanma kararlarının tanınması ve tenfizi",
        "6284 sayılı Kanun kapsamında koruma tedbirleri",
      ],
      en: [
        "Drafting uncontested divorce settlement agreements and handling the case",
        "Contested divorce proceedings",
        "Interim, post-divorce and child maintenance claims; increase or termination of maintenance",
        "Custody, contact arrangements and change of custody",
        "Liquidation of the matrimonial property regime and participation claims",
        "Recognition and enforcement of foreign divorce judgments",
        "Protective orders under Law No. 6284",
      ],
    },
    steps: {
      tr: [
        { title: "İlk görüşme", text: "Evliliğin süresi, çocuklar, malvarlığı ve beklentileriniz konuşulur; gerekli belgeler listelenir." },
        { title: "Yolun belirlenmesi", text: "Anlaşmalı mı çekişmeli mi ilerleneceği, olası talepler ve riskler birlikte değerlendirilir." },
        { title: "Protokol veya dava dilekçesi", text: "Anlaşma varsa protokol hazırlanır; yoksa dava dilekçesi ve deliller düzenlenir." },
        { title: "Duruşma süreci", text: "Aile mahkemesindeki duruşmalara katılınır; tanık, bilirkişi ve sosyal inceleme raporu süreçleri takip edilir." },
        { title: "Karar ve sonrası", text: "Kararın kesinleşmesi, nüfus kaydına işlenmesi ve nafaka ya da velayet kararlarının uygulanması izlenir." },
      ],
      en: [
        { title: "First meeting", text: "We discuss the length of the marriage, children, assets and your expectations, and list the documents needed." },
        { title: "Choosing the route", text: "We assess together whether to proceed by agreement or through contested proceedings, and the possible claims and risks." },
        { title: "Agreement or petition", text: "If there is agreement, a settlement protocol is drafted; otherwise the petition and evidence are prepared." },
        { title: "Hearings", text: "We attend hearings at the family court and follow witness, expert and social services report stages." },
        { title: "Judgment and after", text: "We follow finalisation of the judgment, its registration and the enforcement of maintenance or custody orders." },
      ],
    },
    faqs: {
      tr: [
        { q: "Anlaşmalı boşanma için hangi şartlar gerekir?", a: "Türk Medeni Kanunu’nun 166/3. maddesine göre evliliğin en az bir yıl sürmüş olması, eşlerin birlikte başvurması ya da birinin açtığı davayı diğerinin kabul etmesi ve hâkimin tarafları bizzat dinleyerek protokolü uygun bulması gerekir." },
        { q: "Anlaşmalı boşanma ne kadar sürer?", a: "Protokol hazır ve taraflar duruşmaya katılıyorsa dava çoğu zaman tek duruşmada sonuçlanır. Duruşma tarihinin ne zaman verileceği mahkemenin iş yüküne göre değişir." },
        { q: "Velayet kararında nelere bakılır?", a: "Mahkeme, çocuğun üstün yararını esas alır. Çocuğun yaşı, bakım ihtiyacı, ebeveynlerin koşulları ve idrak çağındaki çocuğun görüşü değerlendirilir; gerekirse sosyal inceleme raporu alınır." },
        { q: "Evlilik içinde edinilen mallar nasıl paylaşılır?", a: "1 Ocak 2002’den sonra edinilen mallar için, aksi kararlaştırılmadıkça edinilmiş mallara katılma rejimi uygulanır. Kural olarak eşler, diğerinin edinilmiş mallarının artık değerinin yarısı üzerinde hak sahibidir; her dosyanın kendi koşulları ayrıca incelenir." },
      ],
      en: [
        { q: "What are the requirements for an uncontested divorce?", a: "Under Article 166/3 of the Turkish Civil Code, the marriage must have lasted at least one year, the spouses must apply together or one must accept the other’s case, and the judge must hear both parties in person and approve the agreement." },
        { q: "How long does an uncontested divorce take?", a: "If the agreement is ready and both parties attend, the case is often concluded at a single hearing. When the hearing is scheduled depends on the court’s workload." },
        { q: "What does the court consider in custody decisions?", a: "The court is guided by the best interests of the child, considering the child’s age and care needs, the parents’ circumstances and, where the child is old enough, the child’s own views; a social services report may be obtained." },
        { q: "How is property acquired during the marriage divided?", a: "For property acquired after 1 January 2002, the regime of participation in acquired property applies unless otherwise agreed. As a rule, each spouse is entitled to half of the net value of the other’s acquired property; the circumstances of each case are examined separately." },
      ],
    },
  },
  {
    id: "yabancilar",
    slug: { tr: "yabancilar-hukuku", en: "immigration-law" },
    name: { tr: "Yabancılar Hukuku", en: "Immigration Law" },
    short: {
      tr: "İkamet ve çalışma izni, vatandaşlık başvurusu, deport ve giriş yasağına itiraz.",
      en: "Residence and work permits, citizenship applications, deportation and entry bans.",
    },
    seoTitle: {
      tr: "İstanbul Yabancılar Hukuku Avukatı — İkamet, Vatandaşlık, Deport | Av. Aleyna Elif Karaoğlu",
      en: "Immigration Lawyer in Istanbul — Residence Permits, Citizenship, Deportation | Aleyna Elif Karaoğlu",
    },
    seoDescription: {
      tr: "İkamet izni, çalışma izni, yatırım yoluyla vatandaşlık, deport kararı, idari gözetim ve giriş yasağına itiraz süreçleri hakkında bilgi ve hukuki destek.",
      en: "Information and legal support on residence and work permits, citizenship by investment, deportation orders, administrative detention and entry bans in Türkiye.",
    },
    intro: {
      tr: [
        "Türkiye’de yaşayan, çalışan veya yatırım yapan yabancılar için idari süreçler çoğu zaman kısa sürelere ve ayrıntılı belge koşullarına bağlıdır. Bir başvurunun reddi ya da bir sınır dışı etme kararı, kısa sürede hareket etmeyi gerektirir.",
        "6458 sayılı Yabancılar ve Uluslararası Koruma Kanunu ile ilgili mevzuat çerçevesinde başvurularda danışmanlık, ret ve sınır dışı etme kararlarına karşı itiraz ve dava süreçlerinde temsil hizmeti verilir. Görüşmeler İngilizce de yapılabilir.",
      ],
      en: [
        "For foreign nationals living, working or investing in Türkiye, administrative procedures are often tied to short deadlines and detailed document requirements. A refused application or a deportation order calls for prompt action.",
        "Advice on applications and representation in objections and court proceedings against refusals and removal decisions are provided under Law No. 6458 on Foreigners and International Protection and related legislation. Meetings are held in English.",
      ],
    },
    services: {
      tr: [
        "Kısa dönem, aile, öğrenci ve uzun dönem ikamet izni başvuruları",
        "Çalışma izni ve turkuaz kart başvuruları",
        "Yatırım yoluyla ve diğer yollarla Türk vatandaşlığı başvuruları",
        "İkamet izni reddi ve iptaline karşı itiraz ve iptal davaları",
        "Sınır dışı etme (deport) kararlarına karşı dava",
        "İdari gözetim kararlarına karşı sulh ceza hâkimliğine başvuru",
        "Giriş yasağı ve tahdit kodlarının kaldırılması talepleri",
      ],
      en: [
        "Short-term, family, student and long-term residence permit applications",
        "Work permit and Turquoise Card applications",
        "Turkish citizenship applications, including by investment",
        "Objections and annulment actions against refusal or cancellation of residence permits",
        "Court actions against deportation orders",
        "Applications to the criminal judgeship of peace against administrative detention",
        "Requests to lift entry bans and restriction codes",
      ],
    },
    steps: {
      tr: [
        { title: "Durum tespiti", text: "Pasaport, vize ve izin geçmişi, varsa tebliğ edilen karar ve süreler incelenir." },
        { title: "Süre ve yol haritası", text: "Başvuru, itiraz veya dava yollarından hangisinin uygun olduğu ve son tarihler belirlenir." },
        { title: "Belgelerin hazırlanması", text: "Dilekçe, tercüme ve onay gerektiren belgeler listelenir ve birlikte hazırlanır." },
        { title: "Başvuru veya dava", text: "İl Göç İdaresi, ilgili bakanlık ya da idare mahkemesi nezdinde süreç başlatılır." },
        { title: "Takip", text: "Sonuç, randevu ve kart teslimi ya da yargı kararı izlenir; gerekirse üst yargı yolu değerlendirilir." },
      ],
      en: [
        { title: "Assessment", text: "We review your passport, visa and permit history and any decision served on you, with its deadlines." },
        { title: "Deadlines and roadmap", text: "We determine whether an application, objection or court action is appropriate, and the final dates." },
        { title: "Documents", text: "We list and prepare the petitions and documents that require translation or certification." },
        { title: "Filing", text: "The procedure is started before the Provincial Migration Directorate, the relevant ministry or the administrative court." },
        { title: "Follow-up", text: "We follow the outcome, appointments and card delivery or the court’s decision, and assess appeals where needed." },
      ],
    },
    faqs: {
      tr: [
        { q: "Sınır dışı etme kararına karşı ne kadar sürede dava açılabilir?", a: "6458 sayılı Kanun’un 53. maddesine göre karar kendisine, varsa avukatına tebliğ edilen yabancı, tebliğden itibaren yedi gün içinde idare mahkemesine başvurabilir. Süre çok kısa olduğu için kararın tebliğ edildiği gün harekete geçmek önemlidir." },
        { q: "İdari gözetim kararına nasıl itiraz edilir?", a: "İdari gözetim altına alınan yabancı veya temsilcisi, karara karşı sulh ceza hâkimliğine başvurabilir. Başvuru idari gözetimi kendiliğinden durdurmaz; hâkimlik kararını kısa sürede verir." },
        { q: "İkamet izni başvurum reddedildi, ne yapabilirim?", a: "Ret kararının gerekçesine göre yeni bir başvuru yapmak, idari itirazda bulunmak veya idare mahkemesinde iptal davası açmak mümkün olabilir. Dava açma süresi kural olarak tebliğden itibaren altmış gündür; durumunuzun ayrıca incelenmesi gerekir." },
        { q: "Yatırım yoluyla vatandaşlıkta asgari tutar nedir?", a: "Asgari yatırım tutarları ve koşullar Türk Vatandaşlığı Kanununun Uygulanmasına İlişkin Yönetmelik ile belirlenir ve zaman zaman değişir. Başvuru öncesinde güncel tutarın ve gayrimenkulün niteliğinin ayrıca kontrol edilmesi gerekir." },
      ],
      en: [
        { q: "How long do I have to challenge a deportation order?", a: "Under Article 53 of Law No. 6458, the foreign national, or their lawyer, may apply to the administrative court within seven days of service of the decision. Because the period is very short, it is important to act on the day the decision is served." },
        { q: "How can administrative detention be challenged?", a: "The detained person or their representative may apply to the criminal judgeship of peace. The application does not automatically suspend detention; the judgeship decides promptly." },
        { q: "My residence permit was refused. What can I do?", a: "Depending on the reasons, it may be possible to reapply, file an administrative objection or bring an annulment action before the administrative court. The time limit for a court action is, as a rule, sixty days from service; your situation should be reviewed individually." },
        { q: "What is the minimum investment for citizenship by investment?", a: "Minimum amounts and conditions are set by the Regulation on the Implementation of the Turkish Citizenship Law and change from time to time. The current amount and the eligibility of the property should be checked before applying." },
      ],
    },
  },
  {
    id: "gayrimenkul",
    slug: { tr: "gayrimenkul-hukuku", en: "real-estate-law" },
    name: { tr: "Gayrimenkul Hukuku", en: "Real Estate Law" },
    short: {
      tr: "Tapu iptali ve tescil, kira ve tahliye, kat karşılığı inşaat, ortaklığın giderilmesi.",
      en: "Title deed disputes, tenancy and eviction, construction-for-land contracts, partition.",
    },
    seoTitle: {
      tr: "İstanbul Gayrimenkul Avukatı — Tapu, Kira, Tahliye | Av. Aleyna Elif Karaoğlu",
      en: "Real Estate Lawyer in Istanbul — Title Deeds, Tenancy, Eviction | Aleyna Elif Karaoğlu",
    },
    seoDescription: {
      tr: "Tapu iptali ve tescil, kira tespiti ve tahliye, kat karşılığı inşaat sözleşmeleri ve ortaklığın giderilmesi davaları hakkında bilgi ve hukuki destek.",
      en: "Information and legal support on title deed annulment, rent determination and eviction, construction-for-land contracts and partition actions.",
    },
    intro: {
      tr: [
        "Gayrimenkul uyuşmazlıkları çoğu zaman yüksek değerli ve uzun soluklu olur. Sözleşmenin doğru kurulması, tapu kayıtlarının ve sürelerin baştan doğru okunması, sonradan doğabilecek pek çok sorunu önler.",
        "Alım satım öncesi incelemeden kira ilişkisinin kurulmasına, tahliye ve tespit davalarından paylı mülkiyetin sona erdirilmesine kadar danışmanlık ve dava takibi hizmeti verilir.",
      ],
      en: [
        "Real estate disputes are often high in value and long-running. Drafting the contract correctly and reading land registry records and deadlines properly from the start prevents many later problems.",
        "Advice and representation are provided from pre-purchase review and tenancy agreements to eviction and rent determination cases and the ending of co-ownership.",
      ],
    },
    services: {
      tr: [
        "Tapu iptali ve tescil davaları (muris muvazaası dahil)",
        "Kira sözleşmelerinin hazırlanması, kira tespiti ve uyarlama davaları",
        "Tahliye davaları ve icra yoluyla tahliye",
        "Kat karşılığı inşaat sözleşmeleri ve bu sözleşmelerden doğan uyuşmazlıklar",
        "Ortaklığın giderilmesi (izale-i şuyu) davaları",
        "Alım satım öncesi tapu ve imar durumu incelemesi",
        "Zorunlu arabuluculuk süreçlerinde temsil",
      ],
      en: [
        "Title deed annulment and registration actions (including collusive transfers by a deceased)",
        "Drafting tenancy agreements, rent determination and adaptation actions",
        "Eviction actions and eviction through enforcement offices",
        "Construction-for-land contracts and related disputes",
        "Partition actions to end co-ownership",
        "Title and zoning review before a purchase",
        "Representation in mandatory mediation",
      ],
    },
    steps: {
      tr: [
        { title: "Belge incelemesi", text: "Tapu kaydı, sözleşmeler, ihtarnameler ve yazışmalar incelenir." },
        { title: "Hukuki değerlendirme", text: "Talebin dayanağı, süreler, zamanaşımı ve olası masraflar açıkça anlatılır." },
        { title: "Arabuluculuk", text: "Kira ve ortaklığın giderilmesi gibi uyuşmazlıklarda dava öncesi zorunlu arabuluculuk süreci yürütülür." },
        { title: "Dava ve keşif", text: "Anlaşma sağlanamazsa dava açılır; keşif ve bilirkişi incelemesi süreçleri takip edilir." },
        { title: "Karar ve tescil", text: "Kararın kesinleşmesi ve tapuya tescili ya da tahliyenin icrası sağlanır." },
      ],
      en: [
        { title: "Document review", text: "We review the land registry record, contracts, formal notices and correspondence." },
        { title: "Legal assessment", text: "We explain the legal basis, deadlines, limitation periods and likely costs." },
        { title: "Mediation", text: "For disputes such as tenancy and partition, the mandatory pre-trial mediation is conducted." },
        { title: "Litigation and inspection", text: "If no agreement is reached, a case is filed and on-site inspection and expert stages are followed." },
        { title: "Judgment and registration", text: "We secure finalisation and registration of the judgment at the land registry, or enforcement of eviction." },
      ],
    },
    faqs: {
      tr: [
        { q: "Kira uyuşmazlıklarında doğrudan dava açılabilir mi?", a: "1 Eylül 2023’ten itibaren kira ilişkisinden doğan uyuşmazlıkların önemli bir kısmında dava açmadan önce arabulucuya başvurmak zorunludur. İcra yoluyla tahliye gibi bazı yollar bu kuralın dışındadır." },
        { q: "Ev sahibi kiracıyı hangi durumlarda tahliye edebilir?", a: "Türk Borçlar Kanunu’nda kiraya verenin konut veya işyeri ihtiyacı, yeni malikin ihtiyacı, iki haklı ihtar, yazılı tahliye taahhüdü ve on yıllık uzama süresinin dolması gibi belirli sebepler sayılmıştır. Her sebebin kendine özgü süreleri vardır." },
        { q: "Kat karşılığı inşaat sözleşmesi nasıl yapılmalı?", a: "Arsa payı karşılığı inşaat sözleşmesi taşınmaz satış vaadi içerdiğinden noterde düzenleme şeklinde yapılmalıdır. Teslim süresi, bağımsız bölüm paylaşımı, gecikme cezası ve teminatlar açıkça yazılmalıdır." },
        { q: "Paylı bir taşınmazdan nasıl ayrılabilirim?", a: "Paydaşlar anlaşamazsa sulh hukuk mahkemesinde ortaklığın giderilmesi davası açılabilir. Mahkeme mümkünse aynen taksime, değilse satış yoluyla paylaştırmaya karar verir. Bu davalarda da dava öncesi arabuluculuk zorunludur." },
      ],
      en: [
        { q: "Can I go straight to court in a tenancy dispute?", a: "Since 1 September 2023, mediation is mandatory before filing for most disputes arising from tenancy. Some routes, such as eviction through enforcement offices, fall outside this rule." },
        { q: "When can a landlord evict a tenant?", a: "The Turkish Code of Obligations lists specific grounds such as the landlord’s need for residential or business use, the needs of a new owner, two justified notices, a written undertaking to vacate and expiry of the ten-year extension period. Each ground has its own time limits." },
        { q: "How should a construction-for-land contract be made?", a: "Because it contains a promise to sell real property, it must be executed before a notary in official form. Delivery dates, allocation of units, delay penalties and guarantees should be stated clearly." },
        { q: "How can I leave a co-owned property?", a: "If the co-owners cannot agree, a partition action can be brought before the civil court of peace. The court orders division in kind where possible, otherwise a sale. Pre-trial mediation is mandatory for these cases too." },
      ],
    },
  },
  {
    id: "ceza",
    slug: { tr: "ceza-hukuku", en: "criminal-law" },
    name: { tr: "Ceza Hukuku", en: "Criminal Law" },
    short: {
      tr: "Soruşturma ve kovuşturma aşamalarında müdafilik ve katılan vekilliği.",
      en: "Defence and victim representation at investigation and trial stages.",
    },
    seoTitle: {
      tr: "İstanbul Ceza Avukatı — Müdafilik ve Katılan Vekilliği | Av. Aleyna Elif Karaoğlu",
      en: "Criminal Lawyer in Istanbul — Defence and Victim Representation | Aleyna Elif Karaoğlu",
    },
    seoDescription: {
      tr: "Soruşturma ve kovuşturma süreçleri, ifade ve sorguda avukat hakkı, müdafilik ve katılan vekilliği hakkında bilgi; İstanbul’da ceza hukuku desteği.",
      en: "Information on investigation and trial stages, the right to a lawyer during questioning, defence and victim representation in Istanbul.",
    },
    intro: {
      tr: [
        "Ceza yargılamasında ilk saatler ve ilk ifade, sürecin geri kalanını belirleyebilir. Bu nedenle haklarınızı bilmek ve bir avukatla birlikte hareket etmek önemlidir.",
        "Şüpheli veya sanık için müdafilik, suçtan zarar gören için şikâyet ve katılan vekilliği hizmeti verilir; soruşturmadan istinaf ve temyiz aşamasına kadar dosya takip edilir.",
      ],
      en: [
        "In criminal proceedings, the first hours and the first statement can shape the rest of the process. Knowing your rights and acting together with a lawyer is therefore important.",
        "Defence for suspects and defendants, and complaint and victim representation for those harmed by an offence, are provided from investigation through appeal.",
      ],
    },
    services: {
      tr: [
        "Kolluk ve savcılık ifadesinde müdafilik",
        "Tutuklama, adli kontrol ve itiraz süreçleri",
        "Kovuşturma aşamasında savunma",
        "Suçtan zarar görenler için şikâyet ve katılan vekilliği",
        "İstinaf ve temyiz başvuruları",
        "Uzlaştırma süreçlerinde temsil",
      ],
      en: [
        "Defence during police and prosecutor questioning",
        "Pre-trial detention, judicial control and objections",
        "Defence at trial",
        "Complaints and victim representation",
        "Appeals to the regional court and the Court of Cassation",
        "Representation in victim-offender reconciliation",
      ],
    },
    steps: {
      tr: [
        { title: "Acil görüşme", text: "Gözaltı, ifade çağrısı veya şikâyet söz konusuysa ilk olarak haklarınız ve atılacak adımlar konuşulur." },
        { title: "Dosya incelemesi", text: "Kısıtlama yoksa soruşturma dosyası incelenir, deliller ve tanıklar değerlendirilir." },
        { title: "Soruşturma", text: "İfade, delil toplama talebi ve tedbir kararlarına itiraz süreçleri yürütülür." },
        { title: "Kovuşturma", text: "İddianame kabul edilirse duruşmalarda savunma veya katılan vekilliği yapılır." },
        { title: "Kanun yolları", text: "Karara karşı istinaf ve temyiz başvuruları süresi içinde değerlendirilir." },
      ],
      en: [
        { title: "Urgent meeting", text: "If there is custody, a summons for questioning or a complaint, we first discuss your rights and the immediate steps." },
        { title: "File review", text: "Unless access is restricted, the investigation file is reviewed and the evidence and witnesses assessed." },
        { title: "Investigation", text: "Statements, requests for evidence and objections to protective measures are handled." },
        { title: "Trial", text: "If the indictment is accepted, defence or victim representation is provided at hearings." },
        { title: "Appeals", text: "Appeals against the judgment are assessed and filed within the time limits." },
      ],
    },
    faqs: {
      tr: [
        { q: "İfade verirken avukat talep edebilir miyim?", a: "Evet. Ceza Muhakemesi Kanunu’na göre şüpheli, ifadesinin alınmasında ve sorgusunda müdafi yardımından yararlanma hakkına sahiptir. Susma hakkınız da bulunmaktadır; bu haklar ifadeden önce size hatırlatılmalıdır." },
        { q: "Şikâyet için bir süre var mı?", a: "Soruşturulması şikâyete bağlı suçlarda, fiili ve faili öğrenmeden itibaren altı ay içinde şikâyette bulunulmalıdır. Kendiliğinden soruşturulan suçlarda bu süre yoktur; ancak dava zamanaşımı süreleri geçerlidir." },
        { q: "Katılan vekili ne yapar?", a: "Suçtan zarar gören kişi, kovuşturmaya katılan sıfatıyla dahil olabilir. Katılan vekili delil sunar, duruşmalarda soru sorar, karara karşı kanun yollarına başvurur ve zarar görenin haklarını takip eder." },
      ],
      en: [
        { q: "Can I ask for a lawyer when giving a statement?", a: "Yes. Under the Code of Criminal Procedure, a suspect has the right to the assistance of defence counsel during questioning. You also have the right to remain silent; these rights must be explained to you before questioning." },
        { q: "Is there a deadline for filing a complaint?", a: "For offences prosecuted only upon complaint, the complaint must be filed within six months of learning of the act and the perpetrator. There is no such deadline for offences prosecuted ex officio, though limitation periods apply." },
        { q: "What does a victim’s representative do?", a: "A person harmed by an offence may join the prosecution as an intervening party. Their lawyer submits evidence, questions witnesses at hearings, appeals the judgment and protects the victim’s rights." },
      ],
    },
  },
  {
    id: "is",
    slug: { tr: "is-hukuku", en: "employment-law" },
    name: { tr: "İş Hukuku", en: "Employment Law" },
    short: {
      tr: "Kıdem ve ihbar tazminatı, işe iade, arabuluculuk ve fazla mesai alacakları.",
      en: "Severance and notice pay, reinstatement, mediation and overtime claims.",
    },
    seoTitle: {
      tr: "İstanbul İş Hukuku Avukatı — Kıdem Tazminatı, İşe İade | Av. Aleyna Elif Karaoğlu",
      en: "Employment Lawyer in Istanbul — Severance Pay, Reinstatement | Aleyna Elif Karaoğlu",
    },
    seoDescription: {
      tr: "Kıdem ve ihbar tazminatı, işe iade davası, fazla mesai alacakları ve zorunlu arabuluculuk süreçleri hakkında bilgi ve hukuki destek.",
      en: "Information and legal support on severance and notice pay, reinstatement claims, overtime and mandatory mediation in Türkiye.",
    },
    intro: {
      tr: [
        "İş ilişkisinin sona ermesi, çoğu zaman kısa sürelerin ve doğru hesaplamanın önem kazandığı bir dönemdir. Fesih bildiriminin içeriği, hangi hakların doğacağını doğrudan etkiler.",
        "İşçi ve işverenlere fesih öncesi danışmanlık, zorunlu arabuluculuk görüşmelerinde temsil ve iş mahkemesindeki davalarda dava takibi hizmeti verilir.",
      ],
      en: [
        "The end of an employment relationship is a time when short deadlines and accurate calculations matter. The content of the termination notice directly affects which rights arise.",
        "Advice before termination, representation in mandatory mediation and litigation before the labour courts are provided to both employees and employers.",
      ],
    },
    services: {
      tr: [
        "Kıdem ve ihbar tazminatı talepleri",
        "İşe iade davaları",
        "Fazla mesai, hafta tatili, genel tatil ve yıllık izin alacakları",
        "Zorunlu arabuluculuk görüşmelerinde temsil",
        "İş sözleşmesi ve fesih bildirimlerinin hazırlanması veya incelenmesi",
        "Mobbing ve eşit davranma borcuna aykırılık talepleri",
      ],
      en: [
        "Severance and notice pay claims",
        "Reinstatement claims",
        "Overtime, weekly rest, public holiday and annual leave claims",
        "Representation in mandatory mediation",
        "Drafting or reviewing employment contracts and termination notices",
        "Workplace harassment and equal treatment claims",
      ],
    },
    steps: {
      tr: [
        { title: "Belge ve hesap", text: "İş sözleşmesi, bordrolar, SGK kayıtları ve fesih bildirimi incelenir; alacaklar kalem kalem hesaplanır." },
        { title: "Süre kontrolü", text: "İşe iade için bir aylık arabuluculuk süresi ve alacaklar için zamanaşımı süreleri belirlenir." },
        { title: "Arabuluculuk", text: "Dava öncesi zorunlu arabuluculuk görüşmelerine katılınır; uzlaşma şartları değerlendirilir." },
        { title: "Dava", text: "Anlaşma sağlanamazsa iş mahkemesinde dava açılır; tanık ve bilirkişi süreçleri takip edilir." },
        { title: "Tahsil", text: "Karar veya arabuluculuk anlaşması sonrasında ödeme ve gerekirse icra süreci izlenir." },
      ],
      en: [
        { title: "Documents and calculation", text: "We review the contract, payslips, social security records and the termination notice, and calculate each claim." },
        { title: "Deadline check", text: "We establish the one-month mediation deadline for reinstatement and limitation periods for other claims." },
        { title: "Mediation", text: "We attend the mandatory pre-trial mediation and assess settlement terms." },
        { title: "Litigation", text: "If no agreement is reached, a case is filed at the labour court; witness and expert stages are followed." },
        { title: "Collection", text: "After the judgment or settlement, payment and, if needed, enforcement are followed." },
      ],
    },
    faqs: {
      tr: [
        { q: "Kıdem tazminatına hak kazanmak için ne kadar çalışmak gerekir?", a: "Aynı işverene bağlı olarak en az bir yıl çalışmış olmak ve iş sözleşmesinin kanunda sayılan hallerden biriyle sona ermiş olması gerekir. Örneğin işverenin haklı neden olmadan feshi veya işçinin haklı nedenle feshi bu hallerdendir." },
        { q: "İşe iade için ne kadar sürem var?", a: "Fesih bildiriminin tebliğinden itibaren bir ay içinde arabulucuya başvurulmalıdır. Arabuluculukta anlaşma sağlanamazsa, son tutanaktan itibaren iki hafta içinde iş mahkemesinde dava açılabilir." },
        { q: "Arabuluculuk zorunlu mu?", a: "Kanuna, bireysel veya toplu iş sözleşmesine dayanan işçi ve işveren alacağı ve tazminatı ile işe iade taleplerinde dava açmadan önce arabulucuya başvurmak zorunludur. İş kazası ve meslek hastalığından doğan tazminat talepleri bu zorunluluğun dışındadır." },
        { q: "Kıdem tazminatı zamanaşımı ne kadardır?", a: "Kıdem tazminatı, ihbar tazminatı, yıllık izin ücreti ve kötü niyet tazminatı gibi alacaklarda zamanaşımı süresi, iş sözleşmesinin sona erdiği tarihten itibaren beş yıldır." },
      ],
      en: [
        { q: "How long must I work to be entitled to severance pay?", a: "You must have worked for the same employer for at least one year, and the contract must have ended in one of the ways set out in the law, for example termination by the employer without just cause or termination by the employee for just cause." },
        { q: "How long do I have to seek reinstatement?", a: "You must apply to a mediator within one month of receiving the termination notice. If mediation fails, a case can be filed at the labour court within two weeks of the final report." },
        { q: "Is mediation mandatory?", a: "Yes, for employee and employer claims based on law or individual or collective agreements, and for reinstatement claims. Compensation claims arising from occupational accidents and diseases are outside this requirement." },
        { q: "What is the limitation period for severance pay?", a: "For severance pay, notice pay, annual leave pay and bad-faith compensation, the limitation period is five years from the end of the employment contract." },
      ],
    },
  },
  {
    id: "tazminat",
    slug: { tr: "tazminat-hukuku", en: "compensation-law" },
    name: { tr: "Tazminat Hukuku", en: "Compensation Law" },
    short: {
      tr: "Trafik ve iş kazaları, maddi ve manevi tazminat, sigorta uyuşmazlıkları.",
      en: "Traffic and workplace accidents, pecuniary and non-pecuniary damages, insurance disputes.",
    },
    seoTitle: {
      tr: "İstanbul Tazminat Avukatı — Trafik ve İş Kazası | Av. Aleyna Elif Karaoğlu",
      en: "Personal Injury and Compensation Lawyer in Istanbul | Aleyna Elif Karaoğlu",
    },
    seoDescription: {
      tr: "Trafik kazası, iş kazası, maddi ve manevi tazminat ile sigorta şirketlerine başvuru ve dava süreçleri hakkında bilgi ve hukuki destek.",
      en: "Information and legal support on traffic and workplace accident claims, pecuniary and non-pecuniary damages, and claims against insurers.",
    },
    intro: {
      tr: [
        "Bir kaza veya haksız fiil sonrasında tedavi, iş göremezlik ve gelir kaybı gibi sonuçlar uzun süre devam edebilir. Zararın doğru belgelenmesi, talebin kapsamını belirleyen en önemli adımdır.",
        "Trafik ve iş kazalarından doğan maddi ve manevi tazminat taleplerinde, sigorta şirketlerine başvuruda ve tazminat davalarında danışmanlık ve temsil hizmeti verilir.",
      ],
      en: [
        "After an accident or wrongful act, consequences such as treatment, incapacity and loss of income may last a long time. Documenting the loss properly is the most important step in defining the claim.",
        "Advice and representation are provided for pecuniary and non-pecuniary damages arising from traffic and workplace accidents, applications to insurers and compensation proceedings.",
      ],
    },
    services: {
      tr: [
        "Trafik kazalarından doğan maddi ve manevi tazminat talepleri",
        "Zorunlu trafik sigortası ve kasko şirketlerine başvuru",
        "Sigorta Tahkim Komisyonu başvuruları",
        "İş kazası ve meslek hastalığı tazminat davaları",
        "Destekten yoksun kalma tazminatı",
        "Değer kaybı ve araç hasarı talepleri",
      ],
      en: [
        "Pecuniary and non-pecuniary damages from traffic accidents",
        "Applications to compulsory traffic and comprehensive motor insurers",
        "Applications to the Insurance Arbitration Commission",
        "Workplace accident and occupational disease claims",
        "Loss of support (dependency) claims",
        "Depreciation and vehicle damage claims",
      ],
    },
    steps: {
      tr: [
        { title: "Olay ve zarar tespiti", text: "Kaza tespit tutanağı, sağlık raporları, gelir belgeleri ve sigorta poliçeleri toplanır." },
        { title: "Sigortaya başvuru", text: "Dava öncesinde zorunlu olan yazılı başvuru sigorta şirketine yapılır ve yanıt beklenir." },
        { title: "Hesaplama", text: "Malullük oranı ve kazanç kaybı üzerinden aktüerya hesabı yaptırılır." },
        { title: "Tahkim veya dava", text: "Uygun görülen yolda Sigorta Tahkim Komisyonu’na başvurulur ya da dava açılır." },
        { title: "Tahsil", text: "Karar sonrasında tazminatın faiziyle birlikte tahsili sağlanır." },
      ],
      en: [
        { title: "Facts and loss", text: "We gather the accident report, medical reports, income documents and insurance policies." },
        { title: "Application to the insurer", text: "The written application required before litigation is made to the insurer and its response awaited." },
        { title: "Calculation", text: "An actuarial calculation is obtained based on the disability rate and loss of earnings." },
        { title: "Arbitration or court", text: "The claim is filed with the Insurance Arbitration Commission or the court, as appropriate." },
        { title: "Collection", text: "After the decision, the compensation is collected together with interest." },
      ],
    },
    faqs: {
      tr: [
        { q: "Trafik kazasında doğrudan dava açabilir miyim?", a: "Karayolları Trafik Kanunu’na göre zorunlu mali sorumluluk sigortacısına karşı dava açmadan veya tahkime gitmeden önce sigorta şirketine yazılı başvuru yapılması gerekir. Şirket on beş gün içinde yanıt vermez veya talebi kısmen ya da tamamen reddederse dava veya tahkim yoluna gidilebilir." },
        { q: "Tazminat talebi için ne kadar sürem var?", a: "Haksız fiilden doğan tazminat taleplerinde zarar ve tazminat yükümlüsünün öğrenilmesinden itibaren iki yıl, her hâlde fiilden itibaren on yıllık zamanaşımı uygulanır. Fiil aynı zamanda daha uzun zamanaşımına bağlı bir suç oluşturuyorsa ceza zamanaşımı süresi uygulanır." },
        { q: "İş kazasında hangi tazminatlar istenebilir?", a: "İş göremezlik nedeniyle maddi tazminat, manevi tazminat ve kazada hayatını kaybeden işçinin yakınları için destekten yoksun kalma tazminatı talep edilebilir. SGK tarafından yapılan ödemeler hesaplamada dikkate alınır." },
      ],
      en: [
        { q: "Can I sue directly after a traffic accident?", a: "Under the Highway Traffic Law, a written application must be made to the compulsory liability insurer before suing or going to arbitration. If the insurer does not respond within fifteen days or rejects the claim in whole or in part, court or arbitration proceedings may follow." },
        { q: "How long do I have to bring a claim?", a: "For tort claims, the limitation period is two years from learning of the damage and the liable person, and in any case ten years from the act. If the act is also a crime with a longer limitation period, that period applies." },
        { q: "What can be claimed after a workplace accident?", a: "Pecuniary damages for incapacity, non-pecuniary damages and, where the worker has died, loss of support for dependants. Payments made by the Social Security Institution are taken into account." },
      ],
    },
  },
];

export const getArea = (locale: Locale, slug: string) => areas.find((a) => a.slug[locale] === slug);
export const getAreaById = (id: string) => areas.find((a) => a.id === id);

export const generalFaqs: Record<Locale, Faq[]> = {
  tr: [
    { q: "İlk görüşme nasıl planlanır?", a: "İletişim formunu doldurabilir, telefonla arayabilir veya WhatsApp üzerinden yazabilirsiniz. Konunuzu kısaca öğrendikten sonra yüz yüze ya da çevrim içi bir görüşme zamanı planlanır." },
    { q: "Görüşmeye hangi belgelerle gelmeliyim?", a: "Kimlik belgenizle birlikte konunuzla ilgili sözleşme, tebligat, mahkeme veya idari karar, yazışma ve tutanakları getirmeniz değerlendirmeyi kolaylaştırır. Hangi belgelerin gerektiği görüşme öncesinde ayrıca bildirilir." },
    { q: "Avukatlık ücreti nasıl belirlenir?", a: "Ücret; işin niteliği, kapsamı ve gerektirdiği emek dikkate alınarak, Avukatlık Asgari Ücret Tarifesi’nin altında kalmamak üzere yazılı bir ücret sözleşmesiyle belirlenir. Ücret bilgisi, dosyanız değerlendirildikten sonra size ayrıca verilir." },
    { q: "Görüşmeler İngilizce yapılabilir mi?", a: "Evet. Görüşmeler Türkçe ve İngilizce yapılabilir; yabancılar hukukuna ilişkin dosyalarda yazışmalar da İngilizce yürütülebilir." },
    { q: "Paylaştığım bilgiler gizli kalır mı?", a: "Avukat, mesleği dolayısıyla öğrendiği bilgileri saklamakla yükümlüdür. Form aracılığıyla ilettiğiniz kişisel veriler yalnızca talebinize dönüş yapmak amacıyla ve KVKK Aydınlatma Metni’nde açıklanan şekilde işlenir." },
  ],
  en: [
    { q: "How do I arrange a first meeting?", a: "You can fill in the contact form, call, or write on WhatsApp. After a brief description of your matter, an in-person or online meeting is scheduled." },
    { q: "What documents should I bring?", a: "Your ID together with any contracts, notices, court or administrative decisions, correspondence and reports relating to your matter. You will be told in advance which documents are needed." },
    { q: "How are legal fees determined?", a: "Fees are agreed in a written fee agreement, taking into account the nature, scope and work involved, and may not be lower than the official minimum fee schedule. Fee information is provided once your matter has been assessed." },
    { q: "Can meetings be held in English?", a: "Yes. Meetings are held in English and Turkish, and correspondence on immigration matters can be conducted in English." },
    { q: "Will my information be kept confidential?", a: "Lawyers are bound by professional confidentiality. Personal data you send through the form is processed only to respond to your request, as described in the Privacy Notice." },
  ],
};
