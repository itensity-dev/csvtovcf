---
url: ''
title: "CSV'yi VCF'ye Dönüştürme: Ücretsiz Rehber Dosyası, Yüklemeden"
h1: "CSV'den VCF'ye dönüştürme"
description: "CSV veya Excel kişi listesini iPhone, Android, Google Kişiler ve Outlook için VCF rehber dosyasına (vCard 3.0, 4.0, 2.1) dönüştürün. Tarayıcıda çalışır, yükleme yok."
lead: "Kişi tablosunu iPhone, Android, Google Kişiler ve Outlook'un içe aktardığı tek bir .vcf dosyasına çevirir: sütunlar eşleştirilir, telefon numaraları düzeltilir, yinelenen kişiler bulunur. Dosya bu cihazda okunur, hiçbir yere yüklenmez."
nav: "CSV'den VCF'ye"
summary: "Her türlü kişi tablosundan .vcf dosyası; sütun eşleştirme ve numara düzeltme dahil."
steps:
  - "CSV, Excel veya ODS dosyanızı yukarıdaki alana bırakın ya da Google E-Tablolar'dan hücreleri yapıştırın. Kodlama ve ayırıcı otomatik algılanır; önizlemede harfler yerine `Ayþe` ya da `Ã§` gibi simgeler görürseniz başka bir kodlama seçin."
  - "Sütun eşleştirmelerini kontrol edin. Her sütun bir vCard alanına bağlanır; **tahmin** olarak işaretlenenlere bir göz atın. “Atla” olarak ayarlanan sütunlar dosyaya yazılmaz."
  - "Ülke kodu olmadan yazılmış numaralar için ülkeyi seçin. Numaralar `+905321234567` biçiminde kaydedilir; böylece her ülkeden doğru aranır, WhatsApp gibi mesajlaşma uygulamaları da kişiyi tanır."
  - ".vcf dosyasını indirin (cihaz başka bir sürüm istemedikçe vCard 3.0) ve içe aktarın: [iPhone](/tr/iphone-vcf-rehber-aktarma/), [Android](/tr/android-vcf-rehber-aktarma/), [Google Kişiler](/tr/google-kisiler-vcf-ice-aktarma/), [Outlook](/tr/outlook-kisileri-ice-aktarma/)."
features:
  - feature: "Girdi"
    value: "Her ayırıcıyla CSV, TSV ve TXT (virgül, noktalı virgül, sekme, dikey çizgi, Excel'in `sep=` satırı); sayfa seçimiyle XLSX, XLS, ODS; Google E-Tablolar veya Excel'den yapıştırılan hücreler. Aynı anda birden çok dosya."
  - feature: "Kodlamalar"
    value: "BOM'lu veya BOM'suz UTF-8, UTF-16, Windows-1250'den 1258'e (Türkçe için Windows-1254 dahil), KOI8-R, ISO-8859, Mac Roman, Shift_JIS, GB18030, Big5, EUC-KR. Otomatik algılanır; canlı önizlemeyle değiştirilebilir."
  - feature: "Tanınan dışa aktarımlar"
    value: "Google Kişiler CSV (güncel ve eski düzen); İngilizce, Almanca, Fransızca, Rusça, İspanyolca, Portekizce veya Türkçe başlıklı Outlook CSV; LinkedIn Connections.csv; başlık satırı olan ya da olmayan basit “isim + telefon” listeleri."
  - feature: "Telefon numaraları"
    value: "libphonenumber kurallarıyla uluslararası biçime çevrilir; cep numaraları cep olarak işaretlenir. Geçersiz numaralar silinmez, işaretlenir. Excel'in `9,05321E+11` gösterimi ve “+” olmadan kaydedilmiş numaralar tanınır."
  - feature: "İsimler"
    value: "Tek hücredeki tam ad; ad, ikinci ad ve soyada ayrılır. “Soyadı, Ad” sırası, Rusça baba adları, İspanyolca çift soyadları ve *van*, *da* gibi ekler de buna dahildir."
  - feature: "Yinelenenler"
    value: "Telefon numarasına ve e-postaya göre bulunur. Birleştirmek isteğe bağlıdır; grupları indirmeden önce görürsünüz."
  - feature: "Çıktı"
    value: "vCard 3.0 (varsayılan), 4.0 veya 2.1; tek .vcf ya da her kişi için ayrı dosya içeren bir ZIP; Google Kişiler CSV; Outlook CSV."
  - feature: "Boyut"
    value: "100.000 satırla test edildi: dizüstü bilgisayarda birkaç saniye. Satır sınırı yok; sınır, cihazınızın belleğidir."
  - feature: "Gizlilik"
    value: "Yükleme yok, hesap yok, dosya içeriği izlenmez. İlk ziyaretten sonra çevrimdışı da çalışır."
  - feature: "Desteklenmeyenler"
    value: "Kişi fotoğrafları (tablolarda fotoğraf olmaz), Apple Numbers dosyaları (önce CSV olarak dışa aktarın), parola korumalı Excel dosyaları."
