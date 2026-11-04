---
url: android-vcf-rehber-aktarma
title: "VCF Dosyasını Android Rehbere Aktarma (Samsung, Xiaomi, Pixel)"
h1: "VCF dosyası Android rehbere nasıl aktarılır"
description: ".vcf dosyasındaki tüm kişileri Android'e aktarın: Google Kişiler uygulaması (Pixel ve çoğu telefon), Samsung Rehber ve Xiaomi. Menü yolları ve sık sorunların çözümü."
lead: "Android çok kişili bir .vcf dosyasını tek seferde içe aktarır. Menü yolu rehber uygulamasına bağlıdır: Pixel ve birçok telefonda Google Kişiler, Galaxy telefonlarda Samsung'un kendi Rehber uygulaması."
nav: "Android'e aktarma"
summary: "Google Kişiler, Samsung ve Xiaomi telefonlar için menü yolları."
steps:
  - ".vcf dosyasını [dönüştürücüyle](/tr/) oluşturun (vCard 3.0) ve telefona kopyalayın: doğrudan telefonda indirin ya da İndirilenler klasörüne taşıyın."
  - "**Google Kişiler uygulaması:** Kişiler → **Düzenle** (alttaki sekme) → **Dosyadan içe aktar** → .vcf dosyasını seçin → Google hesabını seçin."
  - "**Samsung Rehber:** Rehber → ☰ menü → **Kişileri yönet** → **Kişileri içe veya dışa aktar** → **İçe aktar** → dosyanın bulunduğu yeri seçin → .vcf'yi işaretleyin → kaydedileceği yeri seçin (Samsung hesabı, Google, telefon) → **İçe aktar**."
  - "Kişiler uygulamasını açıp birkaç kartı kontrol edin. Kişilerin diğer cihazlarda ve Gmail'de de görünmesini istiyorsanız onları Google hesabına kaydedin."
faq:
  - q: "Google Kişiler uygulamasında “İçe aktar”ı bulamıyorum."
    a: "Güncel sürümlerde alttaki **Düzenle** sekmesindedir → Dosyadan içe aktar. Eski sürümlerde: menü (☰) → Ayarlar → İçe aktar ya da “Düzelt ve yönet” → Dosyadan içe aktar. Son sürümler bu seçeneği Düzenle sekmesine taşıdı."
  - q: "Kişiler nereye kaydedilmeli?"
    a: "Yedeklenmelerini ve her cihazda (ve Gmail'de) görünmelerini istiyorsanız Google hesabınıza. “Telefon” veya “Cihaz” depolaması kişileri yalnızca bu telefonda tutar; telefonla birlikte kaybolurlar."
  - q: "Samsung telefonumda isimler simge olarak görünüyor."
    a: "2.1 değil vCard 3.0 ile yeniden dönüştürün. 2.1 sürümü ASCII dışındaki harfleri (ğ, ş, ı dahil) Quoted-Printable olarak yazar ve bazı telefonlar bunu yanlış çözer."
  - q: "WhatsApp yeni kişileri göstermiyor."
    a: "WhatsApp kişileri tam uluslararası numarayla eşleştirir. E.164 telefon biçimi ve doğru ülkeyle (Türkiye için +90) dönüştürün, sonra WhatsApp'ta kişileri yenileyin (Yeni sohbet → ⋮ → Yenile)."
  - q: "Android'de CSV'yi doğrudan içe aktarabilir miyim?"
    a: "Google Kişiler uygulaması telefonda CSV içe aktarmaz; contacts.google.com adresindeki web sürümü aktarır. .vcf'ye dönüştürmek, dosyayı doğrudan telefonda içe aktarmanızı sağlar."
related: [import-iphone, import-google-contacts, home, bulk-add-contacts, google-sheets-to-vcf, excel-to-vcf]
updated: 2026-11-04
---

## Google Kişiler uygulaması (Pixel, Motorola, Nokia, OnePlus ve diğerleri)

Google Kişiler uygulaması Pixel telefonlarda ve birçok başka telefonda yüklü gelir. Her Android telefona Google Play'den de kurulabilir.

1. **Kişiler**'i açın.
2. Ekranın altındaki **Düzenle**'ye (Organize) dokunun.
3. **Dosyadan içe aktar**'a (Import from file) dokunun.
4. Dosya seçicide .vcf dosyasını seçin (genellikle *İndirilenler* klasöründedir).
5. Birden çok hesabınız varsa kişilerin kaydedileceği Google hesabını seçin. Dosyadaki tüm kartlar tek seferde içe aktarılır.

Google Kişiler hesap başına en fazla 25.000 kişi kabul eder. Çok büyük listeleri birkaç binlik parçalar halinde içe aktarın.

## Samsung Galaxy (Rehber uygulaması, One UI)

Galaxy telefonlarda Samsung'un kişi uygulaması Türkçe arayüzde **Rehber** adını taşır (İngilizce: Contacts).

1. **Rehber**'i açın.
2. **☰** menüsüne (üç çizgi) dokunun.
3. **Kişileri yönet**'e (Manage contacts) dokunun.
4. **Kişileri içe veya dışa aktar**'a (Import or export contacts) dokunun; eski sürümlerde bu seçenek *Kişileri içe/dışa aktar* adını taşır.
5. **İçe aktar**'a dokunun, dosyanın bulunduğu depolamayı (*Dahili depolama*) seçin, .vcf dosyasını işaretleyip **Tamam**'a dokunun.
6. Kaydedilecek yeri seçin (*Samsung hesabı*, bir *Google* hesabı veya *Telefon*) ve **İçe aktar**'a dokunun.

Etiketler One UI sürümleri arasında biraz farklı olabilir, ama **Kişileri yönet** üzerinden giden yol yıllardır değişmedi.

## Xiaomi, Redmi, POCO (MIUI / HyperOS)

Xiaomi'nin kendi Kişiler uygulamasını kullanan telefonlarda: Kişiler → **⋮** → **Ayarlar** → **İçe ve dışa aktar** (Import and export) → **Depolamadan içe aktar** (Import from storage), ardından dosyayı seçin. Google Kişiler uygulamasını kullanan Xiaomi ve Redmi telefonlar yukarıdaki Google adımlarını izler. Menüde bu adları bulamazsanız aşağıdaki genel yolu kullanın.

## Her telefonda: dosyayı açın

Bir dosya yöneticisinde (ör. **Dosyalar**) veya bir e-posta ekinde .vcf dosyasına dokunmak genellikle *Birlikte aç → Kişiler* seçeneğini sunar. Bu da aynı içe aktarmayı başlatır; hesabı bir sonraki pencerede seçersiniz. Menü yolunu bilmediğiniz diğer marka arayüzlerinde en kolay yol budur.

## İçe aktarmadan önce

- **vCard 3.0, UTF-8.** Bu dönüştürücünün varsayılan olarak yazdığı ve Android'in kendisinin dışa aktardığı biçim budur.
- **Uluslararası numaralar.** `0532 123 45 67` yerine `+905321234567`, WhatsApp gibi mesajlaşma uygulamalarının kişiyi eşleştirmesini sağlar ve yurt dışında da çalışır.
- **Tek dosya.** Tüm kişileri içeren tek bir .vcf, yüzlerce küçük dosyadan daha kolaydır; ZIP seçeneğini yalnızca bir sistem kişi başına ayrı dosya istiyorsa kullanın.
