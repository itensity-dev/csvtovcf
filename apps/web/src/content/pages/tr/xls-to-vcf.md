---
url: xls-vcf-donusturme
title: "XLS Dosyasını VCF'ye Dönüştürme: Eski Excel Kişi Listeleri Rehbere"
h1: "XLS'den VCF'ye dönüştürme"
description: "Excel 97–2003, eski CRM ve telefon programlarından kalma .xls kişi listelerini VCF dosyasına dönüştürün. Eski kod sayfaları çözülür, Türkçe harfler korunur. Yükleme yok."
lead: "Eski ikili Excel biçimini (.xls) okur (Excel 95'ten, muhasebe programlarından ve telefon eşitleme yazılımlarından gelen dosyalar dahil) ve bugünkü telefonların içe aktardığı bir .vcf yazar."
nav: "XLS'den VCF'ye"
summary: "Eski .xls kişi dosyalarından (Excel 97–2003 ve öncesi) vCard."
steps:
  - ".xls dosyasını yukarıya bırakın. Biçim dosyanın kendisinden algılanır; uzantısı yanlış olan bir çalışma kitabı da açılır."
  - "Birden çok sayfa varsa sayfayı seçin ve önizlemeyi kontrol edin: Türkçe, Kiril, Yunan veya Orta Avrupa harfleriyle yazılmış isimler doğru okunmalıdır."
  - "Sütun eşleştirmelerini kontrol edin ve ülke kodu olmayan numaralar için ülkeyi seçin."
  - ".vcf dosyasını indirin. vCard 2.1'i yalnızca dosya eski bir telefona gidecekse seçin; bugünkü telefonlar 3.0 ister."
features:
  - feature: "Biçimler"
    value: "BIFF8 (Excel 97–2003 .xls), BIFF5 (Excel 95), BIFF2–4 ve Excel 2003 XML; ayrıca .xlsx ve .ods."
  - feature: "Eski kod sayfaları"
    value: "Unicode öncesi .xls dosyalarındaki metin (Windows-1250/1251/1252/1253/1254, Shift_JIS, Big5…) dosyada kayıtlı kod sayfasıyla çözülür."
  - feature: "Sayılar ve tarihler"
    value: "Telefon numaraları eksiksiz okunur; tarih hücreleri, eski Mac çalışma kitaplarının 1904 tarih sistemi dahil, doğum gününe dönüşür."
  - feature: "Çıktı"
    value: "vCard 3.0 (varsayılan), 4.0 veya 2.1; tek dosya ya da kişi başına bir dosya; Google CSV; Outlook CSV."
  - feature: "Desteklenmeyenler"
    value: "Şifreli .xls dosyaları (açma parolası olanlar), Lotus 1-2-3 ve Quattro dosyaları."
faq:
  - q: "XLS ile XLSX arasındaki fark nedir?"
    a: ".xls, Excel'in 2003'e kadar kullandığı ikili biçimdir; .xlsx ise Excel 2007'den beri kullanılan, sıkıştırılmış XML biçimidir. Burada ikisi de aynı şekilde okunur. Eski programlar ve bazı telefon eşitleme araçları hâlâ .xls dışa aktarır."
  - q: "Eski dosyamdaki isimler `Ayþe Yýlmaz` ya da soru işaretleriyle görünüyor. Ne yapmalıyım?"
    a: "Bu dönüştürücüde böyle olmamalı: .xls dosyaları kod sayfalarını içinde saklar ve okurken bu kod sayfası uygulanır. Harfler yine de yanlışsa metin büyük olasılıkla Excel'e yazılırken zaten bozuktu. Dosyayı Excel'de açıp hücrelere bakın."
  - q: "Binlerce kişi içeren bir .xls dosyasını dönüştürebilir miyim?"
    a: "Evet. Satır sınırı yok; 100.000 satır birkaç saniyede dönüştürülür. Google Kişiler için sonucu en fazla 3.000 kişilik dosyalara bölün."
  - q: "Eski bir telefona hangi vCard sürümü uyar?"
    a: "vCard 2.1. ASCII dışı metni `CHARSET=UTF-8` ile Quoted-Printable olarak yazar; 2000'li yılların telefonları bunu anlar. Akıllı telefonlar için 3.0 seçin."
related: [excel-to-vcf, xlsx-to-vcf, home, garbled-contacts, what-is-vcf, import-android]
updated: 2026-11-04
---

**XLS**, Excel'in 2007'den önce kullandığı dosya biçimidir. Eski CRM'lerden, muhasebe yazılımlarından, santral sistemlerinden ve telefon eşitleme programlarından alınan kişi listelerinde hâlâ sık görülür. Telefonlar bu biçimi okuyamaz, Google Kişiler de yalnızca CSV veya vCard içe aktarır. Dönüştürücü .xls dosyasını kendisi okur; bilgisayarınızda Excel kurulu olması gerekmez.

**Kod sayfaları.** Excel 97–2003 metni Unicode olarak saklar. Excel 95 dosyaları ve bazı programların ürettiği dosyalar ise metni, dosyayı yazan bilgisayarın kod sayfasında saklar: Türkçe için Windows-1254, Rusça için 1251, Lehçe veya Çekçe için 1250. Dönüştürücü dosyaya kaydedilmiş kod sayfasını uygular; böylece `Çağrı Öztürk` yine `Çağrı Öztürk` olarak kalır. .vcf her zaman UTF-8 ile yazılır.

**Satırlardan kartlara.** Başlık satırı otomatik bulunur. Sütunlar birçok dilde adlarına göre eşleştirilir: “Cep Telefonu”, “Teléfono”, “Handy” ve “Телефон” hepsi telefon numarası olur. Her satır, zorunlu `N` ve `FN` alanlarıyla bir kart olur. İsim, telefon, e-posta, şirket veya adres içermeyen satırlar atlanır ve satır numaralarıyla listelenir.

**Hangi sürümü indirmeli?** vCard 3.0 iPhone, Android, Google Kişiler ve Outlook'ta içe aktarılır. vCard 2.1, bu tür .xls dosyalarının çoğu zaman geldiği telefonlar için var: tuşlu telefonlar ve ilk Nokia ya da Sony Ericsson modelleri. [Sürümler arasındaki farklar](/tr/vcf-dosyasi-nedir/).
