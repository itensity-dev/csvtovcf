---
url: excel-vcf-rehber
title: "Excel Listesini Telefon Rehberine (VCF) Dönüştürme, WhatsApp Uyumlu"
h1: "Excel'den telefon rehberine (VCF)"
description: "Excel kişi listesini (.xlsx veya .xls) iPhone, Android ve Google için VCF rehber dosyasına dönüştürün. Dosya doğrudan okunur, uzun numaralar kaybolmaz. Yükleme yok."
lead: "Excel çalışma kitabınızı doğrudan açar (“CSV olarak kaydet” adımına gerek yok) ve her satırı tek bir .vcf dosyasında bir kişi kartına çevirir. Sayı olarak saklanmış telefon numaralarına ülke kodu geri eklenir; dosya bu cihazdan çıkmaz."
nav: "Excel'den VCF'ye"
summary: "XLSX veya XLS çalışma kitabından doğrudan vCard, sayfa seçimi dahil."
steps:
  - "Excel dosyasını (.xlsx, .xls veya .ods) yukarıya bırakın. Çalışma kitabında birden çok sayfa varsa kişilerin bulunduğu sayfayı seçin; gizli sayfalar işaretlidir."
  - "Başlık satırının bulunduğunu ve sütunların doğru alanlara bağlandığını kontrol edin. “Ad Soyad”, “Cep Telefonu”, “E-posta”, “Şirket” gibi başlıklar birçok dilde tanınır."
  - "Numaraların ait olduğu ülkeyi seçin, ör. Türkiye. Excel, sayı olarak saklanan numaraların baştaki 0'ını ve “+” işaretini siler; seçilen ülke bunları geri eklemek için kullanılır."
  - ".vcf dosyasını indirip telefona aktarın: [iPhone](/tr/iphone-vcf-rehber-aktarma/), [Android](/tr/android-vcf-rehber-aktarma/)."
features:
  - feature: "Excel dosyaları"
    value: ".xlsx ve .xlsm (Excel 2007 ve sonrası), .xls (Excel 97–2003 ve daha eskisi, Excel 95 kod sayfaları dahil), .ods. Her sayfa seçilebilir; gizli sayfalar listelenir."
  - feature: "Hücre değerleri"
    value: "Numaralar eksiksiz okunur (`905321234567`, asla `9,05321E+11` değil). Tarih hücreleri doğum gününe dönüşür. Formüllerin son hesaplanan değeri okunur."
  - feature: "Başlık satırı"
    value: "Üstünde başlık satırları olsa bile otomatik bulunur. Sayfanız doğrudan verilerle başlıyorsa “İlk satır başlık” işaretini kaldırın."
  - feature: "Numara düzeltme"
    value: "“+” veya baştaki 0 olmadan yazılmış numaralar seçilen ülkeye göre tamamlanır ve `+90 532 123 45 67` gibi uluslararası biçimde yazılır. Geçersiz numaralar silinmez, işaretlenir."
  - feature: "Çıktı"
    value: "Tek .vcf (vCard 3.0, 4.0 veya 2.1), her kişi için ayrı kart içeren bir ZIP ya da Google / Outlook CSV."
  - feature: "Desteklenmeyenler"
    value: "Parola korumalı çalışma kitapları (önce Excel'de parolayı kaldırın), Apple Numbers dosyaları, hücrelere gömülü kişi fotoğrafları."
