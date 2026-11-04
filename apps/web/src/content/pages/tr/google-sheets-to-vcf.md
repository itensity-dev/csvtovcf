---
url: google-sheets-vcf-donusturme
title: "Google Sheets (E-Tablolar) Kişilerini VCF'ye Dönüştürme"
h1: "Google E-Tablolar'dan VCF'ye dönüştürme"
description: "Google E-Tablolar'dan (Sheets) kişi hücrelerini kopyalayıp yapıştırın, iPhone, Android veya Google Kişiler için VCF dosyası indirin. Eklenti, hesap erişimi gerekmez."
lead: "Google E-Tablolar'da kişi satırlarını seçin, kopyalayın, buraya yapıştırın ve .vcf dosyasını indirin. Eklenti yok, Google hesabınıza erişim yok: hücreler panonuzdan yalnızca bu sayfaya gelir."
nav: "E-Tablolar'dan VCF'ye"
summary: "Google E-Tablolar'dan hücreleri yapıştırın, .vcf indirin."
steps:
  - "Google E-Tablolar'da kişi satırlarını başlık satırıyla birlikte seçin (ilk satır numarasına tıklayın, sonuncusuna Shift basılıyken tıklayın) ve Ctrl+C (Mac'te ⌘C) ile kopyalayın."
  - "Yukarıda **Hücreleri yapıştır**'a tıklayın, Ctrl+V ile yapıştırın ve **Bu hücreleri kullan**'a basın. Yapıştırılan hücreler sekmeyle ayrılmış gelir; isim veya adreslerdeki virgüller sorun çıkarmaz."
  - "Sütun eşleştirmelerini kontrol edin ve ülke kodu olmayan numaralar için ülkeyi seçin."
  - ".vcf dosyasını indirip içe aktarın: [Android](/tr/android-vcf-rehber-aktarma/), [iPhone](/tr/iphone-vcf-rehber-aktarma/) veya [Google Kişiler](/tr/google-kisiler-vcf-ice-aktarma/)."
features:
  - feature: "Girdi"
    value: "Google E-Tablolar, Excel, LibreOffice veya Numbers'tan yapıştırılan hücreler (sekmeyle ayrılmış) ya da Dosya → İndir ile alınmış bir .xlsx veya .csv dosyası."
  - feature: "Hesap erişimi"
    value: "Yok. Eklenti, oturum açma ya da Google API kullanılmaz: dönüştürücü yalnızca yapıştırdığınızı görür."
  - feature: "Telefon numaraları"
    value: "E-Tablolar numaraları çoğu zaman sayı olarak tutar (“+” yok, baştaki 0 yok). Numaralar seçilen ülkeye göre tamamlanır ve uluslararası biçimde yazılır."
  - feature: "Çıktı"
    value: "vCard 3.0, 4.0 veya 2.1; tek dosya veya ZIP; listeyi Google Kişiler'e tablo olarak aktarmak isterseniz Google Kişiler CSV."
  - feature: "Sınırlar"
    value: "Dönüştürücüde sınır yok. Çok büyük yapıştırmalarda (100.000+ satır) indirilmiş bir .xlsx dosyası daha akıcı çalışır."
faq:
  - q: "Bunun için bir Google E-Tablolar eklentisi var mı?"
    a: "Bu sayfa, eklentiye bir alternatiftir: eklenti e-tablolarınızı okuma izni ister, kopyala-yapıştır ise bu sayfaya yalnızca seçtiğiniz hücreleri verir."
  - q: "Sayfayı CSV olarak mı, Excel olarak mı indirmeliyim?"
    a: "İkisi de olur. Dosya → İndir → Microsoft Excel (.xlsx) sayıları ve tarihleri türleriyle korur; CSV de uygundur, çünkü Google E-Tablolar CSV'yi UTF-8 ile yazar."
  - q: "Yapıştırılan numaraların baştaki sıfırı kaybolmuş. Düzeltilebilir mi?"
    a: "Evet, doğru ülkeyi seçerseniz: ulusal numara ülke koduyla tamamlanır. İleride yazdığınız gibi kalmaları için E-Tablolar'da sütunu Biçim → Sayı → Düz metin olarak ayarlayın."
  - q: "Kişileri doğrudan Google Kişiler'e gönderebilir miyim?"
    a: "İndirdiğiniz .vcf dosyasını contacts.google.com → İçe aktar ile içe aktarın. Google dosya başına en fazla 3.000 kişi kabul eder. [Kılavuz](/tr/google-kisiler-vcf-ice-aktarma/)."
related: [google-contacts-csv-to-vcf, excel-to-vcf, home, import-google-contacts, bulk-add-contacts, import-android]
updated: 2026-11-04
---

Google E-Tablolar, birçok kişi listesinin tutulduğu ve paylaşıldığı yerdir: etkinlik kayıtları, ekip listeleri, müşteri dışa aktarımları. Bu kişileri telefona almak için tablonun bir **VCF** (vCard) dosyasına dönüşmesi gerekir.

**Neden eklenti değil de yapıştırma?** Tablodan vCard oluşturan eklentiler e-tablolarınızı görme izni ister. Hücreleri kopyalamak ise bu sayfaya tam olarak seçtiğinizi verir, fazlasını değil. E-Tablolar'dan kopyaladığınızda pano hücreleri sekmeyle ayrılmış metin olarak tutar. Dönüştürücü bu biçimi, hücre içindeki satır sonları ve tırnak işaretleri dahil, birebir okur.

**Başlıklar.** Başlık satırını da kopyalayın: “Ad Soyad”, “Telefon”, “E-posta” gibi başlıklar o zaman tanınır ve otomatik bağlanır. Başlık yoksa sütunlar içeriklerine göre eşleştirilir. E-posta sütunu, telefon sütunu ve iki kelimelik değerler içeren bir sütun yine bulunur, ama eşleştirmeleri kontrol edin.

**E-Tablolar'daki numaralar.** Excel gibi Google E-Tablolar da sütun düz metin değilse `05321234567` değerini sayı sayar ve baştaki sıfırı siler. Dönüştürücü her ülkenin numaralandırma planını bilir. Türkiye seçiliyken `5321234567`, `+905321234567` olur ve geçerli bir cep numarası olarak kontrol edilir.

**Yinelenenler.** Paylaşılan tablolarda aynı kişi çoğu zaman iki kez geçer. Yapıştırdıktan sonra *Yinelenenler* sekmesini açın: aynı telefon numarasına veya e-postaya sahip kişiler gruplanır ve indirmeden önce birleştirilebilir.