faq:
  - q: "Kişi listem bir yere yükleniyor mu?"
    a: "Hayır. Dosyayı tarayıcınız okur, dönüştürmeyi cihazınızdaki bir Web Worker yapar. Kontrol etmek için geliştirici araçlarını açın (F12), Ağ (Network) sekmesine geçin ve bir dosya dönüştürün: verilerinizi taşıyan hiçbir istek yoktur. İlk ziyaretten sonra dönüştürücü internet bağlantısı olmadan da çalışır."
  - q: "Hangi vCard sürümünü seçmeliyim?"
    a: "vCard 3.0. iPhone, Android, Google Kişiler ve Outlook'un hepsi bunu içe aktarır. 4.0'ı yalnızca bir uygulama isterse seçin; 2.1 ise 3.0 ile harfleri bozuk gösteren eski telefonlar (tuşlu telefonlar, eski Nokia ya da Sony Ericsson modelleri) içindir."
  - q: "Telefon numaralarım neden 9,05321E+11 gibi görünüyor?"
    a: "Excel uzun sayıyı bilimsel gösterimle göstermiş ve CSV de bu şekilde kaydedilmiş; asıl rakamlar artık dosyada yok. Excel'de telefon sütununu Metin olarak biçimlendirip yeniden dışa aktarın ya da doğrudan .xlsx dosyasını bırakın; tam numara orada hâlâ saklıdır. [Bunun nedeni](/tr/excel-telefon-numarasi-e11/)."
  - q: "Türkçe karakterler (ğ, ş, ı, İ), Kiril veya Arap harfleri korunur mu?"
    a: "Evet, kodlama doğru okunursa. Dönüştürücü kodlamayı algılar ve ilk satırları gösterir; `Ayþe`, `AyÅŸe`, `Ð¸` ya da soru işaretleri görürseniz listeden başka bir kodlama seçin. .vcf dosyası her zaman, bugünkü tüm telefonların okuduğu UTF-8 ile yazılır."
  - q: "Tüm kişileri iPhone'a tek seferde ekleyebilir miyim?"
    a: "Evet. Tek .vcf dosyasını AirDrop, Mail veya Dosyalar ile iPhone'a gönderin, açın ve “Tüm Kişileri Ekle”ye dokunun. [Adım adım kılavuz](/tr/iphone-vcf-rehber-aktarma/)."
  - q: "Kaç kişi dönüştürebilirim?"
    a: "Dönüştürücünün bir sınırı yok. Google Kişiler, içe aktarılan dosya başına en fazla 3.000, hesap başına 25.000 kişi kabul eder; daha büyük listeleri birkaç dosyaya bölün."
  - q: "Gerçekten ücretsiz mi?"
    a: "Evet: hesap yok, filigran yok, satır sınırı yok. Dönüştürme motoru MIT lisansıyla açık kaynaktır."
related: [excel-to-vcf, google-contacts-csv-to-vcf, outlook-csv-to-vcf, import-iphone, import-android, garbled-contacts]
updated: 2026-11-04
---

**VCF** (vCard), kişi kartları için standart dosyadır: her telefon ve e-posta uygulaması onu içe aktarabilir. CSV ise yalnızca bir tablodur ve telefonlar tablo içe aktarmaz. Dönüştürücü her satırı bir karta çevirir:

```text
BEGIN:VCARD
VERSION:3.0
N:Yılmaz;Ayşe;;;
FN:Ayşe Yılmaz
TEL;TYPE=CELL:+905321234567
EMAIL;TYPE=INTERNET:ayse@example.com.tr
ORG:Yılmaz Tekstil
BDAY:1990-05-17
END:VCARD
```

**Varsayılan neden vCard 3.0?** 3.0 sürümü ([RFC 2426](https://www.rfc-editor.org/rfc/rfc2426)), iPhone, Android ve Google Kişiler'in dışa aktarırken kendilerinin kullandığı biçimdir; bu yüzden her yerde sorunsuz içe aktarılır. 4.0 sürümü ([RFC 6350](https://www.rfc-editor.org/rfc/rfc6350)) daha yenidir, ama bir telefon rehberine yeni bir şey katmaz. 2.1 sürümü eski telefonlar içindir: ASCII dışındaki harfler (Türkçe ğ, ş, ı dahil) `CHARSET=UTF-8` ile Quoted-Printable olarak yazılır; bu telefonların anladığı tek biçim budur.

**Dosyada neler var?** Her kartta iki zorunlu alan bulunur: `N` (isim parçaları) ve `FN` (görünen ad). Bir satırda isim yoksa şirket adı, o da yoksa e-posta, o da yoksa numara kullanılır. Özel karakterler kaçış karakteriyle yazılır; uzun satırlar bir harfi ortadan bölmeden 75 baytta katlanır. Böylece Türkçe, Kiril, Arapça, Çince harfler ve emojiler sağlam ulaşır. Satır sonları, standardın istediği gibi CRLF'dir.

**Telefon türleri.** “Cep Telefonu”, “Cep”, “GSM”, “Mobile” veya “Handy” adlı bir sütun `TYPE=CELL` olur. Genel bir “Telefon” sütununda numaralandırma planı karar verir: `0532 123 45 67` gibi cep numaraları cep olarak yazılır, `0212 555 01 23` gibi sabit hatlar “telefon” olarak kalır.

**WhatsApp için.** WhatsApp ve diğer mesajlaşma uygulamaları rehberdeki numaraları uluslararası biçimde arar. Bu yüzden dönüştürücü numaraları varsayılan olarak `+90` gibi ülke koduyla yazar. Ayrıntılar: [rehbere toplu kişi ekleme](/tr/rehbere-toplu-kisi-ekleme/).

**Geri kalanına ne olur?** İhtiyacınız olmayan sütunları *atla* olarak ayarlayabilirsiniz. Dönüştürücünün okuyamadığı tarihler silinmez, nota yazılır. Atlanan her satır, Excel'de gördüğünüz satır numarası ve atlanma nedeniyle listelenir.

Devamı: [VCF dosyası nedir, sürümler nasıl farklıdır](/tr/vcf-dosyasi-nedir/), [içe aktarılan isimler neden bozuk karakterlere dönüşür](/tr/rehber-turkce-karakter-sorunu/).
