---
url: rehbere-toplu-kisi-ekleme
title: "Excel'den Telefon Rehberine Toplu Kişi Ekleme (WhatsApp Uyumlu)"
h1: "Telefon rehberine tek seferde çok sayıda kişi ekleme"
description: "Excel veya CSV listesindeki yüzlerce kişiyi iPhone ya da Android rehberine tek adımda ekleyin: tek VCF dosyasına dönüştürün, içe aktarın. WhatsApp ve Telegram için de."
lead: "Kişileri tek tek yazmanız gerekmez. Listeyi tek bir .vcf dosyasına çevirip içe aktarın: telefon tüm kişileri tek adımda ekler, WhatsApp gibi mesajlaşma uygulamaları da onları rehberden alır."
nav: "Rehbere toplu kişi ekleme"
summary: "Tablodan tek içe aktarmayla yüzlerce telefon kişisine."
steps:
  - "Kişileri bir tabloya koyun: kişi başına bir satır ve “Ad Soyad” ile “Telefon” (veya “Cep Telefonu”) içeren bir başlık satırı. Fazladan sütunlar sorun değil."
  - "Dosyayı [dönüştürücüye](/tr/) bırakın ve numaraların ülkesini seçin; numaralar uluslararası önekle (+90…) yazılır."
  - "Tüm kişileri içeren tek bir .vcf dosyası indirin."
  - "İçe aktarın: [Android'de](/tr/android-vcf-rehber-aktarma/) Kişiler → Düzenle → Dosyadan içe aktar ile; [iPhone'da](/tr/iphone-vcf-rehber-aktarma/) dosyayı açıp “Tüm Kişileri Ekle”ye dokunarak."
faq:
  - q: "Bir telefon tek seferde kaç kişi içe aktarabilir?"
    a: "Binlerce. Birkaç bin kart içeren tek bir .vcf, iPhone'da da Android'de de içe aktarılır. Web'deki Google Kişiler ise en fazla 3.000 kişilik dosyalar ister ve hesap başına 25.000 kişi tutar."
  - q: "Kişiler WhatsApp'ta veya Telegram'da görünür mü?"
    a: "Evet; numaralar uluslararası biçimdeyse (`+90 532 123 45 67`) ve uygulama kişilerini yenilediyse. Ülke kodu olmayan numaralar çoğu zaman bir hesapla eşleşmez."
  - q: "Bir uygulamaya veya ücretli programa ihtiyacım var mı?"
    a: "Hayır. Telefonun kendi Kişiler uygulaması .vcf dosyalarını içe aktarır; bu sitedeki dönüştürücü ücretsizdir ve tarayıcıda çalışır."
  - q: "İçe aktarılan kişileri sonra kaldırabilir miyim?"
    a: "Google Kişiler'de içe aktarma tarihini taşıyan etiketi kişileriyle birlikte silin. iPhone'da kişileri, birçoğunu birden seçebildiğiniz iCloud.com'da silin. Önce kısa bir dosyayla deneyin."
related: [import-android, import-iphone, home, excel-to-vcf, google-sheets-to-vcf, excel-phone-e11]
updated: 2026-11-04
---

## En hızlı yol

Telefonlar tablo içe aktaramaz, ama **vCard (.vcf)** dosyalarını içe aktarır ve tek bir dosya istediğiniz kadar kişi içerebilir. Yani yapılacak iş şu: tablo → tek .vcf → içe aktarma.

**Tabloyu hazırlayın.** Kişi başına bir satır. En az bir isim sütunu ve bir telefon sütunu gerekir; e-posta, şirket ve doğum günü sütunları da tanınır. İsim tek sütunda (“Ad Soyad”) ya da iki sütunda (“Ad”, “Soyad”) olabilir.

**Dönüştürün.** [Dönüştürücü](/tr/) sütunları tanır, numaraları uluslararası biçimde yazar ve geçerli görünmeyen numaralar için, telefonunuza girmeden önce uyarır. İki kez geçen kişiler birleştirilebilir.

**İçe aktarın.** Tek dosya, telefonda tek dokunuş. [Android](/tr/android-vcf-rehber-aktarma/) ve [iPhone](/tr/iphone-vcf-rehber-aktarma/) için ayrıntılı adımlar.

## WhatsApp, Telegram ve Signal için

Mesajlaşma uygulamaları rehberi okur ve her numarayı uluslararası biçimde arar. Bir kişinin görünüp görünmeyeceğini iki şey belirler:

- **Ülke kodu.** `+90 532 123 45 67` eşleşir; `0532 123 45 67` ise yalnızca telefonun kendi ülkesi Türkiye ise eşleşir. Dönüştürücü ülke kodunu seçtiğiniz ülkeye göre ekler.
- **Yenileme.** İçe aktardıktan sonra uygulamanın yeni sohbet ekranını açın. Android'de WhatsApp'ta: ⋮ → Yenile.

Yalnızca tanımadığınız kişilere mesaj atmak için toplu kişi eklemek spamdir ve hesapların engellenmesine yol açar. Bu yöntemi sizden haber bekleyen kişiler için kullanın: ekibiniz, üyeleriniz, numarasını size vermiş müşterileriniz.

## Büyük listeler

- **Google Kişiler için bölün.** Web'den içe aktarma dosya başına yaklaşık 3.000 kişi alır. Tablonuzu filtreleyerek parçalara ayırın ve her parçayı ayrı dönüştürün.
- **Hesabı seçin.** Google veya iCloud hesabına kaydedilen kişiler yedeklenir ve tüm cihazlarınızda görünür. “Yalnızca telefon” depolaması bu cihazda kalır.
- **İçe aktarmadan önce kontrol edin.** Dönüştürücünün raporu atlanan satırları, geçersiz numaraları ve yinelenenleri, Excel'de bulabileceğiniz satır numaralarıyla listeler.