faq:
  - q: "Excel dosyasını önce CSV olarak kaydetmem gerekir mi?"
    a: "Hayır, kaydetmemek daha iyi. Excel CSV kaydederken sayıları ekranda göründükleri gibi yazar; `9,05321E+11` olarak görünen bir numara son rakamları eksik kaydedilir. .xlsx dosyasını doğrudan okumak her rakamı korur."
  - q: "Numaralarımın başında sıfır ya da artı yok. Yine de çalışır mı?"
    a: "Evet. Seçeneklerde “+ olmayan numaralar için ülke” alanında ülkeyi seçin; Türkiye seçiliyken `5321234567` gibi bir numara `+905321234567` olur. “+” olmadan ülke koduyla başlayan numaralar (`905321234567`) da tanınır."
  - q: "Sayfamın ilk satırlarında bir başlık ve boş bir satır var. Sorun olur mu?"
    a: "Hayır. Asıl başlık satırının üstündeki satırlar atlanır ve rapordaki satır numaraları Excel'in solda gösterdiği numaralarla aynıdır."
  - q: "Birden çok sayfayı veya çalışma kitabını aynı anda dönüştürebilir miyim?"
    a: "Birkaç dosyayı birlikte bırakın, tek bir sonuçta birleştirilirler. Aynı çalışma kitabında ise bir sayfayı dönüştürün, sonra sayfayı değiştirip yeniden indirin."
  - q: "Mac'teki Excel veya LibreOffice ile çalışır mı?"
    a: "Evet. Dönüştürücü programı değil dosyayı okur: Mac için Excel'den, web'deki Excel'den veya Google E-Tablolar'dan indirilen .xlsx dosyaları ve LibreOffice'in .ods dosyaları sorunsuz açılır."
related: [xlsx-to-vcf, xls-to-vcf, google-sheets-to-vcf, home, excel-phone-e11, import-android]
updated: 2026-11-04
---

Excel dosyaları bir kişi biçimi değildir, bu yüzden telefonlar onları içe aktaramaz. **VCF** (vCard) dosyası ise her yerde, kişi başına bir kartla içe aktarılır. Dönüştürücü sayfadaki hücreleri okur, sütunları vCard alanlarıyla eşleştirir ve her satır için bir kart yazar.

**Çalışma kitabını okumak neden CSV okumaktan iyidir?** Bir .xlsx dosyasının içinde telefon numarası, hücre `9,05321E+11` gösterse bile tam sayı olarak (en fazla 15 basamak) saklanır. Excel ancak *CSV kaydederken* ekranda görüneni yazar ve gizli rakamlar kaybolur. Bu sayfanın .xlsx ve .xls dosyalarını doğrudan açmasının nedeni budur. Ayrıntılar: [Excel telefon numaralarını neden 9,05E+11 yapar](/tr/excel-telefon-numarasi-e11/).

**Excel telefon numaralarına ne yapar?** Genel biçimli bir hücreye yazılan numara baştaki sıfırını (`05321234567` → `5321234567`) ve artı işaretini (`+905321234567` → `905321234567`) kaybeder. Dönüştürücü körü körüne tahmin etmez. Her numarayı seçtiğiniz ülkenin numaralandırma kurallarıyla ayrıştırır ve sonucun o ülke için gerçek bir numara olup olmadığını kontrol eder. Numara o ülkenin kodu ile başlıyorsa uluslararası numara olarak ele alınır. Rapor bu şekilde tamamlanan numaraları sayar; kartlar sonucu indirmeden önce gösterir.

**WhatsApp uyumu.** WhatsApp kişileri rehberdeki numaranın uluslararası biçimine göre bulur. `+90 532 123 45 67` her durumda eşleşir; `0532 123 45 67` ise yalnızca telefonun kendi ülkesi Türkiye olduğunda eşleşir. Dönüştürücü numaraları varsayılan olarak `+90…` biçiminde yazar.

**Tarihler.** Tarih biçimli doğum günü hücreleri, sayfa hangi gösterim biçimini kullanırsa kullansın tarih olarak okunur. `17.05.1990` veya `05/17/1990` gibi metin tarihler de okunur; günün mü ayın mı önce geldiğine dönüştürücü tüm sütuna bakarak karar verir.

**Kişi alanı olmayan sütunlar** (“Notlar”, “Müşteri No”, “Son sipariş”) nota bağlanabilir ya da atlanabilir. *Atla* olarak ayarladığınız hiçbir şey dışa aktarılmaz.
